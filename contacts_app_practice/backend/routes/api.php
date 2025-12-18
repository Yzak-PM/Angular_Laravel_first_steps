<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ContactController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RolePermissionController;
use App\Http\Controllers\Api\PermissionController;

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
    Route::get('/permissions', [PermissionController::class, 'index'])->name('permissions');

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

    Route::middleware(['role:admin'])->prefix('role-permissions')->name('role-permissions.')->group(function () {
        Route::get('/', [RolePermissionController::class, 'index'])->name('index');
        Route::get('/{role}', [RolePermissionController::class, 'show'])->name('show');
        Route::put('/{role}', [RolePermissionController::class, 'update'])->name('update');
        Route::patch('/single', [RolePermissionController::class, 'updateSingle'])->name('update-single');
        Route::post('/reset', [RolePermissionController::class, 'reset'])->name('reset');
    });
});