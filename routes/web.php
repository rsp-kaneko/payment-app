<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TopController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/', [TopController::class, 'top'])->name('top');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::controller(PaymentController::class)->prefix('payments')->middleware(['auth'])->group(function() {
    Route::get('/getUserAllPayments', 'getUserAllPayments')->name('payments.get');
    Route::post('/store', 'store')->name('payments.store');
    Route::post('/storeReceipt', 'storeReceiptData')->name('payments.storeReceipt');
    Route::post('/destroy', 'destroy')->name('payments.destroy');
    Route::patch('/{id}/update', 'update')->name('payments.update');
    Route::post('/{id}/joinTags', 'joinTags')->name('payments.joinTags');
});

Route::controller(TagController::class)->prefix('tags')->middleware(['auth'])->group(function() {
    Route::get('/getAll', 'getAll')->name('tags.getAll');
    Route::get('/getMonthlyTags', 'getMonthlyTags')->name('tags.getMonthlyTags');
    Route::get('/getMonthlyPaymentTagList', 'getMonthlyPaymentTagList')->name('tags.getMonthlyPaymentTagList');
    Route::post('/store', 'store')->name('tags.store');
    Route::patch('/{id}/update', 'update')->name('tags.update');
    Route::delete('/{id}/destroy', 'destroy')->name('tags.destroy');
});

Route::controller(UserController::class)->prefix('users')->middleware(['auth'])->group(function() {
    Route::get('/userManager', 'index')->name('users.index');
    Route::get('/getAllUsers', 'getAllUsers')->name('users.getAllUsers');
    Route::post('/store', 'store')->name('users.store');
    Route::patch('/{id}/update', 'update')->name('users.update');
});


require __DIR__.'/auth.php';
