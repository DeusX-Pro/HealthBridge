<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\ArticleCategory;
use App\Models\CommunityChannel;
use App\Models\Food;
use App\Models\HealthFact;
use App\Models\LegalDocument;
use App\Models\Notification;
use App\Models\NotificationPreference;
use App\Models\User;
use App\Models\ContraceptionPlan;
use App\Models\NutritionProfile;
use App\Models\PatientScreeningSetting;
use App\Models\SafetyPlan;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Seed Community Channels
        $channels = [
            ['slug' => 'general', 'name' => 'General', 'description' => 'Anything you want to share or ask.', 'sort_order' => 0],
            ['slug' => 'cycle', 'name' => 'Cycle & Periods', 'description' => 'Tracking, symptoms and everyday questions.', 'sort_order' => 1],
            ['slug' => 'trying-to-conceive', 'name' => 'Trying to Conceive', 'description' => 'Support while you are trying for a baby.', 'sort_order' => 2],
            ['slug' => 'pregnancy', 'name' => 'Pregnancy', 'description' => 'Weekly ups, downs and questions.', 'sort_order' => 3],
            ['slug' => 'postpartum', 'name' => 'Postpartum', 'description' => 'Recovery, newborn life and the fourth trimester.', 'sort_order' => 4],
            ['slug' => 'mens-health', 'name' => "Men's Health", 'description' => "A space for men's health topics and screenings.", 'sort_order' => 5],
            ['slug' => 'chronic-conditions', 'name' => 'Chronic Conditions', 'description' => 'Living day to day with an ongoing health condition.', 'sort_order' => 6],
            ['slug' => 'nutrition-fitness', 'name' => 'Nutrition & Fitness', 'description' => 'Food, movement, energy and healthy habits.', 'sort_order' => 7],
        ];
        foreach ($channels as $ch) {
            CommunityChannel::updateOrCreate(['slug' => $ch['slug']], $ch);
        }

        // 2. Seed Legal Documents
        $legalDocs = [
            [
                'slug' => 'terms-of-service',
                'title' => 'Terms of Service',
                'version' => '1.0',
                'applies_to_signup' => true,
                'published_at' => now(),
                'body' => 'Welcome to HealthBridge. By using our service, you agree to protect your credentials, respect community standards, and understand that HealthBridge is a secure health record management and wellness tracking platform.',
            ],
            [
                'slug' => 'privacy-policy',
                'title' => 'Privacy Policy & Privacy Shield',
                'version' => '1.0',
                'applies_to_signup' => true,
                'published_at' => now(),
                'body' => 'We take your privacy seriously. Reproductive health, intimacy data, and sensitive personal notes are encrypted at rest with patient-specific encryption keys. You have complete control over who accesses your records through time-limited View and Add links.',
            ],
            [
                'slug' => 'medical-disclaimer',
                'title' => 'Medical Disclaimer',
                'version' => '1.0',
                'applies_to_signup' => true,
                'published_at' => now(),
                'body' => 'HealthBridge provides informational tracking, diary logging, and record organization tools. It does not replace professional medical diagnosis, treatment, or clinical emergency services. Always consult certified clinicians for urgent healthcare.',
            ],
        ];
        foreach ($legalDocs as $doc) {
            LegalDocument::updateOrCreate(['slug' => $doc['slug']], $doc);
        }

        // 3. Seed Curated Foods
        $foods = [
            ['name' => 'Oatmeal with Berries', 'category' => 'Breakfast', 'serving_label' => '1 bowl (250g)', 'serving_grams' => 250, 'kcal' => 280, 'protein_g' => 9, 'carb_g' => 52, 'fat_g' => 4, 'fibre_g' => 7, 'is_vegetarian' => true],
            ['name' => 'Boiled Eggs (2 large)', 'category' => 'Breakfast', 'serving_label' => '2 eggs (100g)', 'serving_grams' => 100, 'kcal' => 140, 'protein_g' => 12, 'carb_g' => 1, 'fat_g' => 10, 'fibre_g' => 0, 'is_vegetarian' => true],
            ['name' => 'Grilled Chicken Salad', 'category' => 'Main', 'serving_label' => '1 plate (350g)', 'serving_grams' => 350, 'kcal' => 420, 'protein_g' => 38, 'carb_g' => 14, 'fat_g' => 16, 'fibre_g' => 6, 'is_vegetarian' => false],
            ['name' => 'Brown Rice and Steamed Salmon', 'category' => 'Dinner', 'serving_label' => '1 serving (300g)', 'serving_grams' => 300, 'kcal' => 490, 'protein_g' => 34, 'carb_g' => 45, 'fat_g' => 15, 'fibre_g' => 4, 'is_vegetarian' => false],
            ['name' => 'Lentil Soup with Vegetables', 'category' => 'Main', 'serving_label' => '1 bowl (300g)', 'serving_grams' => 300, 'kcal' => 260, 'protein_g' => 18, 'carb_g' => 40, 'fat_g' => 3, 'fibre_g' => 11, 'is_vegetarian' => true],
            ['name' => 'Greek Yogurt with Honey & Almonds', 'category' => 'Snack', 'serving_label' => '1 cup (180g)', 'serving_grams' => 180, 'kcal' => 210, 'protein_g' => 17, 'carb_g' => 20, 'fat_g' => 7, 'fibre_g' => 2, 'is_vegetarian' => true],
            ['name' => 'Apple with Peanut Butter', 'category' => 'Snack', 'serving_label' => '1 apple + 1 tbsp (160g)', 'serving_grams' => 160, 'kcal' => 190, 'protein_g' => 4, 'carb_g' => 25, 'fat_g' => 9, 'fibre_g' => 5, 'is_vegetarian' => true],
        ];
        foreach ($foods as $food) {
            Food::firstOrCreate(['name' => $food['name']], $food);
        }

        // 4. Seed Health Facts
        $facts = [
            ['fact' => 'Drinking water first thing in the morning boosts your metabolic rate and helps flush overnight toxins.', 'source' => 'World Health Organization', 'category' => 'Hydration'],
            ['fact' => 'Basal Body Temperature rises by approximately 0.2°C to 0.5°C immediately after ovulation due to progesterone production.', 'source' => 'American College of Obstetricians and Gynecologists', 'category' => 'Cycle Health'],
            ['fact' => 'Tracking your resting heart rate over weeks is one of the most reliable early indicators of cardiovascular endurance improvement.', 'source' => 'Harvard Health Publishing', 'category' => 'Cardiovascular'],
            ['fact' => 'Regular monthly testicular self-examinations detect irregularities early, when treatment success exceeds 95%.', 'source' => 'Urology Care Foundation', 'category' => "Men's Health"],
            ['fact' => 'Adequate dietary fiber (25-35g/day) lowers blood glucose spikes and supports a diverse microbiome.', 'source' => 'Mayo Clinic', 'category' => 'Nutrition'],
        ];
        foreach ($facts as $fact) {
            HealthFact::firstOrCreate(['fact' => $fact['fact']], $fact);
        }

        // 5. Seed Article Categories and Sample Articles
        $catWellness = ArticleCategory::firstOrCreate(['slug' => 'wellness'], ['name' => 'Wellness & Lifestyle', 'sort_order' => 1]);
        $catRepro = ArticleCategory::firstOrCreate(['slug' => 'reproductive-health'], ['name' => 'Reproductive & Cycle Health', 'sort_order' => 2]);
        $catNutrition = ArticleCategory::firstOrCreate(['slug' => 'nutrition'], ['name' => 'Nutrition & Energy', 'sort_order' => 3]);

        Article::firstOrCreate(['slug' => 'understanding-your-menstrual-cycle-phases'], [
            'category_id' => $catRepro->id,
            'title' => 'Understanding the Four Phases of Your Menstrual Cycle',
            'summary' => 'From the follicular phase to ovulation and the luteal phase: how hormonal changes influence your energy, mood, and sleep.',
            'content' => "The menstrual cycle is often thought of simply as the days of bleeding, but it is an intricate month-long hormonal rhythm divided into four distinct phases:\n\n1. Menstrual Phase (Days 1-5): The shedding of the uterine lining.\n2. Follicular Phase (Days 6-13): Estrogen rises, stimulating follicle growth and often bringing peak focus and mental clarity.\n3. Ovulatory Phase (Days 14-16): The LH surge triggers egg release; basal body temperature climbs.\n4. Luteal Phase (Days 17-28): Progesterone dominates, preparing the body for potential implantation or the next cycle.\n\nLogging your daily symptoms in HealthBridge helps you anticipate energy shifts, monitor ovulation, and maintain body literacy.",
            'reading_time_minutes' => 4,
            'tags' => ['Cycle', 'Hormones', 'Fertility'],
            'published_at' => now(),
        ]);

        Article::firstOrCreate(['slug' => 'macronutrients-101-building-balanced-meals'], [
            'category_id' => $catNutrition->id,
            'title' => 'Macronutrients 101: Fueling Your Body for Vitality',
            'summary' => 'A practical guide to balancing proteins, healthy fats, and complex carbohydrates for sustained energy throughout the day.',
            'content' => "Every meal you eat provides the building blocks for tissue repair, cellular function, and energy metabolism.\n\n- Protein (4 kcal/g): Vital for lean tissue maintenance and immune defense.\n- Carbohydrates (4 kcal/g): The preferred fuel for high-intensity activity and brain function.\n- Healthy Fats (9 kcal/g): Essential for hormone synthesis and nutrient absorption.\n\nUse HealthBridge's Nutrition Planner to automatically calculate your optimal macro targets.",
            'reading_time_minutes' => 3,
            'tags' => ['Nutrition', 'Diet', 'Energy'],
            'published_at' => now(),
        ]);

        // 6. Seed Demo Patient Account
        $demoUser = User::firstOrCreate(
            ['email' => 'amara.demo@example.com'],
            [
                'first_name' => 'Amara',
                'last_name' => 'Okonkwo',
                'date_of_birth' => '1996-05-14',
                'biological_sex' => 'FEMALE',
                'phone_e164' => '+2348012345678',
                'password' => Hash::make('Password123!@#'),
                'status' => 'ACTIVE',
                'is_mfa_active' => false,
                'email_verified_at' => now(),
            ]
        );

        // Accept all legal documents for demo user
        foreach (LegalDocument::all() as $ld) {
            $demoUser->legalConsents()->firstOrCreate(['legal_document_id' => $ld->id], ['accepted_at' => now()]);
        }

        // Notification Preferences
        NotificationPreference::firstOrCreate(['user_id' => $demoUser->id], [
            'timezone' => 'Africa/Lagos',
            'medication_reminders' => true,
            'cycle_reminders' => true,
            'screening_reminders' => true,
            'email_notifications' => true,
        ]);

        // Contraception plan
        ContraceptionPlan::firstOrCreate(['user_id' => $demoUser->id], [
            'method' => 'PILL',
            'start_date' => now()->subMonths(3)->toDateString(),
            'reminder_active' => true,
        ]);

        // Nutrition profile
        NutritionProfile::firstOrCreate(['user_id' => $demoUser->id], [
            'activity_level' => 'MODERATE',
            'goal' => 'HEALTHY',
            'diet_type' => 'BALANCED',
            'target_weight_kg' => 62.0,
            'target_date' => now()->addMonths(6)->toDateString(),
            'pace_kg_per_week' => 0.25,
        ]);

        // Male Demo User (Chidi Okafor) for Men's Health testing
        $maleUser = User::firstOrCreate(
            ['email' => 'chidi.demo@example.com'],
            [
                'public_reference' => 'HB-PT-' . Str::upper(Str::random(8)),
                'first_name' => 'Chidi',
                'last_name' => 'Okafor',
                'date_of_birth' => '1992-08-14',
                'biological_sex' => 'MALE',
                'phone_e164' => '+2348087654321',
                'password' => Hash::make('Password123!@#'),
                'status' => 'ACTIVE',
                'is_mfa_active' => false,
                'email_verified_at' => now(),
            ]
        );

        foreach (LegalDocument::all() as $ld) {
            $maleUser->legalConsents()->firstOrCreate(['legal_document_id' => $ld->id], ['accepted_at' => now()]);
        }

        PatientScreeningSetting::firstOrCreate(['user_id' => $maleUser->id], [
            'self_exam_reminder_active' => true,
            'family_history_prostate' => false,
            'family_history_testicular' => false,
        ]);

        // Safety Plan
        SafetyPlan::firstOrCreate(['user_id' => $demoUser->id], [
            'warning_signs' => ['Severe migraine with aura', 'Chest tightness during exertion', 'Extreme lethargy'],
            'coping_strategies' => ['Box breathing for 5 minutes', 'Drinking 500ml cold water', 'Resting in a dark room'],
            'emergency_contacts' => [['name' => 'Dr. Emeka (Primary Physician)', 'phone' => '+2348099887766']],
            'professional_contacts' => [['name' => 'Lagos General Hospital Emergency', 'phone' => '+2341234567']],
        ]);

        // Welcome Notification
        Notification::firstOrCreate(
            ['user_id' => $demoUser->id, 'title' => 'Welcome to HealthBridge'],
            [
                'message' => 'Your encrypted health vault is active. You can now log your cycle, track vitals, manage medications, and generate secure care links.',
                'category' => 'ONBOARDING',
                'action_url' => route('today'),
            ]
        );
    }
}
