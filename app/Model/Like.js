'use strict'

const Lucid = use('Lucid')

class Like extends Lucid {
  car () {
    return this.belongsTo('App/Model/Car')
  }

  user () {
    return this.belongsTo('App/Model/User')
  }
}

module.exports = Like