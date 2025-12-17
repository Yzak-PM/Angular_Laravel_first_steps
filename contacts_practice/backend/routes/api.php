<?php

use App\Http\Controllers\Api\ContactController;
use Illuminate\Support\Facades\Route;

Route::prefix('dev')->group(function(){
    Route::apiResource('contacts', ContactController::class);
}); 

Route::middleware('auth:sanctum')->group(function(){
    Route::apiResource('contacts', ContactController::class);
});