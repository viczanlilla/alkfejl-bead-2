'use strict'

const Schema = use('Schema')

class CarsSchema extends Schema {

  up () {
    this.create('cars', (table) => {
      table.increments()
      table.integer('car_id').notNullable()
      table.string('brand').notNullable()
      table.string('model').notNullable()
      table.integer('year').notNullable()
      table.integer('price').notNullable()
      table.string('category').notNullable()
      table.string('condition').notNullable()
      table.string('fuel').notNullable()
      table.integer('km').notNullable()
      table.integer('enginecapacity')
      table.bool('automatictransmission')
      table.bool('alu')
      table.bool('climate')
      table.bool('drawbar')
      table.bool('tempomat')
      table.bool('servicebook')
      table.string('description').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('cars')
  }

}

module.exports = CarsSchema
