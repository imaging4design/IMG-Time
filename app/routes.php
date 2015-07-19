<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

/*
|-----------------------------------------------------------------------------------------------------------------
| HOME PAGE
|-----------------------------------------------------------------------------------------------------------------
*/

Route::get('/', function() {
	return View::make('index');
});

Route::group(array('prefix' => 'api'), function() {
	Route::post('auth/login', 'AuthController@login');
	Route::get('auth/logout', 'AuthController@logout');
});

Route::group(array('prefix' => 'api'), function() {
	//Route::resource('comments', 'CommentController', array('only' => array('index', 'store', 'destroy')));
	Route::resource('comments', 'ClientController');
});

Route::group(array('prefix' => 'api'), function() {
	Route::resource('jobs', 'JobController');
	Route::get('jobs-live', 'JobController@livejobs');
	Route::get('jobs-live/{month}/{year}', 'JobController@livejobs');
});

Route::group(array('prefix' => 'api'), function() {
	Route::resource('entrys', 'EntryController');
});



	Route::group(array('prefix' => 'api'), function() {
		Route::get('graphs/{id}/{year}', 'GraphController@show');
	});



Route::get('pdf/{id}', 'PdfController@index');

App::missing(function() {
	//return View::make('index');
	return Response::view('errors.missing', array(), 404);
});



// Route::get('/', function()
// {
// 	return View::make('hello');

// 	$user = User::create(array(
// 		'username' => 'accounts',
// 		'email' => 'accounts@imaging4design.co.nz',
// 		'password' => Hash::make('456789')
// 	));

// 	$user = User::find(7);

// 	$data = ['user' => $user];

// 	Mail::queue('welcome', $data, function($message) use ($user) {

// 		$message->to($user->email)->subject('Test Email');
// 	});

// 	return 'finished';

// });