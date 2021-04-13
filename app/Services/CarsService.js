import { ProxyState } from "../AppState.js";
import Car from "../Models/Car.js";
import { api } from "./AxiosService.js";


class CarsService {
  // Convert to async getCars()
  // createCar(newCar) {
  //   debugger
  //   let car = new Car(newCar.make, newCar.model, newCar.year, newCar.price, newCar.description, newCar.imgUrl)
  //   ProxyState.cars = [...ProxyState.cars, car]

  async getCars() {
    let res = await api.get('cars')
    // NOTE Good idea to always test what you are getting from the api using console.log
    ProxyState.cars = res.data.map(c => new Car(c))
  }
  async createCar(newCar) {
    let res = await api.post('cars', newCar)
    res.data.id = res.data._id
    let car = new Car(res.data)
    ProxyState.cars = [...ProxyState.cars, car]
  }
  async bid(id) {
    //step 1: find the car
    let car = ProxyState.cars.find(car => car.id === id)
    //step 2: modify it
    car.price += 100
    //step 3: send update to server
    await api.put('cars/' + id, { price: car.price })
    //step 4: trigger the proxystate that a change was made
    ProxyState.cars = ProxyState.cars
  }
  async deleteCar(id) {
    // restful convention for a delete route is '/collectionName/:id' (the ':' indicates a variable value, does not need to be added)
    await api.delete('cars/' + id)
    ProxyState.cars = ProxyState.cars.filter(car => car.id != id)
  }
  //}
  // bid(id) {
  //   // find the Car
  //   let car = ProxyState.cars.find(car => car.id === id)
  //   // make the change
  //   car.price += 100

  //   // trigger the cycle (this can only be the top level properties of ProxyState) to update the page
  //   ProxyState.cars = ProxyState.cars
  // }
  // deleteCar(id) {
  //   // remove the car with that id from the array
  //   // trigger the update cycle by setting the value of ProxyState.cars

  //   // NOTE filter itterates over an array and only keeps things where the statement provided is true
  //   // here we remove the car with the id by only keeping cars that do not have that id
  //   // then we set the ProxyState array back to the result after the filter
  //   ProxyState.cars = ProxyState.cars.filter(car => car.id != id)
  // }

}

export const carsService = new CarsService();

