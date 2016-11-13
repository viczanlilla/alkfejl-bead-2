'use strict'

const User = use('App/Model/User')
const Validator = use('Validator')
const Hash = use('Hash')

class UserController {

  * register (request, response) {
    yield response.sendView('register')
  }

  * login (request, response) {
    yield response.sendView('login')
  }

  * doRegister(request, response) {
    const registerData = request.except('_csrf');
    const rules = {
      username: 'required|alpha_numeric|unique:users',
      email: 'required|email|unique:users',
      password: 'required|min:4',
      password_confirm: 'required|same:password',
    }
    const validation = yield Validator.validateAll(registerData, rules);
    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({ errors: validation.messages() })
        .flash()

      response.redirect('back')
      return
    }

    const user = new User();

    user.firstname = registerData.firstname
    user.lastname = registerData.lastname
    user.username = registerData.username
    user.email = registerData.email
    user.password = yield Hash.make(registerData.password)

    yield user.save()

    yield request.auth.login(user)

    response.redirect('/');
  }

  * doLogin (request, response) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const login = yield request.auth.attempt(email, password) 

      if (login) {
        response.redirect('/')
        return
      }
    }
    catch (err) {
      yield request
        .withAll()
        .andWith({ errors: [err] })
        .flash()

      response.redirect('back')
      return
    }
  }

  * doLogout (request, response) {
    yield request.auth.logout()
    response.redirect('/')
  }

  * editUser(request, response) {
    //const id = request.param('id')
    const user = request.currentUser

    /*if (request.currentUser.id !== user.user_id) {
      response.unauthorized('Nincs jog')
      return
    }*/

    //const categories = yield Category.all();

    console.log(user.toJSON())

    yield response.sendView('editUser', {
      //categories: categories.toJSON(),
      user: user.toJSON(),
    });
  }

  * doEdit(request, response) {
    const userData = request.except('_csrf');
    const rules = {
      username: 'required|alpha_numeric|unique:users',
      email: 'required|email|unique:users',
      password: 'required|min:4',
      password_confirm: 'required|same:password',
    }
    const validation = yield Validator.validateAll(userData, rules);
    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({ errors: validation.messages() })
        .flash()

      response.redirect('back')
      return
    }

    //const id = request.param('id')
    const user = request.currentUser

    /*if (request.currentUser.id !== recipe.user_id) {
      response.unauthorized()
      return
    }*/

    
    user.firstname = userData.firstname
    user.lastname = userData.lastname
    user.username = userData.username
    user.email = userData.email
    user.password = userData.password

    yield user.save()

    response.redirect('/');
  }

}

module.exports = UserController
