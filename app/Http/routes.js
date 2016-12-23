'use strict'

const Route = use('Route')

Route.get('/', 'IndexController.index')
Route.get('/register', 'UserController.register')
Route.post('/register', 'UserController.doRegister')
Route.get('/login', 'UserController.login')
Route.post('/login', 'UserController.doLogin')
Route.get('/logout', 'UserController.doLogout')
Route.get('/editUser', 'UserController.editUser').middleware('auth')
Route.post('/editUser', 'UserController.doEdit').middleware('auth')
Route.get('/cars/createCar', 'CarController.createCar').middleware('auth')
Route.post('/cars/createCar', 'CarController.doCreateCar').middleware('auth')
Route.get('/cars/:id', 'CarController.show')
Route.get('/cars/:id/like', 'CarController.like').middleware('auth')
Route.get('/cars/:id/edit', 'CarController.edit').middleware('auth')
Route.post('/cars/:id/edit', 'CarController.doEdit').middleware('auth')
Route.get('/cars/:id/delete', 'CarController.doDelete').middleware('auth')
Route.get('/cars', 'CarController.search')
Route.get('/mycars', 'CarController.mysearch').middleware('auth')


Route.group('ajax', function () {
  Route.delete('/cars/:id/delete', 'CarController.ajaxDelete').middleware('auth')
  Route.post('/login', 'UserController.ajaxLogin')
}).prefix('/ajax')


