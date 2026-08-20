<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class TopController extends Controller
{
    //
    public function top()
    {
        return Inertia::render('Top');
    }
}
