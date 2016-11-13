'use strict'

const Route = use('Route')

// Route.on('/').render('welcome')
// Route.on('/').render('main')
// Route.get('/', function * (request, response) {
//     yield response.sendView('main');
// });
Route.get('/', 'IndexController.index')
Route.get('/login', 'UserController.login')
Route.post('/login', 'UserController.doLogin')
Route.get('/logout', 'UserController.doLogout')
Route.get('/editUser', 'UserController.editUser').middleware('auth')
Route.post('/editUser', 'UserController.doEdit').middleware('auth')


Route.get('/ads/create', 'RecipeController.create').middleware('auth')
Route.post('/ads/create', 'RecipeController.doCreate').middleware('auth')
Route.get('/ads/:id', 'RecipeController.show')
Route.get('/ads/:id/edit', 'RecipeController.edit').middleware('auth')
Route.post('/ads/:id/edit', 'RecipeController.doEdit').middleware('auth')
Route.get('/ads/:id/delete', 'RecipeController.doDelete').middleware('auth')
// Route.delete('/recipes/:id', 'RecipeController.doDelete')
Route.get('/recipes', 'RecipeController.search')

Route.get('/register', 'UserController.register')
Route.post('/register', 'UserController.doRegister')


