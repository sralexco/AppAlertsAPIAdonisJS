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

import AuthController from '#controllers/auth_controller'
import PostsController from '#controllers/posts_controller'

router.group(() => {
  router.post('register', [AuthController, 'register'])
  router.post('login', [AuthController, 'login'])
  router.post('logout', [AuthController, 'logout']).use(middleware.auth())
  router.get('me', [AuthController, 'me']).use(middleware.auth())
}).prefix('/api')

router.group(() => {
  router.get('posts', [PostsController, 'index'])
  router.post('posts', [PostsController, 'store'])
  router.get('posts/:id', [PostsController, 'show'])
}).prefix('/api').use(middleware.auth())
