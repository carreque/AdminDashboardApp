<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\FacturaController;
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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    // Autentificación
    Route::post('login', 'App\Http\Controllers\AuthController@login');
    Route::post('logout', 'App\Http\Controllers\AuthController@logout');
    Route::post('refresh', 'App\Http\Controllers\AuthController@refresh');
    Route::post('me', 'App\Http\Controllers\AuthController@me');
    
});

Route::group([

    'middleware' => 'api',

], function ($router) {

    // Categorías
    Route::get('/categories', 'App\Http\Controllers\CategoryController@show');
    Route::post('/newCategory', 'App\Http\Controllers\CategoryController@store');
    Route::post('/deleteCategory', 'App\Http\Controllers\CategoryController@destroy');    

    //Productos
    Route::get('/meanPrice', 'App\Http\Controllers\ProductoController@getMediaOfPrices');
    Route::get('/getAProduct', 'App\Http\Controllers\ProductoController@show');
    Route::get('/getAllProducts', 'App\Http\Controllers\ProductoController@getAllProducts');
    Route::get('/getProductsCertainType', 'App\Http\Controllers\ProductoController@getProductsOfCertainCategory');
    Route::post('/editProduct', 'App\Http\Controllers\ProductoController@update');
    Route::post('/deleteProduct', 'App\Http\Controllers\ProductoController@destroy');
    Route::post('/deactivateProduct', 'App\Http\Controllers\ProductoController@deactivateProduct');
    Route::post('/newProduct', 'App\Http\Controllers\ProductoController@store');
    Route::post('/newIVA', 'App\Http\Controllers\ProductoController@changeIva');
    Route::post('/newPrices', 'App\Http\Controllers\ProductoController@changePriceProduct');

    //Facturas
    Route::get('/earnToday', 'App\Http\Controllers\FacturaController@getAmountOfPricesEarnToday');
    Route::get('/earnLastSixMonth', 'App\Http\Controllers\FacturaController@getPricesLastSixMonth');

    //Usuarios
    Route::get('/allUsers', 'App\Http\Controllers\Controller@getUsers');
    Route::get('/getInfoUser', 'App\Http\Controllers\Controller@getAUser');
    Route::post('/deleteUser', 'App\Http\Controllers\Controller@deleteUser');
    Route::post('/newUser', 'App\Http\Controllers\Controller@newUser');
    Route::post('/editUser', 'App\Http\Controllers\Controller@editUser');
});