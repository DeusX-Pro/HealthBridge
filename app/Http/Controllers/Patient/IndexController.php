<?php

namespace App\Http\Controllers\Patient;

use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class IndexController extends Controller
{
    //
    public function index(): Response
    {
        return inertia('dashboard/patient/index');
    }
}
