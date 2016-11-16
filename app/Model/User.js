'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

  recipes () {
    return this.hasMany('App/Model/Recipe')
  }
  cars () {
    return this.hasMany('App/Model/Car')
  }
}

module.exports = User
