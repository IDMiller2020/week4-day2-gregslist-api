import { ProxyState } from "../AppState.js";
import House from "../Models/House.js";
import { api } from "./AxiosService.js";

class HousesService {
  async getHouses() {
    let res = await api.get('houses')
    ProxyState.houses = res.data.map(h => new House(h))
  }
  async createHouse(newHouse) {
    let res = await api.post('houses', newHouse)
    res.data.id = res.data._id
    let house = new House(res.data)
    ProxyState.houses = [...ProxyState.houses, house]
  }
  async bid(id) {
    let house = ProxyState.houses.find(house => house.id === id)
    house.price += 1000
    await api.put('houses/' + id, { price: house.price })
    ProxyState.houses = ProxyState.houses
  }
  async deleteHouse(id) {
    await api.delete('houses/' + id)
    ProxyState.houses = ProxyState.houses.filter(house => house.id !== id)
  }
}
export const housesService = new HousesService()