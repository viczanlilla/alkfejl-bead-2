'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

  cars () {
    return this.hasMany('App/Model/Car')
  }

  likes () {
    return this.hasMany('App/Model/Like')
  }

}

module.exports = User
