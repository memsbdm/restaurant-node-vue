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
const CreateOptionCategoryController = () =>
  import('#controllers/option-categories/create_option_category_controller')
const EditArticleController = () => import('#controllers/articles/edit_article_controller')
const RemoveRestaurantUserController = () =>
  import('#controllers/settings/remove_restaurant_user_controller')
const CancelRestaurantInviteController = () =>
  import('#controllers/restaurants/cancel_restaurant_invite_controller')
const AcceptInvitationController = () => import('#controllers/restaurants/accept_invite_controller')
const InviteUserController = () => import('#controllers/restaurants/invite_user_controller')
const UpdateRestaurantController = () =>
  import('#controllers/restaurants/update_restaurant_controller')
const DeleteRestaurantController = () =>
  import('#controllers/restaurants/delete_restaurant_controller')
const DeleteAccountController = () => import('#controllers/settings/delete_account_controller')
const UpdateEmailController = () => import('#controllers/settings/update_email_controller')
const ShowAccountSettingsController = () =>
  import('#controllers/settings/show_account_settings_controller')
const UpdateProfileController = () => import('#controllers/settings/update_profile_controller')
const SetRestaurantCurrencyController = () =>
  import('#controllers/restaurants/set_restaurant_currency_controller')
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
const LoginController = () => import('#controllers/auth/login_controller')
const RegisterController = () => import('#controllers/auth/register_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')
const CreateRestaurantController = () =>
  import('#controllers/restaurants/create_restaurant_controller')
const CreateMenuController = () => import('#controllers/menus/create_menu_controller')
const UpdateMenuController = () => import('#controllers/menus/update_menu_controller')
const ShowMenuController = () => import('#controllers/menus/show_menu_controller')

// Landing page
router.on('/').renderInertia('landing').as('landing')

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
    router.get('/:id', [ActiveRestaurantController, 'handle']).as('active.handle')
    router.get('/:id/currency', [SetRestaurantCurrencyController, 'render']).as('currency.render')
    router.post('/', [CreateRestaurantController, 'handle']).as('create.handle')
    router.put('/:id', [UpdateRestaurantController, 'handle']).as('update.handle')
    router.patch('/:id/currency', [SetRestaurantCurrencyController, 'handle']).as('currency.handle')
    router.delete('/:id', [DeleteRestaurantController, 'handle']).as('delete.handle')
  })
  .use(middleware.auth())
  .prefix('/restaurants')
  .as('restaurants')

router
  .get('/restaurants/invites/:id/accept', [AcceptInvitationController, 'handle'])
  .as('restaurants.accept.invitation.handle')

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
  .get('/menus/:menuId/categories/:categoryId/article', [CreateArticleController, 'render'])
  .use([middleware.auth(), middleware.restaurant()])
  .as('articles.create.render')

router
  .get('/menus/:menuId/articles/:id', [EditArticleController, 'render'])
  .use([middleware.auth(), middleware.restaurant()])
  .as('articles.edit.render')

router
  .delete('/menus/:menuId/articles/:id', [DeleteArticleController, 'handle'])
  .use([middleware.auth(), middleware.restaurant()])
  .as('articles.delete.handle')

router
  .group(() => {
    router.post('/', [CreateArticleController, 'handle']).as('create.handle')
    router.put('/:id', [UpdateArticleController, 'handle']).as('update.handle')
    router
      .patch('/menus/:menuId/order', [UpdateArticleOrderController, 'handle'])
      .as('order.handle')
    router.delete('/:id/image', [DeleteArticleImageController, 'handle']).as('delete.image.handle')
  })
  .use([middleware.auth(), middleware.restaurant()])
  .prefix('/articles')
  .as('articles')

// Option Categories
router
  .post('/articles/:articleId/option-categories', [CreateOptionCategoryController, 'handle'])
  .use([middleware.auth(), middleware.restaurant()])
  .as('option-categories.create.handle')

// Settings (Profile)
router
  .group(() => {
    router.get('/', [UpdateProfileController, 'render']).as('update.render')
    router.put('/', [UpdateProfileController, 'handle']).as('update.handle')
  })
  .use([middleware.auth(), middleware.restaurant()])
  .prefix('/settings/profile')
  .as('settings.profile')

// Settings (Account)
router
  .group(() => {
    router.get('/', [ShowAccountSettingsController, 'render']).as('update.render')
    router.patch('/email', [UpdateEmailController, 'handle']).as('update.email.handle')
    router.delete('/', [DeleteAccountController, 'handle']).as('delete.handle')
  })
  .use([middleware.auth(), middleware.restaurant()])
  .prefix('/settings/account')
  .as('settings.account')

// Settings (Restaurant)
router
  .group(() => {
    router.get('/', [UpdateRestaurantController, 'render']).as('update.render')
    router.post('/invite', [InviteUserController, 'handle']).as('invite.user.handle')
    router
      .delete('/invites/:id', [CancelRestaurantInviteController, 'handle'])
      .as('cancel.invite.handle')
    router.delete('/user/:id', [RemoveRestaurantUserController, 'handle']).as('remove.user.handle')
  })
  .use([middleware.auth(), middleware.restaurant()])
  .prefix('/settings/restaurant')
  .as('settings.restaurant')
