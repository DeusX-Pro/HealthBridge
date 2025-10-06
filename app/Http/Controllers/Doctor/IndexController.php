<?php

namespace App\Http\Controllers\Doctor;

use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class IndexController extends Controller
{
    //
    public function index(): Response
    {
        return inertia('dashboard/doctor/index');
    }
}
