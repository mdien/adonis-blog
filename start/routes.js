'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('home')

Route.on('/signup').render('signup')
Route.post('/signup','UserController.create').validator('CreateUser')

Route.on('/login').render('login')
Route.post('/login', 'UserController.login').validator('LoginUser')

Route.get('/logout', async ({ auth, response}) => {
    await auth.logout()
    return response.redirect('/')
})

Route.get('/posts','PostController.index')
Route.get('/posts/add','PostController.add')
Route.post('/posts','PostController.store').validator('CreatePost')
Route.get('/posts/:id', 'PostController.details')
Route.get('/posts/edit/:id', 'PostController.edit')
Route.put('/posts/:id', 'PostController.update').validator('UpdatePost')
Route.delete('/posts/:id', 'PostController.destroy')