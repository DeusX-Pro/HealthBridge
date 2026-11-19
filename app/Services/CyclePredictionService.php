<?php

namespace App\Services;

use App\Models\CycleRecord;
use App\Models\CyclePrediction;
use App\Models\User;
use Carbon\Carbon;

class CyclePredictionService
{
    public function recalculatePredictions(User $user): ?CyclePrediction
    {
        $latestCycle = CycleRecord::where('user_id', $user->id)
            ->orderByDesc('cycle_start_date')
            ->first();

        if (!$latestCycle) {
            return null;
        }

        // Calculate average cycle length from past cycles (default to 28 days)
        $avgLength = (int) (CycleRecord::where('user_id', $user->id)
            ->whereNotNull('cycle_length_days')
            ->where('is_atypical', false)
            ->avg('cycle_length_days') ?: 28);

        $startDate = Carbon::parse($latestCycle->cycle_start_date);
        $nextStartDate = $startDate->copy()->addDays($avgLength);
        // Ovulation is typically 14 days before the next period
        $ovulationDate = $nextStartDate->copy()->subDays(14);
        // Fertile window: 4 days before ovulation to 1 day after
        $fertileStart = $ovulationDate->copy()->subDays(4);
        $fertileEnd = $ovulationDate->copy()->addDay();

        return CyclePrediction::updateOrCreate(
            ['user_id' => $user->id],
            [
                'predicted_start_date' => $nextStartDate->toDateString(),
                'predicted_ovulation' => $ovulationDate->toDateString(),
                'fertile_window_start' => $fertileStart->toDateString(),
                'fertile_window_end' => $fertileEnd->toDateString(),
            ]
        );
    }
}

