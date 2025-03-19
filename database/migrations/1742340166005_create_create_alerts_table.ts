import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'alerts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.bigInteger('id_user').notNullable()
      table.string('title').notNullable()
      table.string('description').notNullable()
      table.timestamp('date').notNullable()
      table.integer('id_alert_type').notNullable()
      table.string('lat').notNullable()
      table.string('lon').notNullable()
      table.string('country').notNullable()
      table.string('city').notNullable()
      table.text('image', 'longtext')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
