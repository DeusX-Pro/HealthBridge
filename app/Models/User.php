<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $guarded = ['id'];

    protected $hidden = [
        'password',
        'remember_token',
        'encryption_salt',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'date_of_birth' => 'date',
            'is_mfa_active' => 'boolean',
            'password' => 'hashed',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function ($user) {
            if (empty($user->uuid)) {
                $user->uuid = (string) Str::uuid();
            }
            if (empty($user->public_reference)) {
                $user->public_reference = 'pat_' . Str::lower(Str::random(12));
            }
        });
    }

    public function getNameAttribute(): string
    {
        return trim("{$this->first_name} {$this->last_name}");
    }

    public function isFemale(): bool
    {
        return $this->biological_sex === 'FEMALE';
    }

    public function isMale(): bool
    {
        return $this->biological_sex === 'MALE';
    }

    // Relationships
    public function mfaFactors()
    {
        return $this->hasMany(MfaFactor::class);
    }

    public function interests()
    {
        return $this->hasMany(PatientInterest::class);
    }

    public function legalConsents()
    {
        return $this->hasMany(PatientLegalConsent::class);
    }

    public function connectedHospitals()
    {
        return $this->hasMany(ConnectedHospital::class);
    }

    public function clinicalRecords()
    {
        return $this->hasMany(ClinicalRecord::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function diaryEntries()
    {
        return $this->hasMany(DiaryEntry::class);
    }

    public function measurements()
    {
        return $this->hasMany(Measurement::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }

    public function medications()
    {
        return $this->hasMany(Medication::class);
    }

    public function cycleRecords()
    {
        return $this->hasMany(CycleRecord::class);
    }

    public function dailySymptomLogs()
    {
        return $this->hasMany(DailySymptomLog::class);
    }

    public function cyclePredictions()
    {
        return $this->hasMany(CyclePrediction::class);
    }

    public function contraceptionPlan()
    {
        return $this->hasOne(ContraceptionPlan::class);
    }

    public function selfExamLogs()
    {
        return $this->hasMany(SelfExamLog::class);
    }

    public function screeningSettings()
    {
        return $this->hasOne(PatientScreeningSetting::class);
    }

    public function nutritionProfile()
    {
        return $this->hasOne(NutritionProfile::class);
    }

    public function nutritionPlans()
    {
        return $this->hasMany(NutritionPlan::class);
    }

    public function foodLogs()
    {
        return $this->hasMany(FoodLog::class);
    }

    public function waterLogs()
    {
        return $this->hasMany(WaterLog::class);
    }

    public function addLinks()
    {
        return $this->hasMany(AddLink::class);
    }

    public function viewLinks()
    {
        return $this->hasMany(ViewLink::class);
    }

    public function submissions()
    {
        return $this->hasMany(SharingSubmission::class);
    }

    public function checklists()
    {
        return $this->hasMany(Checklist::class);
    }

    public function safetyPlan()
    {
        return $this->hasOne(SafetyPlan::class);
    }

    public function communityProfile()
    {
        return $this->hasOne(CommunityProfile::class);
    }

    public function notificationPreference()
    {
        return $this->hasOne(NotificationPreference::class);
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function bookmarks()
    {
        return $this->hasMany(ArticleBookmark::class);
    }
}
