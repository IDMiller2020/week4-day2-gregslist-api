import { ProxyState } from "../AppState.js";
import House from "../Models/House.js";
import { api } from "./AxiosService.js";

class HousesService {
  async getHouses() {
    let res = await api.get('houses')
    console.log(res.data)
    ProxyState.houses = res.data.map(h => new House(h))
  }
  createHouse(newHouse) {
    let house = new House(newHouse.bedrooms, newHouse.bathrooms, newHouse.sqFeet, newHouse.address, newHouse.price, newHouse.imgUrl)
    ProxyState.houses = [...ProxyState.houses, house]
  }
  bid(id) {
    let house = ProxyState.houses.find(house => house.id === id)
    house.price += 1000
    ProxyState.houses = ProxyState.houses
  }
  deleteHouse(id) {
    ProxyState.houses = ProxyState.houses.filter(house => house.id !== id)
  }
}
export const housesService = new HousesService()