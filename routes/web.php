<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\InvoiceController;
use App\Http\Controllers\Admin\PaymentController;
use App\Http\Controllers\Admin\PlanController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\SubscriptionController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('invoices/{id}/pdf', [InvoiceController::class, 'pdf'])->name('invoices.pdf');
    Route::resource('invoices', InvoiceController::class)->only(['index', 'show', 'store', 'update', 'destroy']);
    Route::get('payments/{id}/pdf', [PaymentController::class, 'pdf'])->name('payments.pdf');
    Route::resource('payments', PaymentController::class)->only(['index', 'show', 'store', 'update', 'destroy']);
    Route::resource('plans', PlanController::class)->only(['index', 'show', 'store', 'update', 'destroy']);

    Route::resource('subscriptions', SubscriptionController::class)->only(['index', 'show', 'store', 'update', 'destroy']);

    Route::resource('users', UserController::class)->only(['index', 'show', 'store', 'update', 'destroy']);
    Route::resource('settings', SettingController::class)->only(['index', 'show', 'store', 'update', 'destroy']);
});

require __DIR__.'/auth.php';
