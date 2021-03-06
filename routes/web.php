<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::group(['prefix' => 'customer'], function(){
    Route::get('/', 'CustomerController@index')->name('customer.index');
    Route::get('/create', 'CustomerController@create')->name('customer.create');
    Route::post('/store', 'CustomerController@store')->name('customer.store');
    Route::get('/{customer}', 'CustomerController@edit')->name('customer.edit');
    Route::patch('/{customer}', 'CustomerController@update')->name('customer.update');
    Route::delete('/{customer}', 'CustomerController@destroy')->name('customer.destroy');
});

Route::group(['prefix' => 'item'], function(){
    Route::get('/', 'ItemController@index')->name('item.index');
    Route::get('/create', 'ItemController@create')->name('item.create');
    Route::post('/store', 'ItemController@store')->name('item.store');
    Route::get('/{item}', 'ItemController@edit')->name('item.edit');
    Route::patch('/{item}', 'ItemController@update')->name('item.update');
    Route::delete('/{item}', 'ItemController@destroy')->name('item.destroy');
});


Route::group(['prefix' => 'quotation'], function(){
    Route::get('/', 'QuotationController@index')->name('quotation.index');
    Route::get('/create', 'QuotationController@create')->name('quotation.create');
    Route::post('/store', 'QuotationController@store')->name('quotation.store');
    Route::get('/{quotation}', 'QuotationController@edit')->name('quotation.edit');
    Route::patch('/{quotation}', 'QuotationController@update')->name('quotation.update');
    Route::delete('/{quotation}', 'QuotationController@destroy')->name('quotation.destroy');
});

Route::get('/WorkOrder', function () {
    return view('WorkOrder.WorkOrder');
})->name('WorkOrder');


Route::get('bank', 'BankMasterController@index')->name('bank.index');
Route::get('bank/create', 'BankMasterController@create')->name('bank.create');
Route::post('bank/store', 'BankMasterController@store')->name('bank.store');
Route::get('bank/{bankMaster}', 'BankMasterController@edit')->name('bank.edit');
Route::patch('bank/{bankMaster}', 'BankMasterController@update')->name('bank.update');
Route::delete('bank/{bankMaster}', 'BankMasterController@destroy')->name('bank.destroy');


Route::get('make', 'MakeMasterController@index')->name('make.index');
Route::get('make/create', 'MakeMasterController@create')->name('make.create');
Route::post('make/store', 'MakeMasterController@store')->name('make.store');
Route::get('make/{makeMaster}', 'MakeMasterController@edit')->name('make.edit');
Route::patch('make/{makeMaster}', 'MakeMasterController@update')->name('make.update');
Route::delete('make/{makeMaster}', 'MakeMasterController@destroy')->name('make.destroy');


Route::get('transport', 'TransportMasterController@index')->name('transport.index');
Route::get('transport/create', 'TransportMasterController@create')->name('transport.create');
Route::post('transport/store', 'TransportMasterController@store')->name('transport.store');
Route::get('transport/{transportMaster}', 'TransportMasterController@edit')->name('transport.edit');
Route::patch('transport/{transportMaster}', 'TransportMasterController@update')->name('transport.update');
Route::delete('transport/{transportMaster}', 'TransportMasterController@destroy')->name('transport.destroy');
