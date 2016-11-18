'use strict'

const Database = use('Database')
const Category = use('App/Model/Category')
const Car = use('App/Model/Car')
const Like = use('App/Model/Like')
const User = use('App/Model/User')
const Validator = use('Validator')

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

    response.redirect('/');
  }

  /* show(request, response) {
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
  }*/

  * show(request, response) {

    if(!request.currentUser){
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
    return
    }
     const page = Math.max(1, request.input('p'))
    const id = request.param('id')
    const car = yield Car.find(id)
    const user = request.currentUser.id
    var first_like = true
    const likeData = {                                                                                                                                                                                          
        user_id: user,                                                                                                                                                                                 
        car_id: id }
    if (!car) {
      response.notFound('Car does not exist')
      return
    }
    //todo: megszámolni a car_id értéke hányszor szerepel a tábla car_id oszlopában, átadni a viewnak
    const filters = {
      car_id: id,
      user_id: user,
	  }
    //kigyűjtöm hányszor like-olta a jelenlegi felhasználó, a jelenlegi autót:
    const isLiked = yield Like.query()
      .where(function () {
        if (id){
          this.where('car_id', '=', `${id}`)
        }
        if (user){
          this.where('user_id', '=', `${user}`)
        }
      })
      .with('user')
      

      //ha az isLiked-nak nincs eleme, akkor mentsük a like-ot, egyébként ne
      console.log("BBBBlengthBBBBB"+isLiked.length )
      if( isLiked.length > 0){
        //yield Like.create(likeData); //elmentve db-be a Like--> most ne mentsük el hisz ez csak egy show
        first_like = false; //ez a felhasznalo, ezt az autot mar like-olta
      }
      //console.log("BBBBBBBBBBBBBBBBB"+isLiked)

      //gyűjtsük ki hány Like-ot kapott a jelenlegi autó:
      const likes = yield Like.query()
      .where(function () {
         if (id)this.where('car_id', '=', `${id}`)
      })
      .with('user')
      .paginate(page, 30)


    yield car.related('category').load()
    yield response.sendView('showCar', {
      car: car.toJSON(),
      likes: likes.toJSON(),
      first_like
    })
    
    //response.redirect('/cars/'+`${id}`);
  }

  * like(request, response) {
    if(!request.currentUser){
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
    return
    }
     const page = Math.max(1, request.input('p'))
    const id = request.param('id')
    const car = yield Car.find(id)
    
    const user = request.currentUser.id
    
    var first_like = true
    const likeData = {                                                                                                                                                                                          
        user_id: user,                                                                                                                                                                                 
        car_id: id }
    if (!car) {
      response.notFound('Car does not exist')
      return
    }
    //todo: megszámolni a car_id értéke hányszor szerepel a tábla car_id oszlopában, átadni a viewnak
    const filters = {
      car_id: id,
      user_id: user,
	  }
    //kigyűjtöm hányszor like-olta a jelenlegi felhasználó, a jelenlegi autót:
    const isLiked = yield Like.query()
      .where(function () {
        if (id){
          this.where('car_id', '=', `${id}`)
        }
        if (user){
          this.where('user_id', '=', `${user}`)
        }
      })
      .with('user')
      

      //ha az isLiked-nak nincs eleme, akkor mentsük a like-ot, egyébként ne
      console.log("BBBBlengthBBBBB"+isLiked.length )
      if( isLiked.length < 1){
        yield Like.create(likeData); //elmentve db-be a Like
        first_like = false; //ez a felhasznalo, ezt az autot mar like-olta
      }
      //console.log("BBBBBBBBBBBBBBBBB"+isLiked)

      //gyűjtsük ki hány Like-ot kapott a jelenlegi autó:
      const likes = yield Like.query()
      .where(function () {
         if (id)this.where('car_id', '=', `${id}`)
      })
      .with('user')
      .paginate(page, 30)


    yield car.related('category').load()
    yield response.sendView('showCar', {
      car: car.toJSON(),
      likes: likes.toJSON(),
      first_like
    })
    //response.redirect('/cars/'+id)
    //response.redirect('/cars/'+`${id}`);
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

    car.brand = carData.brand 
    car.model = carData.model
    car.year = carData.year
    car.price = carData.price
    car.category_id = carData.category_id
    car.condition = carData.condition
    car.fuel = carData.fuel
    car.km = carData.km
    car.enginecapacity = carData.enginecapacity 
    car.automatictransmission = carData.automatictransmission instanceof Array ? carData.automatictransmission[0] : carData.automatictransmission
    car.alu = carData.alu instanceof Array ? carData.alu[0] : carData.alu
    car.climate = carData.climate instanceof Array ? carData.climate[0] : carData.climate
    car.drawbar = carData.drawbar instanceof Array ? carData.drawbar[0] : carData.drawbar
    car.tempomat = carData.tempomat instanceof Array ? carData.tempomat[0] : carData.tempomat
    car.servicebook = carData.servicebook instanceof Array ? carData.servicebook[0] : carData.servicebook
    car.description = carData.description

    yield car.save()

    response.redirect('/');
  }

  * doDelete(request, response) {
    const id = request.param('id')
    const car = yield Car.find(id)
    if (!car) {
      response.notFound('Car does not exist')
      return
    }
    yield car.delete()
    response.redirect('/');
  }

  * search (request, response) {
    //const carData = request.except('_csrf');
    const page = Math.max(1, request.input('p'))
    const filters = {
      carBrand: request.input('carBrand') || '',
      carModel: request.input('carModel') || '',
      carFuel: request.input('carFuel') || '',
      carCondition: request.input('carCondition') || '',
      carPrice1: request.input('carPrice1') || '',
      carPrice2: request.input('carPrice2') || '',
      carYear1: request.input('carYear1') || '',
      carYear2: request.input('carYear2') || '',
      carEnginecapacity1: request.input('carEnginecapacity1') || '',
      carEnginecapacity2: request.input('carEnginecapacity2') || '',
      carKm1: request.input('carKm1') || '',
      carKm2: request.input('carKm2') || '',
      category: request.input('category') || 0,
      createdBy: request.input('createdBy') || 0,
      carAutomatictransmission: request.input('carAutomatictransmission') || null,
      carAlu: request.input('carAlu') || null,
      carClimate: request.input('carClimate') || null,
      carDrawbar: request.input('carDrawbar') || null,
      carTempomat: request.input('carTempomat') || null,
      carServicebook: request.input('carServicebook') || null
    }

    const cars = yield Car.query()
      .where(function () {
        if (filters.category > 0) this.where('category_id', filters.category)
        if (filters.createdBy > 0) this.where('car_id', filters.createdBy)
        if (filters.carBrand.length > 0) this.where('brand', 'LIKE', `%${filters.carBrand}%`)
        if (filters.carModel.length > 0) this.where('model', 'LIKE', `%${filters.carModel}%`)
        if (filters.carFuel.length > 0) this.where('fuel', 'LIKE', `%${filters.carFuel}%`)
        if (filters.carCondition.length > 0) this.where('condition', 'LIKE', `%${filters.carCondition}%`)
        if (filters.carPrice1.length > 0)this.where('price', '>=', `${filters.carPrice1}`)
        if (filters.carPrice2.length > 0)this.where('price', '<=', `${filters.carPrice2}`)
        if (filters.carYear1.length > 0)this.where('year', '>=', `${filters.carYear1}`)
        if (filters.carYear2.length > 0)this.where('year', '<=', `${filters.carYear2}`)
        if (filters.carFuel.length > 0) this.where('fuel', 'LIKE', `%${filters.carFuel}%`)
        if (filters.carEnginecapacity1.length > 0)this.where('enginecapacity', '>=', `${filters.carEnginecapacity1}`)
        if (filters.carEnginecapacity2.length > 0)this.where('enginecapacity', '<=', `${filters.carEnginecapacity2}`)
        if (filters.carKm1.length > 0)this.where('km', '>=', `${filters.carKm1}`)
        if (filters.carKm2.length > 0)this.where('km', '<=', `${filters.carKm2}`)
        //console.log('SSSSSSSSSSSSS'+filters.carAutomatictransmission)
        if (filters.carAutomatictransmission)this.where('automatictransmission', '=', `1`)
        if (filters.carAlu)this.where('alu', '=', `1`)
        if (filters.carClimate)this.where('climate', '=', `1`)
        if (filters.carDrawbar)this.where('drawbar', '=', `1`)
        if (filters.carTempomat)this.where('tempomat', '=', `1`)
        if (filters.carServicebook)this.where('servicebook', '=', `1`)
        
      })
      .with('user')
      .paginate(page, 30)

    const categories = yield Category.all()
    const users = yield User.all()

    yield response.sendView('carSearch', {
      cars: cars.toJSON(),
      categories: categories.toJSON(),
      users: users.toJSON(),
      filters
    })
  }
  
  * mysearch (request, response) {
    const page = Math.max(1, request.input('p'))
    const filters = {
      createdBy: request.currentUser.id
    }

    const cars = yield Car.query()
      .where(function () {
        if (filters.createdBy > 0) this.where('car_id', filters.createdBy)        
      })
      .with('user')
      .paginate(page, 30)

    const categories = yield Category.all()
    const users = yield User.all()

    yield response.sendView('carMySearch', {
      cars: cars.toJSON(),
      categories: categories.toJSON(),
      users: users.toJSON(),
      filters
    })
  }

}

module.exports = CarController
