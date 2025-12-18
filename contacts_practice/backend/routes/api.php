<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ContactController;
use Illuminate\Support\Facades\Route;

Route::prefix('dev')->group(function(){
    Route::apiResource('contacts', ContactController::class);
}); 

Route::middleware('auth:sanctum')->group(function(){
    Route::apiResource('contacts', ContactController::class);
});

//? Public auth routes
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    // Protected auth routes
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
    });
});

//? Protected routes - all authenticated users
Route::middleware(['auth:sanctum'])->group(function () {
    // Dashboard - all roles
    // Route::get('/dashboard', [DashboardController::class, 'index']);
    // Organizations
    Route::prefix('contacts')->group(function () {
        // Read - all roles
        Route::get('/', [ContactController::class, 'index']);
        Route::get('/{contact}', [ContactController::class, 'show']);

        // Create/Update - Admin and Manager only
        Route::middleware(['role:admin,manager'])->group(function () {
            Route::post('/', [ContactController::class, 'store']);
            Route::put('/{contact}', [ContactController::class, 'update']);
        });
        
        // Delete - Admin only
        Route::delete('/{contact}', [ContactController::class, 'destroy'])
            ->middleware('role:admin');
    });
});