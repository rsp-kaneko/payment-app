<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
    //
    public function index()
    {
        if (Auth::user()->role->id !== 1) {
            return back();
        }
        return Inertia::render('Auth/UserManager');
    }

    public function getAllUsers()
    {
        $response = [];
        try {
            $users = User::with('role')->where('delete_flg', 0)->orderBy('id', 'asc')->get();
            $response = [
                'status' => 200,
                'users' => $users
            ];

        } catch (Exception $e) {
            $response = [
                'status' => 500,
                'error' => $e->getMessage()
            ];
        }

        return response()->json($response);
    }

    public function store(Request $request)
    {
        $response = [];
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
            ]);
            $user = new User();
            $createData = [
                'role_id' => 2,
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
                'max_total_price' => 100000,
                'max_page_count' => 10,
                'delete_flg' => 0
            ];
            $user->create($createData);

            $response = [
                'status' => 200
            ];

        } catch (Exception $e) {
            $response = [
                'status' => 500,
                'error' => $e->getMessage()
            ];
        }

        return response()->json($response);
    }

    public function update(Request $request, int $id)
    {
        $response = [];
        try {
            $user = User::findOrFail($id);

            $updateData = [
                'name' => $request->input('name') ?? $user->name,
                'email' => $request->input('email') ?? $user->email,
                'max_total_price' => $request->input('max_total_price') ?? $user->max_total_price,
                'max_page_count' => $request->input('max_page_count') ?? $user->max_page_count,
                'delete_flg' => $request->input('delete_flg') ?? 0
            ];

            if ($request->filled('password')) {
                $updateData['password'] = $request->input('password');
            }

            $user->update($updateData);
            $response = [
                'status' => 200
            ];

        } catch (Exception $e) {
            $response = [
                'status' => 500,
                'error' => $e->getMessage()
            ];
        }

        return response()->json($response);
    }
}
