<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

// Admin 
$router->group(['prefix' => 'admin'], function () use ($router) {

	// Category
	$router->get('categories', ['middleware' => 'auth','uses' => 'CategoryController@showAllCategories']);
	$router->post('categories', ['middleware' => 'auth','uses' => 'CategoryController@create']);
	$router->get('categories/{id}', ['middleware' => 'auth','uses' => 'CategoryController@showOneCategory']);
	$router->get('categories/{id}/questions', ['middleware' => 'auth','uses' => 'CategoryController@showAdminQuestionsOfCategory']);
	$router->delete('categories/{id}', ['middleware' => 'auth','uses' => 'CategoryController@delete']);
	$router->post('categories/{id}', ['middleware' => 'auth','uses' => 'CategoryController@update']);

	// Unit
	$router->get('units', ['middleware' => 'auth','uses' => 'UnitController@showAll']);
	$router->post('units', ['middleware' => 'auth','uses' => 'UnitController@create']);
	$router->get('units/{id}', ['middleware' => 'auth','uses' => 'UnitController@showOne']);
	$router->delete('units/{id}', ['middleware' => 'auth','uses' => 'UnitController@delete']);
	$router->post('units/{id}', ['middleware' => 'auth','uses' => 'UnitController@update']);

	// User
	$router->get('users', ['middleware' => 'auth', 'uses' => 'UserController@showAllUsers']);
	$router->post('users', ['middleware' => 'auth', 'uses' => 'UserController@create']);
	$router->post('users/updateCurrent',  ['middleware' => 'auth', 'uses' => 'UserController@updateCurrent']);
	$router->post('users/{id}', ['middleware' => 'auth', 'uses' => 'UserController@update']);
	$router->delete('users/{id}', ['middleware' => 'auth', 'uses' => 'UserController@delete']);

	// Question
	$router->get('questions', ['middleware' => 'auth', 'uses' => 'QuestionController@showAlls']);
	$router->post('questions', ['middleware' => 'auth', 'uses' => 'QuestionController@create']);
	$router->get('questions/{id}', ['middleware' => 'auth', 'uses' => 'QuestionController@showOne']);
	$router->delete('questions/{id}', ['middleware' => 'auth', 'uses' => 'QuestionController@delete']);
	$router->post('questions/{id}', ['middleware' => 'auth', 'uses' => 'QuestionController@update']);

	// Staff
	$router->get('staffs', ['middleware' => 'auth', 'uses' => 'StaffController@showAll']);
	$router->get('staffs/{id}', ['middleware' => 'auth', 'uses' => 'StaffController@showOne']);
	$router->post('staffs', ['middleware' => 'auth', 'uses' => 'StaffController@create']);
	$router->post('staffs/addArray', ['middleware' => 'auth', 'uses' => 'StaffController@createFromArray']);
	$router->post('staffs/{id}', ['middleware' => 'auth', 'uses' => 'StaffController@update']);
	$router->delete('staffs/{id}', ['middleware' => 'auth', 'uses' => 'StaffController@delete']);
	$router->get('staffs/{id}/tests', ['middleware' => 'auth', 'uses' => 'StaffController@getTestsOfStaff']);

	// Exam
	$router->get('exams', ['middleware' => 'auth', 'uses' => 'ExamController@showAll']);
	$router->post('exams', ['middleware' => 'auth', 'uses' => 'ExamController@create']);
	$router->post('exams/{id}', ['middleware' => 'auth', 'uses' => 'ExamController@update']);
	$router->delete('exams/{id}', ['middleware' => 'auth', 'uses' => 'ExamController@delete']);
	$router->get('exams/{id}', ['middleware' => 'auth', 'uses' => 'ExamController@showOne']);
	$router->get('exams/{id}/tests', ['middleware' => 'auth', 'uses' => 'ExamController@getTestsOfExam']);

	// Test
	$router->get('tests/{id}/detailWithQuestions', ['middleware' => 'auth', 'uses' => 'TestController@getDetailWithQuestions']);

	// Login
	$router->post('auth/login', ['uses' => 'AuthController@login']);
	$router->get('auth/currentUser', ['uses' => 'AuthController@currentUser']);
	$router->get('auth/renew', ['middleware' => 'auth', 'uses' => 'AuthController@renew']);
});

// Public
$router->group(['prefix' => 'public'], function () use ($router) {
	$router->get('categories', ['uses' => 'CategoryController@showAllCategories']);
	
	$router->get('exams', ['uses' => 'ExamController@showAllActiveExams']);
	$router->post('exams/questions', ['uses' => 'ExamController@getQuestions']);
	$router->post('exams/anwsers', ['uses' => 'ExamController@Anwsers']);

	$router->get('staffs/{code}', ['uses' => 'StaffController@showOneByCode']);
});
