<?php

namespace Tests\Feature;

use App\Models\CycleRecord;
use App\Models\Document;
use App\Models\User;
use App\Models\ViewLink;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Tests\TestCase;

class SecurityAndRemediationTest extends TestCase
{
    public function test_security_headers_are_present_on_responses(): void
    {
        $response = $this->get('/');
        $response->assertStatus(200);
        $response->assertHeader('X-Frame-Options', 'DENY');
        $response->assertHeader('X-Content-Type-Options', 'nosniff');
        $response->assertHeader('X-XSS-Protection', '1; mode=block');
        $response->assertHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    }

    public function test_bola_idor_is_blocked_when_documents_section_not_granted(): void
    {
        $user = User::where('email', 'amara.demo@example.com')->first();
        $doc = Document::firstOrCreate([
            'user_id' => $user->id,
            'title' => 'Confidential Lab Report',
            'file_name' => 'report.pdf',
            'storage_path' => 'vault/' . $user->id . '/report.pdf',
            'content_type' => 'application/pdf',
            'size_bytes' => 1024,
            'sha256' => hash('sha256', 'mock content'),
            'category' => 'LAB_RESULT',
            'document_date' => now()->toDateString(),
        ]);

        $token = Str::random(32);
        $link = ViewLink::create([
            'user_id' => $user->id,
            'token' => $token,
            'passcode_hash' => Hash::make('123456'),
            'recipient_name' => 'Dr. External',
            'sections' => ['MEASUREMENTS', 'DIARY'], // NO DOCUMENTS!
            'status' => 'ACTIVE',
            'expires_at' => now()->addDays(7),
        ]);

        // Attempting to download without DOCUMENTS section granted must return 403 Forbidden even if session is unlocked
        $response = $this->withSession(["view_link_unlocked_{$token}" => true])
            ->get("/view/{$token}/documents/{$doc->id}");

        $response->assertStatus(403);
    }

    public function test_password_reset_token_expiration_is_enforced(): void
    {
        $user = User::where('email', 'amara.demo@example.com')->first();
        $token = 'expired_test_token_123';

        // Insert token created 2 hours ago (default expiry is 60 minutes)
        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $user->email],
            [
                'token' => Hash::make($token),
                'created_at' => Carbon::now()->subMinutes(120),
            ]
        );

        $response = $this->get("/reset-password/{$token}?email=" . urlencode($user->email));
        $response->assertRedirect(route('password.request'));
        $response->assertSessionHasErrors(['email']);
    }

    public function test_community_post_and_comment_hide_user_id_on_serialization(): void
    {
        $user = User::where('email', 'amara.demo@example.com')->first();
        $post = \App\Models\CommunityPost::create([
            'channel_id' => \App\Models\CommunityChannel::first()->id,
            'user_id' => $user->id,
            'title' => 'My health question',
            'body' => 'Sample post content',
            'pseudonym' => 'WellnessSeeker',
        ]);

        $comment = \App\Models\CommunityComment::create([
            'post_id' => $post->id,
            'user_id' => $user->id,
            'body' => 'Sample comment',
            'pseudonym' => 'HelpfulPeer',
        ]);

        $postArray = $post->toArray();
        $commentArray = $comment->toArray();

        $this->assertArrayNotHasKey('user_id', $postArray);
        $this->assertArrayNotHasKey('user', $postArray);
        $this->assertArrayNotHasKey('user_id', $commentArray);
        $this->assertArrayNotHasKey('user', $commentArray);
    }

    public function test_nutrition_plan_generation_supports_custom_food_categories(): void
    {
        $user = User::where('email', 'amara.demo@example.com')->first();
        $profile = \App\Models\NutritionProfile::firstOrCreate(
            ['user_id' => $user->id],
            [
                'goal' => 'MAINTAIN',
                'activity_level' => 'MODERATE',
                'diet_type' => 'HIGH_PROTEIN',
                'target_weight_kg' => 65.0,
            ]
        );

        // Create a custom food with new category
        \App\Models\Food::firstOrCreate([
            'name' => 'Custom Whey Shake',
        ], [
            'user_id' => $user->id,
            'category' => 'PROTEIN',
            'serving_label' => '1 scoop (30g)',
            'serving_grams' => 30,
            'kcal' => 120,
            'protein_g' => 24,
            'carb_g' => 2,
            'fat_g' => 1,
            'fibre_g' => 0,
            'is_vegetarian' => true,
        ]);

        $engine = new \App\Services\NutritionEngine();
        $plan = $engine->generatePlan($user, $profile);

        $this->assertNotNull($plan);
        $this->assertEquals(7, count($plan->days_data));
        $this->assertNotEmpty($plan->days_data[0]['meals']['BREAKFAST']);
        $this->assertNotEmpty($plan->days_data[0]['meals']['LUNCH']);
        $this->assertNotEmpty($plan->days_data[0]['meals']['DINNER']);
        $this->assertNotEmpty($plan->days_data[0]['meals']['SNACK']);
    }

    public function test_cycle_state_machine_rolls_over_on_new_period(): void
    {
        $user = User::where('email', 'amara.demo@example.com')->first();

        // Ensure user has an active cycle started 28 days ago
        CycleRecord::where('user_id', $user->id)->whereNull('cycle_end_date')->delete();

        $activeCycle = CycleRecord::create([
            'user_id' => $user->id,
            'cycle_start_date' => Carbon::today()->subDays(28)->toDateString(),
        ]);

        // Log medium bleeding for today (Day 29)
        $response = $this->actingAs($user)->post('/cycle/log', [
            'log_date' => Carbon::today()->toDateString(),
            'flow_intensity' => 'MEDIUM',
            'symptoms' => ['CRAMPS'],
        ]);

        $response->assertSessionHas('success');

        // Prior cycle must be closed with cycle_length_days set
        $activeCycle->refresh();
        $this->assertNotNull($activeCycle->cycle_end_date);
        $this->assertEquals(28, $activeCycle->cycle_length_days);

        // A new cycle must have been opened starting today
        $newCycle = CycleRecord::where('user_id', $user->id)->whereNull('cycle_end_date')->first();
        $this->assertNotNull($newCycle);
        $this->assertEquals(Carbon::today()->toDateString(), Carbon::parse($newCycle->cycle_start_date)->toDateString());
    }
}
