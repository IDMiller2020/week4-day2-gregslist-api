import { ProxyState } from "../AppState.js";
import Car from "../Models/Car.js";


class CarsService {
  createCar(newCar) {
    debugger
    let car = new Car(newCar.make, newCar.model, newCar.year, newCar.price, newCar.description, newCar.imgUrl)
    ProxyState.cars = [...ProxyState.cars, car]
  }
  bid(id) {
    // find the Car
    let car = ProxyState.cars.find(car => car.id === id)
    // make the change
    car.price += 100

    // trigger the cycle (this can only be the top level properties of ProxyState) to update the page
    ProxyState.cars = ProxyState.cars
  }
  deleteCar(id) {
    // remove the car with that id from the array
    // trigger the update cycle by setting the value of ProxyState.cars

    // NOTE filter itterates over an array and only keeps things where the statement provided is true
    // here we remove the car with the id by only keeping cars that do not have that id
    // then we set the ProxyState array back to the result after the filter
    ProxyState.cars = ProxyState.cars.filter(car => car.id != id)
  }

}

export const carsService = new CarsService();

