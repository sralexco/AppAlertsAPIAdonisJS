import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Alert extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare id_user: number | null

  @column()
  declare title: string | null

  @column()
  declare description: string | null

  @column()
  declare date: string | null

  @column()
  declare id_alert_type: number | null

  @column()
  declare lat: string | null

  @column()
  declare lon: string | null

  @column()
  declare country: string | null

  @column()
  declare city: string | null

  @column()
  declare image: string | null


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}


/*

 idUser,
        title,
        description,
        date,
        idAlertType,
        lat,
        lon,
        country,
        city,
        image,

* */
