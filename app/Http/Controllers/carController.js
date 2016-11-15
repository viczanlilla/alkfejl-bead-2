'use strict'

const Database = use('Database')
const Category = use('App/Model/Category')
const Car = use('App/Model/Car')
const User = use('App/Model/User')
const Validator = use('Validator')

//$('input[type="checkbox"]').change(function(){
//    this.value = (Number(this.checked));
//});

class CarController {
  * createCar(request, response) {
    const categories = yield Category.all();

    yield response.sendView('createCar', {
      categories: categories.toJSON()
    });
  }

  * doCreateCar(request, response) {
    const carData = request.except('_csrf');
    console.log(carData)
    const rules = {
      brand: 'required',
      model: 'required',
      year: 'required',
      price: 'required',
      category_id: 'required',
      km: 'required',
      description: 'required',
    }
    const validation = yield Validator.validateAll(carData, rules);
    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({ errors: validation.messages() })
        .flash()

      response.redirect('back')
      return
    }



    carData.car_id = request.currentUser.id
    yield Car.create(carData);
    //document.getElementById('messageCheckbox').checked;
    /*const id = request.param('id')
    const car = yield Car.find(id)    

    car.automatictransmission = document.getElementById('automatictransmission').checked
    car.alu = document.getElementById('alu').checked
    car.climate = document.getElementById('climate').checked
    car.drawbar = document.getElementById('drawbar').checked
    car.tempomat = document.getElementById('tempomat').checked
    car.servicebook = document.getElementById('servicebook').checked

    yield car.save()*/
    

    response.redirect('/');
  }

  * show(request, response) {
    const id = request.param('id')
    const car = yield Car.find(id)
    if (!car) {
      response.notFound('Car does not exist')
      return
    }
    yield car.related('category').load()
    yield response.sendView('showCar', {
      car: car.toJSON()
    })
  }

  * edit(request, response) {
    const id = request.param('id')
    const car = yield Car.find(id)

    if (request.currentUser.id !== car.car_id) {
      response.unauthorized('Nincs jog')
      return
    }

    const categories = yield Category.all();

    console.log(car.toJSON())

    yield response.sendView('editCar', {
      categories: categories.toJSON(),
      car: car.toJSON(),
    });
  }

  * doEdit(request, response) {
    const carData = request.except('_csrf');
    const rules = {
      brand: 'required',
      model: 'required',
      year: 'required',
      price: 'required',
      category_id: 'required',
      km: 'required',
      description: 'required',
    }
    const validation = yield Validator.validateAll(carData, rules);
    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({ errors: validation.messages() })
        .flash()

      response.redirect('back')
      return
    }

    const id = request.param('id')
    const car = yield Car.find(id)

    if (request.currentUser.id !== car.car_id) {
      response.unauthorized('Nincs jog!')
      return
    }

    //document.getElementById('messageCheckbox').checked;

    /*$('input[type="checkbox"]').change(function(){
    this.value = (Number(this.checked));
});*/

    car.brand = carData.brand
    car.model = carData.model
    car.year = carData.year
    car.price = carData.price
    car.category_id = carData.category_id
    car.condition = carData.condition
    car.fuel = carData.fuel
    car.km = carData.km
    car.enginecapacity = carData.enginecapacity
    car.autotransmission = carData.autotransmission
    car.alu = carData.alu
    car.climate = carData.climate
    car.drawbar = carData.drawbar
    car.tempomat = carData.tempomat
    car.servicebook = carData.servicebook
    car.description = carData.description

    yield car.save()

    response.redirect('/');
  }

  * doDelete(request, response) {
    const id = request.param('id')
    const recipe = yield Recipe.find(id)
    if (!recipe) {
      response.notFound('Recipe does not exist')
      return
    }
    yield recipe.delete()
    response.redirect('/');
  }

  * search (request, response) {
    const page = Math.max(1, request.input('p'))
    const filters = {
      recipeName: request.input('recipeName') || '',
      category: request.input('category') || 0,
      createdBy: request.input('createdBy') || 0
    }

    const recipes = yield Recipe.query()
      .where(function () {
        if (filters.category > 0) this.where('category_id', filters.category)
        if (filters.createdBy > 0) this.where('user_id', filters.createdBy)
        if (filters.recipeName.length > 0) this.where('name', 'LIKE', `%${filters.recipeName}%`)
      })
      .with('user')
      .paginate(page, 9)

    const categories = yield Category.all()
    const users = yield User.all()

    yield response.sendView('recipeSearch', {
      recipes: recipes.toJSON(),
      categories: categories.toJSON(),
      users: users.toJSON(),
      filters
    })
  }

}

module.exports = CarController
