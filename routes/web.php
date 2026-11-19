<?php

use App\Http\Controllers\ArticlesController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\MfaController;
use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\ChecklistsController;
use App\Http\Controllers\CommunityController;
use App\Http\Controllers\ContraceptionController;
use App\Http\Controllers\CycleController;
use App\Http\Controllers\DiaryController;
use App\Http\Controllers\DocumentsController;
use App\Http\Controllers\HospitalsController;
use App\Http\Controllers\LegalController;
use App\Http\Controllers\MeasurementsController;
use App\Http\Controllers\MedicationsController;
use App\Http\Controllers\MensHealthController;
use App\Http\Controllers\NutritionController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\PublicLinkController;
use App\Http\Controllers\SafetyPlanController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\SharingController;
use App\Http\Controllers\TimelineController;
use App\Http\Controllers\TodayController;
use App\Http\Middleware\RequireFemaleScope;
use App\Http\Middleware\RequireLegalConsents;
use App\Http\Middleware\RequireMaleScope;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Landing Page
|--------------------------------------------------------------------------
*/
Route::get('/', function () {
    return view('welcome');
})->name('home');

/*
|--------------------------------------------------------------------------
| Public Link Access (/view/{token} & /add/{token})
|--------------------------------------------------------------------------
*/
Route::prefix('view')->name('public.view')->group(function () {
    Route::get('{token}', [PublicLinkController::class, 'showViewLink']);
    Route::post('{token}/unlock', [PublicLinkController::class, 'unlockViewLink'])->name('.unlock')->middleware('throttle:5,1');
    Route::get('{token}/documents/{docId}', [PublicLinkController::class, 'downloadViewDocument'])->name('.download');
});

Route::prefix('add')->name('public.add')->group(function () {
    Route::get('{token}', [PublicLinkController::class, 'showAddLink']);
    Route::post('{token}/unlock', [PublicLinkController::class, 'unlockAddLink'])->name('.unlock')->middleware('throttle:5,1');
    Route::post('{token}/submissions', [PublicLinkController::class, 'submitAddLink'])->name('.submit')->middleware('throttle:10,1');
});

/*
|--------------------------------------------------------------------------
| Legal Terms (Public & Gated)
|--------------------------------------------------------------------------
*/
Route::prefix('legal')->name('legal.')->group(function () {
    Route::get('signup', [LegalController::class, 'signupTerms'])->name('signup');
    Route::get('outstanding', [LegalController::class, 'outstanding'])->name('outstanding')->middleware('auth');
    Route::post('accept', [LegalController::class, 'accept'])->name('accept')->middleware('auth');
    Route::get('{slug}', [LegalController::class, 'show'])->name('show');
});

/*
|--------------------------------------------------------------------------
| Authentication
|--------------------------------------------------------------------------
*/
Route::middleware('guest')->group(function () {
    Route::get('login', [LoginController::class, 'create'])->name('login');
    Route::post('login', [LoginController::class, 'store'])->name('login.store')->middleware('throttle:5,1');

    Route::get('register', [RegisterController::class, 'create'])->name('register');
    Route::post('register', [RegisterController::class, 'store'])->name('register.store')->middleware('throttle:5,1');

    Route::get('mfa', [MfaController::class, 'create'])->name('auth.mfa');
    Route::post('mfa', [MfaController::class, 'verify'])->name('auth.mfa.verify')->middleware('throttle:5,1');

    Route::get('forgot-password', [PasswordResetController::class, 'forgot'])->name('password.request');
    Route::post('forgot-password', [PasswordResetController::class, 'sendLink'])->name('password.email')->middleware('throttle:3,1');
    Route::get('reset-password/{token}', [PasswordResetController::class, 'edit'])->name('password.reset');
    Route::post('reset-password', [PasswordResetController::class, 'update'])->name('password.update')->middleware('throttle:5,1');
});

Route::post('logout', [LoginController::class, 'destroy'])->name('logout')->middleware('auth');

