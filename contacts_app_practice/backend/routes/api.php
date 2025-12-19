<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\PermissionController;
use App\Http\Controllers\Api\RolePermissionController;

// Public auth routes
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    // Protected auth routes
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
    });
});

// Protected routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/permissions', [PermissionController::class, 'index'])->name('permissions');

    // Contacts (single source of truth)
    Route::prefix('contacts')->group(function () {
        // Read - all authenticated
        Route::get('/', [ContactController::class, 'index']);
        Route::get('/{contact}', [ContactController::class, 'show']);

        // Create/Update - allow sales_rep too (as you want)
        Route::post('/', [ContactController::class, 'store'])->middleware('role:admin,manager,sales_rep');
        Route::put('/{contact}', [ContactController::class, 'update'])->middleware('role:admin,manager,sales_rep');
        Route::patch('/{contact}', [ContactController::class, 'update'])->middleware('role:admin,manager,sales_rep');

        // Delete - admin only (ajusta si manager también debe borrar)
        Route::delete('/{contact}', [ContactController::class, 'destroy'])->middleware('role:admin');
    });

    // Role-permissions admin only
    Route::middleware(['role:admin'])->prefix('role-permissions')->name('role-permissions.')->group(function () {
        Route::get('/', [RolePermissionController::class, 'index'])->name('index');
        Route::get('/{role}', [RolePermissionController::class, 'show'])->name('show');
        Route::put('/{role}', [RolePermissionController::class, 'update'])->name('update');
        Route::patch('/single', [RolePermissionController::class, 'updateSingle'])->name('update-single');
        Route::post('/reset', [RolePermissionController::class, 'reset'])->name('reset');
    });
});

// Dev routes (only local/testing)
if (app()->environment(['local', 'testing'])) {
    Route::prefix('dev')->group(function () {
        Route::apiResource('contacts', ContactController::class);
    });
}