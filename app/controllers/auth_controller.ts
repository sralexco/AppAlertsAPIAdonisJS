
import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    //const data = await request.validateUsing(registerValidator)
    const data = request.only(['email', 'password', 'name', 'phone', 'country'])

    const user = await User.create(data).catch(() => null)
    if (!user) {
      return response.ok({
        status: false,
        idError: 1,
        message: "Error when tried to created Database"
      })
    }
    return response.ok({
      status: true,
      ...user.serialize(),
    })
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    //const user = await User.verifyCredentials(email, password)
    const user = await User.verifyCredentials(email, password).catch(() => null)
    if (!user) {
      return response.ok({
        status: false,
        idError: 1,
        message: "Error in credentials"
      })
    }

    const token = await User.accessTokens.create(user)

    return response.ok({
      status: true,
      token: token,
      ...user.serialize(),
    })
  }

  async logout({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const token = auth.user?.currentAccessToken.identifier
    if (!token) {
      return response.badRequest({ message: 'Token not found' })
    }
    await User.accessTokens.delete(user, token)
    return response.ok({ message: 'Logged out' })
  }

  async me({ auth, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      return response.ok(user)
    } catch (error) {
      return response.unauthorized({ error: 'User not found' })
    }
  }
}
