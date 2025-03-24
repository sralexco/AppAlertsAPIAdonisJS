import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UserController {

  public async show({ params, response }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) {
      return response.ok({ status: false, idError: 1, message: "Error user not found" })
    }
    return response.json({ status: true, user: user})
  }

  public async update({ request, params, response }: HttpContext) {
    const { name, email, password, phone, country, image } = request.body()

    try {
      const user = await User.find(params.id)
      if (!user) {
        return response.ok({ status: false, idError: 1, message: "Error user not found" })
      }

      // Update the user
      user.merge({
        name,
        email,
        password,
        phone,
        country,
        image: image || '',
      })

      await user.save()

      return response.json({ status: true })
    } catch (error) {
      return response.ok({ status: false, idError: 1, message: "Error updating the user" })
    }
  }

}
