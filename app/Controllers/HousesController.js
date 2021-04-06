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
  createHouse() {
    window.event.preventDefault()
    const form = window.event.target
    let newHouse = {
      //@ts-ignore
      bedrooms: form.bedrooms.value,
      //@ts-ignore
      bathrooms: form.bathrooms.value,
      //@ts-ignore
      sqFeet: form.sqFeet.value,
      //@ts-ignore
      address: form.address.value,
      //@ts-ignore
      price: Number(form.price.value),
      //@ts-ignore
      imgUrl: form.imgUrl.value
    }
    housesService.createHouse(newHouse)
    //@ts-ignore
    form.reset()
    $('#new-house-form').modal('hide')
  }
  deleteHouse(id) {
    housesService.deleteHouse(id)
  }
  bid(id) {
    housesService.bid(id)
  }
}