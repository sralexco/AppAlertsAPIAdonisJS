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
import AlertController from '#controllers/alert_controller'
import AlertTypeController from '#controllers/alert_type_controller'
import UserController from '#controllers/user_controller'

router.group(() => {
  router.post('register', [AuthController, 'register'])
  router.post('login', [AuthController, 'login'])
  router.post('logout', [AuthController, 'logout']).use(middleware.auth())
  router.get('me', [AuthController, 'me']).use(middleware.auth())

  router.post('alert/myList', [AlertController, 'myList'])
  router.post('alert/list', [AlertController, 'list'])
  router.post('alert/create', [AlertController, 'store'])
  router.post('alert/:id/show', [AlertController, 'show'])
  router.post('alert/:id/update', [AlertController, 'update'])
  router.post('alert/:id/delete', [AlertController, 'delete'])

  router.post('alertType/create', [AlertTypeController, 'store'])
  router.post('alertType/list', [AlertTypeController, 'list'])

  router.post('user/:id', [UserController, 'show'])
  router.post('user/:id/update', [UserController, 'update'])


}).prefix('/api')

router.group(() => {

  //router.get('posts', [PostsController, 'index'])
  //router.get('posts/:id', [PostsController, 'show'])
}).prefix('/api').use(middleware.auth())
