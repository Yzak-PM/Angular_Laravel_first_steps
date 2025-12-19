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
    Route::prefix('contacts')->name('contacts.')->group(function () {
        // Read operations
        Route::get('/search', [ContactController::class, 'search'])->middleware('permission:contacts,view');
        Route::get('/for-select', [ContactController::class, 'forSelect'])->middleware('permission:contacts,view');
        Route::get('/statistics', [ContactController::class, 'statistics'])->middleware('permission:contacts,view');
        Route::get('/', [ContactController::class, 'index'])->middleware('permission:contacts,view');
        Route::get('/{contact}', [ContactController::class, 'show'])->middleware('permission:contacts,view');
        Route::post('/', [ContactController::class, 'store'])->middleware('permission:contacts,create');
        Route::put('/{contact}', [ContactController::class, 'update'])->middleware('permission:contacts,update');
        Route::patch('/{contact}', [ContactController::class, 'update'])->middleware('permission:contacts,update');
        Route::delete('/{contact}', [ContactController::class, 'destroy'])->middleware('permission:contacts,delete');
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