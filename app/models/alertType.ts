import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class AlertType extends BaseModel {
  public static table = 'alerts_types';

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
