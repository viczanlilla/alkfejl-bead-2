'use strict'

const Lucid = use('Lucid')

class Category extends Lucid {
  recipes () {
    return this.hasMany('App/Model/Recipe')
  }
  cars () {
    return this.hasMany('App/Model/Car')
  }
}

module.exports = Category
