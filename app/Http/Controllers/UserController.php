<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    //
    public function index()
    {
        // if (Auth::user()->role->id != 1) {
        //     return back();
        // }
        return Inertia::render('Auth/UserManager');
    }
}
