'use strict'

const Database = use('Database')
const Category = use('App/Model/Category')
const User = use('App/Model/User')
const Validator = use('Validator')

class IndexController {
  * index(request, response) {
    yield response.sendView('index') 
  }
}

module.exports = IndexController