/*
|--------------------------------------------------------------------------
| Authenticated Patient Application
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', RequireLegalConsents::class])->group(function () {
    // Today (Glance Dashboard)
    Route::get('today', [TodayController::class, 'index'])->name('today');
    Route::get('dashboard', fn() => redirect()->route('today'))->name('dashboard');

    // Health Timeline
    Route::get('timeline', [TimelineController::class, 'index'])->name('timeline.index');

    // Diary & Notes
    Route::resource('diary', DiaryController::class);
    Route::post('diary/{id}/annotations', [DiaryController::class, 'addAnnotation'])->name('diary.annotations.store');

    // Vitals & Measurements
    Route::resource('measurements', MeasurementsController::class)->except(['edit', 'update']);

    // Document Vault
    Route::get('documents', [DocumentsController::class, 'index'])->name('documents.index');
    Route::get('documents/upload', [DocumentsController::class, 'create'])->name('documents.upload');
    Route::post('documents', [DocumentsController::class, 'store'])->name('documents.store');
    Route::get('documents/{id}', [DocumentsController::class, 'show'])->name('documents.show');
    Route::get('documents/{id}/download', [DocumentsController::class, 'download'])->name('documents.download');
    Route::delete('documents/{id}', [DocumentsController::class, 'destroy'])->name('documents.destroy');

    // Medications & Dose Tracker
    Route::resource('medications', MedicationsController::class);
    Route::post('medications/{id}/doses', [MedicationsController::class, 'logDose'])->name('medications.doses.log');
    Route::delete('medications/{id}/doses', [MedicationsController::class, 'undoDose'])->name('medications.doses.undo');

    // Orders Tracking
    Route::get('orders', [OrdersController::class, 'index'])->name('orders.index');
    Route::get('orders/{id}', [OrdersController::class, 'show'])->name('orders.show');

    // Women's Cycle & Reproductive Health (Privacy Shield)
    Route::middleware(RequireFemaleScope::class)->prefix('cycle')->name('cycle.')->group(function () {
        Route::get('/', [CycleController::class, 'index'])->name('index');
        Route::get('calendar', [CycleController::class, 'calendar'])->name('calendar');
        Route::get('insights', [CycleController::class, 'insights'])->name('insights');
        Route::get('learn', [CycleController::class, 'learn'])->name('learn');
        Route::post('log', [CycleController::class, 'log'])->name('log');
    });

    // Contraception
    Route::middleware(RequireFemaleScope::class)->prefix('contraception')->name('contraception.')->group(function () {
        Route::get('/', [ContraceptionController::class, 'index'])->name('index');
        Route::post('/', [ContraceptionController::class, 'update'])->name('update');
    });

    // Men's Health (Privacy Shield)
    Route::middleware(RequireMaleScope::class)->prefix('mens-health')->name('mens-health.')->group(function () {
        Route::get('/', [MensHealthController::class, 'index'])->name('index');
        Route::post('log', [MensHealthController::class, 'log'])->name('log');
        Route::match(['post', 'put'], 'settings', [MensHealthController::class, 'updateSettings'])->name('settings');
        Route::get('learn', [MensHealthController::class, 'learn'])->name('learn');
    });

    // Nutrition & Wellness
    Route::prefix('nutrition')->name('nutrition.')->group(function () {
        Route::get('/', [NutritionController::class, 'index'])->name('index');
        Route::get('profile', [NutritionController::class, 'profile'])->name('profile');
        Route::post('profile', [NutritionController::class, 'saveProfile'])->name('profile.save');
        Route::get('foods', [NutritionController::class, 'foods'])->name('foods');
        Route::post('foods', [NutritionController::class, 'storeFood'])->name('foods.store');
        Route::post('log', [NutritionController::class, 'logFood'])->name('log');
        Route::post('log/store', [NutritionController::class, 'logFood'])->name('log.store');
        Route::delete('log/{id}', [NutritionController::class, 'deleteFoodLog'])->name('log.destroy');
        Route::delete('food/{id}', [NutritionController::class, 'deleteFoodLog'])->name('food.delete');
        Route::post('water', [NutritionController::class, 'addWater'])->name('water');
        Route::post('water/store', [NutritionController::class, 'addWater'])->name('water.store');
        Route::delete('water/{id}', [NutritionController::class, 'deleteWater'])->name('water.delete');
        Route::delete('water/{id}/destroy', [NutritionController::class, 'deleteWater'])->name('water.destroy');
        Route::get('plans', [NutritionController::class, 'plans'])->name('plans');
        Route::post('plans/generate', [NutritionController::class, 'generatePlan'])->name('plan.generate');
        Route::get('progress', [NutritionController::class, 'progress'])->name('progress');
    });

    // Checklists
    Route::resource('checklists', ChecklistsController::class)->only(['index', 'store', 'show', 'destroy']);
    Route::post('checklists/{id}/items', [ChecklistsController::class, 'addItem'])->name('checklists.items.store');
    Route::post('checklists/{id}/items/{itemId}/toggle', [ChecklistsController::class, 'toggleItem'])->name('checklists.items.toggle');

    // Safety Plan
    Route::get('safety', [SafetyPlanController::class, 'index'])->name('safety.index');
    Route::get('safety/edit', [SafetyPlanController::class, 'edit'])->name('safety.edit');
    Route::post('safety', [SafetyPlanController::class, 'update'])->name('safety.update');

    // Community Support Channels
    Route::prefix('community')->name('community.')->group(function () {
        Route::get('/', [CommunityController::class, 'index'])->name('index');
        Route::get('channels/{slug}', [CommunityController::class, 'channel'])->name('channel');
        Route::get('create-post', [CommunityController::class, 'createPost'])->name('post.create');
        Route::post('posts', [CommunityController::class, 'storePost'])->name('post.store');
        Route::get('posts/{id}', [CommunityController::class, 'post'])->name('post');
        Route::post('posts/{id}/comments', [CommunityController::class, 'storeComment'])->name('comment.store');
        Route::post('report', [CommunityController::class, 'report'])->name('report');
    });

    // Sharing, Links & Care Team
    Route::prefix('sharing')->name('sharing.')->group(function () {
        Route::get('/', [SharingController::class, 'index'])->name('index');
        Route::get('view-links', [SharingController::class, 'viewLinks'])->name('view-links');
        Route::post('view-links', [SharingController::class, 'storeViewLink'])->name('view-links.store');
        Route::post('view-links/{id}/revoke', [SharingController::class, 'revokeViewLink'])->name('view-links.revoke');
        Route::get('add-links', [SharingController::class, 'addLinks'])->name('add-links');
        Route::post('add-links', [SharingController::class, 'storeAddLink'])->name('add-links.store');
        Route::post('add-links/{id}/revoke', [SharingController::class, 'revokeAddLink'])->name('add-links.revoke');
        Route::get('submissions', [SharingController::class, 'submissions'])->name('submissions');
        Route::post('submissions/{id}/accept', [SharingController::class, 'acceptSubmission'])->name('submissions.accept');
        Route::post('submissions/{id}/reject', [SharingController::class, 'rejectSubmission'])->name('submissions.reject');
        Route::get('history', [SharingController::class, 'history'])->name('history');
    });
    Route::get('privacy', fn() => redirect()->route('sharing.history'))->name('privacy');

    // Connected Hospitals
    Route::get('hospitals', [HospitalsController::class, 'index'])->name('hospitals.index');
    Route::post('hospitals/connect', [HospitalsController::class, 'connect'])->name('hospitals.connect');
    Route::post('hospitals/{id}/toggle-hide', [HospitalsController::class, 'toggleHide'])->name('hospitals.toggle-hide');

    // Health Articles Library
    Route::get('articles', [ArticlesController::class, 'index'])->name('articles.index');
    Route::get('articles/saved', [ArticlesController::class, 'saved'])->name('articles.saved');
    Route::get('articles/{slug}', [ArticlesController::class, 'show'])->name('articles.show');
    Route::post('articles/{id}/bookmark', [ArticlesController::class, 'toggleBookmark'])->name('articles.bookmark');

    // Settings & Notifications
    Route::prefix('settings')->name('settings.')->group(function () {
        Route::get('/', [SettingsController::class, 'index'])->name('index');
        Route::match(['post', 'put'], 'profile', [SettingsController::class, 'updateProfile'])->name('profile');
        Route::get('security', [SettingsController::class, 'security'])->name('security');
        Route::match(['post', 'put'], 'password', [SettingsController::class, 'updatePassword'])->name('password');
        Route::post('mfa/activate', [SettingsController::class, 'activateMfa'])->name('security.mfa.activate');
        Route::post('mfa/disable', [SettingsController::class, 'disableMfa'])->name('security.mfa.disable');
        Route::get('notifications', [SettingsController::class, 'notifications'])->name('notifications');
        Route::match(['post', 'put'], 'notifications/preferences', [SettingsController::class, 'updateNotificationPreferences'])->name('notifications.save');
        Route::post('notifications/mark-all-read', [SettingsController::class, 'markAllNotificationsRead'])->name('notifications.read-all');
    });

    Route::get('notifications', [SettingsController::class, 'notifications'])->name('notifications.index');
});
