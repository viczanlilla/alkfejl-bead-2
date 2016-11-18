'use strict'

const Lucid = use('Lucid')

class Category extends Lucid {
  cars () {
    return this.hasMany('App/Model/Car')
  }
}

module.exports = Category
