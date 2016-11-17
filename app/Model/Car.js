'use strict'

const Lucid = use('Lucid')

class Car extends Lucid {
  category () {
    return this.belongsTo('App/Model/Category')
  }

  user () {
    return this.belongsTo('App/Model/User')
  }

  users () {
    return this.hasMany('App/Model/User')
  }

  likes () {
    return this.hasMany('App/Model/Like')
  }
}

module.exports = Car
