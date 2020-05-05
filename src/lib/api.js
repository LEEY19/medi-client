import axios from 'axios';
import axiosCookieJarSupport from 'axios-cookiejar-support';
import tough from 'tough-cookie';
import root from 'window-or-global';

axiosCookieJarSupport(axios);
const cookieJar = new tough.CookieJar();

export default class API {
  static client(auth) {
    return axios.create({
      baseURL: root.__baseURL__,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth}`,
      },
      withCredentials: true,
      jar: cookieJar,
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
