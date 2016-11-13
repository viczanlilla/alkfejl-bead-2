'use strict'

const Lucid = use('Lucid')

class Car extends Lucid {
  category () {
    return this.belongsTo('App/Model/Category')
  }

  /*like () {
    return this.belongsTo('App/Model/Like')
  }*/
}

module.exports = Car
