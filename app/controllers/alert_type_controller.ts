import AlertType from '#models/alertType'
import type { HttpContext } from '@adonisjs/core/http'

export default class AlertTypeController {

  public async list({ request, response }: HttpContext) {
    const alertTypes = await AlertType.query();
    return response.json({ status: true, types: alertTypes });
  }

  public async store({ request, response }: HttpContext) {
    const { title } = request.body()

    try {
      // Create alert entry
      await AlertType.create({
        title
      })
      return response.json({ status: true })

    } catch (error) {
      return response.ok({
        status: false,
        idError: 1,
        message: "Error when i tried to created a new Alert Type"
      })
    }
  }

}
