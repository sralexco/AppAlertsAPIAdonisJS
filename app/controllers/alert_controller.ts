import Alert from '#models/alert'
import AlertType from '#models/alertType'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class AlertController {

  public async myList({ request, response }: HttpContext) {
    const idUser = request.input('id_user')
    const alerts = await Alert.query()
      .where('id_user', idUser)
      .select(['id', 'title', 'description','date','id_alert_type','lat','lon','country','city']) // Hide `image` field
      .exec()
    return response.json({ status: true, alerts: alerts })
  }

  public async list({ request, response }: HttpContext) {
    const { lat, lon, date } = request.all()

    // Convert date to JavaScript DateTime
    const selectedDate = DateTime.fromISO(date)
    const sevenDaysAgo = selectedDate.minus({ days: 7 }).toISODate()
    const newDate = selectedDate.set({ hour: 23, minute: 59, second: 59 }).toISO()

    // Fetch location data
    const apiUrl = "http://api.positionstack.com/v1/reverse?access_key=16b59abadade7750b8425b0bd5b894ee&query="+lat+","+lon
    const locationResponse = await fetch(apiUrl)
    const locationData = await locationResponse.json()

    const country = locationData?.data?.[0]?.country || null
    if (!country) {
      return response.ok({
        status: false,
        idError: 1,
        message: "Error when i tried to access the api"
      })
    }

    // Fetch alerts
    const alerts = await Alert.query()
      .whereBetween('date', [sevenDaysAgo, newDate])
      .where('country', country)
      .select(['id', 'title', 'description','date','id_alert_type','lat','lon','country','city']) // Hide `image` field
      .exec()

    return response.json({ status: true, alerts: alerts })
  }

  public async store({ request, response }: HttpContext) {
    const { id_user, title, description, date, id_alert_type, lat, lon, image } = request.body()

    try {
      // Fetch location data
      const apiUrl = "http://api.positionstack.com/v1/reverse?access_key=16b59abadade7750b8425b0bd5b894ee&query="+lat+","+lon
      console.log("apiUrl", apiUrl);
      const locationResponse = await fetch(apiUrl)
      const locationData = await locationResponse.json()

      // Extract country & city
      const country = locationData?.data?.[0]?.country ?? null
      const city = locationData?.data?.[0]?.region ?? null

      if (!country || !city) {
        return response.status(400).json({ status: 1, msg: 'Invalid location data' })
      }

      // Create alert entry
      await Alert.create({
        id_user,
        title,
        description,
        date,
        id_alert_type,
        lat,
        lon,
        country,
        city,
        image,
      })
      return response.json({ status: true })

    } catch (error) {
      return response.ok({
        status: false,
        idError: 1,
        message: "Error when i tried to created a new Alert"
      })
    }
  }

  public async update({ request, params, response }: HttpContext) {
    const { title, description, id_alert_type, lat, lon, image } = request.body()

    try {
      const apiUrl = "http://api.positionstack.com/v1/reverse?access_key=16b59abadade7750b8425b0bd5b894ee&query="+lat+","+lon
      const locationResponse = await fetch(apiUrl)
      const locationData = await locationResponse.json()
      const country = locationData?.data?.[0]?.country ?? null
      const city = locationData?.data?.[0]?.region ?? null

      const alert = await Alert.find(params.id)
      if (!alert) {
        return response.ok({ status: false, idError: 1, message: "Error alert not found" })
      }

      // Update the alert data
      alert.merge({
        title,
        description,
        id_alert_type,
        lat,
        lon,
        country,
        city,
        image: image || '',
      })

      await alert.save()

      return response.json({ status: true })
    } catch (error) {
      return response.ok({ status: false, idError: 1, message: "Error updating the alert" })
    }
  }

  public async show({ params, response }: HttpContext) {
    const alert = await Alert.find(params.id)
    if (!alert) {
      return response.ok({ status: false, idError: 1, message: "Error alert not found" })
    }
    const allAlertTypes = await AlertType.all()
    const alertType = allAlertTypes.find((item) => item.id === alert.id_alert_type)
    const type = alertType ? alertType.title : ''

    const user = await User.find(alert.id_user)
    const author = user ? user.name : 'Unknown'

    return response.json({ status: true, alert: { ...alert.toJSON(),
                                                 type: type,
                                                 author: author } })
  }

  public async delete({ params, response }: HttpContext) {
    const alert = await Alert.find(params.id)
    if (!alert) {
      return response.ok({ status: false, idError: 1, message: "Error when i tried to delete the Alert" })
    }
    await alert.delete()
    return response.json({ status: true })
  }


}
