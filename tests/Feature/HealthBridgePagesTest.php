<?php

namespace Tests\Feature;

use App\Models\User;
use Tests\TestCase;

class HealthBridgePagesTest extends TestCase
{
    private User $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::where('email', 'amara.demo@example.com')->first();
    }

    public function test_landing_page_renders_successfully(): void
    {
        $response = $this->get('/');
        $response->assertStatus(200);
        $response->assertSee('Health Bridge');
    }

    public function test_guest_auth_pages_render(): void
    {
        $this->get('/login')->assertOk();
        $this->get('/register')->assertOk();
        $this->get('/forgot-password')->assertOk();
    }

    public function test_authenticated_patient_core_pages(): void
    {
        $this->actingAs($this->user);

        // Core Dashboard & Timeline
        $this->get('/today')->assertOk();
        $this->get('/timeline')->assertOk();

        // Diary
        $this->get('/diary')->assertOk();
        $this->get('/diary/create')->assertOk();

        // Measurements & Vitals
        $this->get('/measurements')->assertOk();
        $this->get('/measurements/create')->assertOk();

        // Documents Vault
        $this->get('/documents')->assertOk();
        $this->get('/documents/upload')->assertOk();

        // Medications
        $this->get('/medications')->assertOk();
        $this->get('/medications/create')->assertOk();

        // Orders
        $this->get('/orders')->assertOk();

        // Checklists
        $this->get('/checklists')->assertOk();

        // Safety Plan
        $this->get('/safety')->assertOk();
        $this->get('/safety/edit')->assertOk();

        // Nutrition
        $this->get('/nutrition')->assertOk();
        $this->get('/nutrition/profile')->assertOk();
        $this->get('/nutrition/foods')->assertOk();
        $this->get('/nutrition/plans')->assertOk();
        $this->get('/nutrition/progress')->assertOk();

        // Cycle Tracking (Amara is female)
        $this->get('/cycle')->assertOk();
        $this->get('/cycle/calendar')->assertOk();
        $this->get('/cycle/insights')->assertOk();
        $this->get('/cycle/learn')->assertOk();
        $this->get('/contraception')->assertOk();

        // Community
        $this->get('/community')->assertOk();
        $this->get('/community/create-post')->assertOk();

        // Sharing
        $this->get('/sharing')->assertOk();
        $this->get('/sharing/view-links')->assertOk();
        $this->get('/sharing/add-links')->assertOk();
        $this->get('/sharing/submissions')->assertOk();
        $this->get('/sharing/history')->assertOk();

        // Hospitals
        $this->get('/hospitals')->assertOk();

        // Articles
        $this->get('/articles')->assertOk();
        $this->get('/articles/saved')->assertOk();

        // Settings
        $this->get('/settings')->assertOk();
        $this->get('/settings/security')->assertOk();
        $this->get('/settings/notifications')->assertOk();
    }
}
