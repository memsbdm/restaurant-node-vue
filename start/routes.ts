/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const HomeController = () => import('#controllers/home_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const RegisterController = () => import('#controllers/auth/register_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')

// Landing page
router.get('/', [HomeController, 'render']).use(middleware.auth()).as('home.render')

// Auth
router
  .group(() => {
    router
      .group(() => {
        router.get('/login', [LoginController, 'render']).as('login.render')
        router.post('/login', [LoginController, 'handle']).as('login.handle')
        router.get('/register', [RegisterController, 'render']).as('register.render')
        router.post('/register', [RegisterController, 'handle']).as('register.handle')
      })
      .use(middleware.guest())

    router
      .delete('/logout', [LogoutController, 'handle'])
      .use(middleware.auth())
      .as('logout.handle')
  })
  .prefix('/auth')
  .as('auth')
