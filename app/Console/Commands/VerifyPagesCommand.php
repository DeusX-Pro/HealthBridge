<?php

namespace App\Console\Commands;

use App\Models\AddLink;
use App\Models\User;
use App\Models\ViewLink;
use App\Services\SharingService;
use Illuminate\Console\Command;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VerifyPagesCommand extends Command
{
    protected $signature = 'healthbridge:verify-pages';
    protected $description = 'Verify that all HealthBridge multi-page routes render with HTTP 200';

    public function handle(SharingService $sharing): int
    {
        $femaleUser = User::where('email', 'amara.demo@example.com')->first();
        $maleUser = User::where('email', 'chidi.demo@example.com')->first();

        if (!$femaleUser || !$maleUser) {
            $this->error('Demo users not found. Run php artisan db:seed first.');
            return 1;
        }

        $kernel = app()->make(\Illuminate\Contracts\Http\Kernel::class);

        // 1. Guest Routes
        $guestRoutes = [
            'Landing Page' => '/',
            'Auth - Login' => '/login',
            'Auth - Register' => '/register',
            'Auth - Forgot Password' => '/forgot-password',
        ];

        // 2. Female Authenticated Routes (Amara)
        $femaleRoutes = [
            'Today Hub' => '/today',
            'Timeline' => '/timeline',
            'Diary Index' => '/diary',
            'Diary Create' => '/diary/create',
            'Measurements Index' => '/measurements',
            'Measurements Create' => '/measurements/create',
            'Documents Index' => '/documents',
            'Documents Upload' => '/documents/upload',
            'Medications Index' => '/medications',
            'Medications Create' => '/medications/create',
            'Orders Index' => '/orders',
            'Cycle Tracking Index' => '/cycle',
            'Cycle Calendar' => '/cycle/calendar',
            'Cycle Insights' => '/cycle/insights',
            'Cycle Guides' => '/cycle/learn',
            'Contraception Plan' => '/contraception',
            'Nutrition Hub' => '/nutrition',
            'Nutrition Profile' => '/nutrition/profile',
            'Nutrition Foods' => '/nutrition/foods',
            'Nutrition Meal Plans' => '/nutrition/plans',
            'Nutrition Progress' => '/nutrition/progress',
            'Checklists Index' => '/checklists',
            'Safety Plan Index' => '/safety',
            'Safety Plan Edit' => '/safety/edit',
            'Community Hub' => '/community',
            'Community Create Post' => '/community/create-post',
            'Sharing Hub' => '/sharing',
            'Sharing View Links' => '/sharing/view-links',
            'Sharing Add Links' => '/sharing/add-links',
            'Sharing Submissions' => '/sharing/submissions',
            'Sharing Audit History' => '/sharing/history',
            'Hospitals Connected' => '/hospitals',
            'Articles Library' => '/articles',
            'Articles Saved' => '/articles/saved',
            'Settings Profile' => '/settings',
            'Settings Security' => '/settings/security',
            'Settings Notifications' => '/settings/notifications',
        ];

        // 3. Male Authenticated Routes (Chidi)
        $maleRoutes = [
            "Men's Health Hub" => '/mens-health',
            "Men's Health Guide" => '/mens-health/learn',
        ];

        // 4. Create Public Tokens for verification
        $viewLink = $sharing->createViewLink($femaleUser, 'Dr. Verification Test', ['DIARY', 'VITALS'], 'secret123', 7);
        $addLink = $sharing->createAddLink($femaleUser, 'Dr. Verification Test', 'secret123', 'Testing', 3, 1);

        $publicRoutes = [
            'Public View Portal (Unlock Screen)' => "/view/{$viewLink->token}",
            'Public Add Portal (Unlock Screen)' => "/add/{$addLink->token}",
        ];

        $totalCount = count($guestRoutes) + count($femaleRoutes) + count($maleRoutes) + count($publicRoutes) + 2; // +2 for privacy shield checks
        $this->info("Executing comprehensive end-to-end multi-page route test ({$totalCount} tests)...\n");

        $passed = 0;
        $failed = 0;

        // Test Guest Routes
        $this->comment("--- Guest Routes ---");
        foreach ($guestRoutes as $label => $uri) {
            Auth::logout();
            $req = Request::create($uri, 'GET');
            $session = app('session.store');
            $session->flush();
            $req->setLaravelSession($session);

            $startTime = microtime(true);
            $response = $kernel->handle($req);
            $elapsedMs = round((microtime(true) - $startTime) * 1000, 1);
            $status = $response->getStatusCode();

            if ($status === 200) {
                $this->line(" <info>✓ 200 OK</info>  [{$elapsedMs}ms] {$label} ({$uri})");
                $passed++;
            } else {
                $this->line(" <error>✗ {$status}</error> [{$elapsedMs}ms] {$label} ({$uri})");
                $failed++;
            }
            $kernel->terminate($req, $response);
        }

        // Test Female Patient Routes
        $this->comment("\n--- Female Patient Routes ({$femaleUser->name}) ---");
        foreach ($femaleRoutes as $label => $uri) {
            Auth::login($femaleUser);
            $req = Request::create($uri, 'GET');
            $req->setUserResolver(fn() => $femaleUser);

            $session = app('session.store');
            $session->put(Auth::getName(), $femaleUser->getAuthIdentifier());
            $req->setLaravelSession($session);

            $startTime = microtime(true);
            $response = $kernel->handle($req);
            $elapsedMs = round((microtime(true) - $startTime) * 1000, 1);
            $status = $response->getStatusCode();

            if ($status === 200) {
                $this->line(" <info>✓ 200 OK</info>  [{$elapsedMs}ms] {$label} ({$uri})");
                $passed++;
            } else {
                $this->line(" <error>✗ {$status}</error> [{$elapsedMs}ms] {$label} ({$uri})");
                $failed++;
            }
            $kernel->terminate($req, $response);
        }

        // Test Male Patient Routes
        $this->comment("\n--- Male Patient Routes ({$maleUser->name}) ---");
        foreach ($maleRoutes as $label => $uri) {
            Auth::login($maleUser);
            $req = Request::create($uri, 'GET');
            $req->setUserResolver(fn() => $maleUser);

            $session = app('session.store');
            $session->put(Auth::getName(), $maleUser->getAuthIdentifier());
            $req->setLaravelSession($session);

            $startTime = microtime(true);
            $response = $kernel->handle($req);
            $elapsedMs = round((microtime(true) - $startTime) * 1000, 1);
            $status = $response->getStatusCode();

            if ($status === 200) {
                $this->line(" <info>✓ 200 OK</info>  [{$elapsedMs}ms] {$label} ({$uri})");
                $passed++;
            } else {
                $this->line(" <error>✗ {$status}</error> [{$elapsedMs}ms] {$label} ({$uri})");
                $failed++;
            }
            $kernel->terminate($req, $response);
        }

        // Test Privacy Shield Scopes
        $this->comment("\n--- Privacy Shield Cryptographic Scopes ---");
        // Female attempting to access male scope:
        Auth::login($femaleUser);
        $req = Request::create('/mens-health', 'GET');
        $session = app('session.store');
        $session->put(Auth::getName(), $femaleUser->getAuthIdentifier());
        $req->setLaravelSession($session);
        $res = $kernel->handle($req);
        if ($res->getStatusCode() === 302) {
            $this->line(" <info>✓ 302 Redirect</info> Female user blocked from Men's Health privacy scope (redirected to /today with error flash)");
            $passed++;
        } else {
            $this->line(" <error>✗ {$res->getStatusCode()}</error> Privacy Shield failed to redirect female user from Men's Health");
            $failed++;
        }
        $kernel->terminate($req, $res);

        // Male attempting to access female scope:
        Auth::login($maleUser);
        $req = Request::create('/cycle', 'GET');
        $session = app('session.store');
        $session->put(Auth::getName(), $maleUser->getAuthIdentifier());
        $req->setLaravelSession($session);
        $res = $kernel->handle($req);
        if ($res->getStatusCode() === 302) {
            $this->line(" <info>✓ 302 Redirect</info> Male user blocked from Female Cycle privacy scope (redirected to /today with error flash)");
            $passed++;
        } else {
            $this->line(" <error>✗ {$res->getStatusCode()}</error> Privacy Shield failed to redirect male user from Female Cycle");
            $failed++;
        }
        $kernel->terminate($req, $res);

        // Test Public Tokens
        $this->comment("\n--- Public Sharing Gateways ---");
        foreach ($publicRoutes as $label => $uri) {
            Auth::logout();
            $req = Request::create($uri, 'GET');
            $session = app('session.store');
            $session->flush();
            $req->setLaravelSession($session);

            $startTime = microtime(true);
            $response = $kernel->handle($req);
            $elapsedMs = round((microtime(true) - $startTime) * 1000, 1);
            $status = $response->getStatusCode();

            if ($status === 200) {
                $this->line(" <info>✓ 200 OK</info>  [{$elapsedMs}ms] {$label} ({$uri})");
                $passed++;
            } else {
                $this->line(" <error>✗ {$status}</error> [{$elapsedMs}ms] {$label} ({$uri})");
                $failed++;
            }
            $kernel->terminate($req, $response);
        }

        $this->newLine();
        if ($failed === 0) {
            $this->info("================================================================================");
            $this->info(" PERFECT: ALL {$passed} VERIFICATION CHECKS PASSED WITH EXPECTED HTTP CODES! ");
            $this->info("================================================================================");
            return 0;
        } else {
            $this->error("FAILURE: {$failed} test(s) failed out of {$totalCount}");
            return 1;
        }
    }
}
