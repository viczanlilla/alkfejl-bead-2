'use strict'

const Schema = use('Schema')

class LikesSchema extends Schema {

  up () {
    this.create('likes', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('car_id').unsigned().references('id').inTable('cars')
      table.timestamps()
    })
  }

  down () {
    this.drop('likes')
  }

}

module.exports = LikesSchema
