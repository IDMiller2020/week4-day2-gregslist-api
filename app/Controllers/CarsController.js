import { ProxyState } from "../AppState.js";
import { carsService } from "../Services/CarsService.js";


//Private
function _draw() {
  // What are we drawing
  let cars = ProxyState.cars
  let template = ''
  // if a collection itterate over collection to generate template for each object
  cars.forEach(car => {
    template += car.Template
  })
  // render to page
  document.getElementById('cars').innerHTML = template
}

//Public
export default class CarsController {
  constructor() {
    // OH oh more magic. you still know.....
    // 1st argument is name of the property in the AppState to 'watch' for changes
    // 2nd argument: name of the function to run when 1st argument property changes
    ProxyState.on('cars', _draw);

    // Since we are now going to get our cars from the bcw-sandbox api, we don't need a manual draw on page load.  We need to get cars from the api instead. _draw() is replaced with async getCars().
    // manually run draw the on page load
    //_draw()

    this.getCars()
  }
    
    // NOTE async needs to be setup in CarsService - this should be setup and tested before setting up CarsController.js

    async getCars() {
      try {
        await carsService.getCars()
      } catch (error) {
        console.error(error)
      }
    }
  

  async createCar() {
    try {
    // if this method is triggered by an event (submit event) prevent the default action of reloding the page
    window.event.preventDefault()
    // grab the element from html that triggered this event
    const form = window.event.target
    let newCar = {
      // @ts-ignore
      make: form.make.value,
      // @ts-ignore
      model: form.model.value,
      // @ts-ignore
      year: form.year.value,
      // @ts-ignore  this converts the string to a number
      price: Number(form.price.value),
      // @ts-ignore
      description: form.description.value,
      // @ts-ignore
      imgUrl: form.imgUrl.value
    }
    await carsService.createCar(newCar)

    // @ts-ignore
    form.reset()

    // get the modal and close (using jQuery's "$" selector) 
    $('#new-car-form').modal('hide')
  } catch (error) {
    console.error(error)
  }
  }

  deleteCar(id) {
    try{
      carsService.deleteCar(id)

    } catch (error){
      console.error(error)
    }
  }

  bid(id) {
    carsService.bid(id)
  }

}
