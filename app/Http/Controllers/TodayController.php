<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\DailySymptomLog;
use App\Models\DoseLog;
use App\Models\HealthFact;
use App\Models\Measurement;
use App\Models\Medication;
use App\Models\SelfExamLog;
use Carbon\Carbon;
use Illuminate\Http\Request;

class TodayController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $today = Carbon::today()->toDateString();

        // 1. Scheduled Medication Doses for Today (Batch pre-fetched to eliminate N+1)
        $medications = Medication::where('user_id', $user->id)
            ->where('start_date', '<=', $today)
            ->where(function ($q) use ($today) {
                $q->whereNull('end_date')->orWhere('end_date', '>=', $today);
            })
            ->get();

        $doseLogs = DoseLog::whereIn('medication_id', $medications->pluck('id'))
            ->whereDate('scheduled_at', $today)
            ->get()
            ->keyBy(fn($l) => $l->medication_id . '_' . Carbon::parse($l->scheduled_at)->format('H:i'));

        $todayDoses = [];
        foreach ($medications as $med) {
            foreach ($med->dose_times ?? [] as $time) {
                $scheduledAt = Carbon::parse("{$today} {$time}")->toDateTimeString();
                $timeKey = Carbon::parse($time)->format('H:i');
                $log = $doseLogs->get("{$med->id}_{$timeKey}");

                $todayDoses[] = [
                    'medication_id' => $med->id,
                    'name' => $med->name,
                    'dose' => $med->dose,
                    'time' => $time,
                    'scheduled_at' => $scheduledAt,
                    'status' => $log ? $log->status : 'PENDING',
                ];
            }
        }
        usort($todayDoses, fn($a, $b) => strcmp($a['time'], $b['time']));

        // 2. Cycle or Men's Health daily glance
        $cycleInfo = null;
        $mensHealthInfo = null;
        if ($user->isFemale()) {
            $cycleInfo = [
                'hasLoggedToday' => DailySymptomLog::where('user_id', $user->id)->where('log_date', $today)->exists(),
                'prediction' => $user->cyclePredictions()->first(),
            ];
        } elseif ($user->isMale()) {
            $mensHealthInfo = [
                'lastExam' => SelfExamLog::where('user_id', $user->id)->latest('log_date')->first(),
            ];
        }

        // 3. Latest Vitals
        $latestBp = Measurement::where('user_id', $user->id)->where('measurement_type', 'BLOOD_PRESSURE')->latest('measured_at')->first();
        $latestWeight = Measurement::where('user_id', $user->id)->where('measurement_type', 'WEIGHT')->latest('measured_at')->first();
        $latestGlucose = Measurement::where('user_id', $user->id)->where('measurement_type', 'GLUCOSE')->latest('measured_at')->first();

        // 4. Random Health Fact
        $fact = HealthFact::inRandomOrder()->first();

        // 5. Featured Reads
        $articles = Article::with('category')->latest('published_at')->take(3)->get();

        // 6. Water & Calories today
        $waterToday = (int) $user->waterLogs()->where('log_date', $today)->sum('amount_ml');
        $caloriesToday = (int) $user->foodLogs()->where('log_date', $today)->sum('kcal');

        return view('today.index', compact(
            'user',
            'todayDoses',
            'cycleInfo',
            'mensHealthInfo',
            'latestBp',
            'latestWeight',
            'latestGlucose',
            'fact',
            'articles',
            'waterToday',
            'caloriesToday'
        ));
    }
}

