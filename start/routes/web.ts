/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const DeleteArticleImageController = () =>
  import('#controllers/articles/delete_article_image_controller')
const UpdateArticleOrderController = () =>
  import('#controllers/articles/update_article_order_controller')
const UpdateArticleController = () => import('#controllers/articles/update_article_controller')
const DeleteArticleController = () => import('#controllers/articles/delete_article_controller')
const CreateArticleController = () => import('#controllers/articles/create_article_controller')
const UpdateCategoryOrderController = () =>
  import('#controllers/categories/update_category_order_controller')
const DeleteCategoryController = () => import('#controllers/categories/delete_category_controller')
const UpdateCategoryController = () => import('#controllers/categories/update_category_controller')
const CreateCategoryController = () => import('#controllers/categories/create_category_controller')
const DeleteMenuController = () => import('#controllers/menus/delete_menu_controller')
const ActiveMenuController = () => import('#controllers/menus/active_menu_controller')
const ActiveRestaurantController = () =>
  import('#controllers/restaurants/active_restaurant_controller')
const ForgotPasswordController = () => import('#controllers/auth/forgot_password_controller')
const HomeController = () => import('#controllers/home_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const RegisterController = () => import('#controllers/auth/register_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')
const CreateRestaurantController = () =>
  import('#controllers/restaurants/create_restaurant_controller')
const CreateMenuController = () => import('#controllers/menus/create_menu_controller')
const UpdateMenuController = () => import('#controllers/menus/update_menu_controller')
const ShowMenuController = () => import('#controllers/menus/show_menu_controller')

// Landing page
router
  .get('/', [HomeController, 'render'])
  .use([middleware.auth(), middleware.restaurant()])
  .as('home.render')

// Auth
router
  .group(() => {
    router
      .group(() => {
        router.get('/login', [LoginController, 'render']).as('login.render')
        router.post('/login', [LoginController, 'handle']).as('login.handle')
        router.get('/register', [RegisterController, 'render']).as('register.render')
        router.post('/register', [RegisterController, 'handle']).as('register.handle')

        router
          .get('forgot-password', [ForgotPasswordController, 'render'])
          .as('forgot-password.render')
        router
          .post('forgot-password', [ForgotPasswordController, 'send'])
          .as('forgot-password.send')
        router
          .get('forgot-password/reset/:value', [ForgotPasswordController, 'reset'])
          .as('forgot-password.reset')
        router
          .patch('forgot-password/reset', [ForgotPasswordController, 'update'])
          .as('forgot-password.update')
      })
      .use(middleware.guest())

    router
      .delete('/logout', [LogoutController, 'handle'])
      .use(middleware.auth())
      .as('logout.handle')
  })
  .prefix('/auth')
  .as('auth')

// Restaurants
router
  .group(() => {
    router.get('/', [CreateRestaurantController, 'render']).as('create.render')
    router.post('/', [CreateRestaurantController, 'handle']).as('create.handle')
    router.get('/:id', [ActiveRestaurantController, 'handle']).as('active.handle')
  })
  .use(middleware.auth())
  .prefix('/restaurants')
  .as('restaurants')

// Menus
router
  .group(() => {
    router.get('/', [CreateMenuController, 'render']).as('create.render')
    router.get('/:id', [ShowMenuController, 'render']).as('show.render')
    router.post('/', [CreateMenuController, 'handle']).as('create.handle')
    router.put('/:id', [UpdateMenuController, 'handle']).as('update.handle')
    router.patch('/:id', [ActiveMenuController, 'handle']).as('active.handle')
    router.delete('/:id', [DeleteMenuController, 'handle']).as('delete.handle')
  })
  .use([middleware.auth(), middleware.restaurant()])
  .prefix('/menus')
  .as('menus')

// Categories
router
  .group(() => {
    router
      .post('/menus/:menuId/categories', [CreateCategoryController, 'handle'])
      .as('create.handle')
    router
      .put('/menus/:menuId/categories/:categoryId', [UpdateCategoryController, 'handle'])
      .as('update.handle')
    router
      .delete('/menus/:menuId/categories/:categoryId', [DeleteCategoryController, 'handle'])
      .as('delete.handle')
    router
      .patch('/menus/:menuId/categories/order', [UpdateCategoryOrderController, 'handle'])
      .as('order.handle')
  })
  .use([middleware.auth(), middleware.restaurant()])
  .prefix('/categories')
  .as('categories')

// Articles
router
  .group(() => {
    router.post('/', [CreateArticleController, 'handle']).as('create.handle')
    router.put('/:id', [UpdateArticleController, 'handle']).as('update.handle')
    router
      .patch('/menus/:menuId/order', [UpdateArticleOrderController, 'handle'])
      .as('order.handle')
    router.delete('/:id', [DeleteArticleController, 'handle']).as('delete.handle')
    router.delete('/:id/image', [DeleteArticleImageController, 'handle']).as('delete.image.handle')
  })
  .use([middleware.auth(), middleware.restaurant()])
  .prefix('/articles')
  .as('articles')
