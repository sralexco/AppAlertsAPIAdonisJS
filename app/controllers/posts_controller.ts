import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {
  async index({}: HttpContext) {
    return { hello: 'ggg' }
    // we want to return a paginated list of posts
  }

  async store({}: HttpContext) {
    return { hello: 'post' }
  }

  async show({}: HttpContext) {
    return { hello: 'show' }
  }
}
