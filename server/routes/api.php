<?php

use App\Http\Controllers;
use App\Http\Controllers\BookController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'middleware' => 'api',
    'namespace' => 'App\Http\Controllers',
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::get('me', 'AuthController@me');
});

Route::resource('users', UserController::class)->only([
    'index', 'destroy', 'show', 'store', 'update'
])->middleware('api');

Route::get('books/bid/{bid}', 'App\Http\Controllers\BookController@showByBID');
Route::resource('books', BookController::class)->only([
    'index', 'destroy', 'show', 'store', 'update'
])->middleware('api');

Route::resource('reviews', ReviewController::class)->only([
    'index', 'destroy', 'show', 'store', 'update'
])->middleware('api');