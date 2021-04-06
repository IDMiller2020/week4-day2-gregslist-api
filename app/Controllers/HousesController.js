import { ProxyState } from "../AppState.js";
import { housesService } from "../Services/HousesService.js"

//Private
function _draw() {
  let houses = ProxyState.houses
  let template = ''
  houses.forEach(house => {
    template += house.Template
  })
  document.getElementById('houses').innerHTML = template
}

//Public
export default class HousesController {
  constructor() {
    ProxyState.on('houses', _draw)
// Don't need initial draw on page load anymore.  Need to get houses from api instead.
//    _draw()

    this.getHouses()
  }
  async getHouses() {
    try {
      await housesService.getHouses()
    } catch (error) {
      console.error(error);
    }
  }
  async createHouse() {
    try {
      window.event.preventDefault()
      const form = window.event.target
      let newHouse = {
        //@ts-ignore
        bathrooms: form.bathrooms.value,
        //@ts-ignore
        bedrooms: form.bedrooms.value,
        //@ts-ignore
        imgUrl: form.imgUrl.value,
        //@ts-ignore
        levels: form.levels.value,
        //@ts-ignore
        year: form.year.value,
        //@ts-ignore
        description: form.description.value,
        //@ts-ignore
        price: Number(form.price.value),
      }
      await housesService.createHouse(newHouse)
      //@ts-ignore
      form.reset()
      $('#new-house-form').modal('hide')
    } catch (error) {
      console.error(error)
    }
  }
  deleteHouse(id) {
    try {
      housesService.deleteHouse(id)
    } catch (error) {
      console.error(error)
    }
  }
  bid(id) {
    housesService.bid(id)
  }
}