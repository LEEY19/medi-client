import axios from 'axios'
import root from 'window-or-global'

export default class API {
  static client(auth) {
    return axios.create({
      baseURL: root.__baseURL__,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth}`,
      }
    })
  }

  static post(path, auth, params) {
    return API.client(auth).post(path, params)
  }

  static put(path, auth, params) {
    return API.client(auth).put(path, params)
  }

  static delete(path, auth, params) {
    return API.client(auth).delete(path, params)
  }

  static get(path, auth) {
    return API.client(auth).get(path)
  }
}
