import axios from 'axios'
import root from 'window-or-global'

export default class API {
  static get client() {
    return axios.create({
      baseURL: process.env.REACT_APP_API,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${root.__TOKEN__}`,
      }
    })
  }

  static post(path, params) {
    return API.client.post(path, params)
  }

  static put(path, params) {
    return API.client.put(path, params)
  }

  static delete(path, params) {
    return API.client.delete(path, params)
  }

  static get(path) {
    return API.client.get(path)
  }
}
