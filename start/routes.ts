/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const HomeController = () => import('#controllers/home_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const RegisterController = () => import('#controllers/auth/register_controller')

// Landing page
router.get('/', [HomeController, 'render']).as('home.render')

// Auth
router
  .group(() => {
    router.get('/login', [LoginController, 'render']).as('login.render')
    router.get('/register', [RegisterController, 'render']).as('register.render')
  })
  .prefix('/auth')
  .as('auth')
