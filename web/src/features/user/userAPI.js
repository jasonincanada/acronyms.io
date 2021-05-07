import axios from 'axios'
import qs from 'qs'

// TODO: hard-coded endpoints
const url_login = '/api/login'
const url_csrf  = '/api/csrf/get'

async function login(username, password) {

  axios.defaults.withCredentials = true

  // first fetch the csrf token
  const csrf = await axios.get(url_csrf)

  if (csrf.status !== 200) {
    throw new Error('error')
  }

  // that fetch will have set the cookie

  // log in with the token
  const data = {
    username,
    password,
  }

  const options = {
    headers: {
      'X-CSRFToken': csrf.data.token
    }
  }

  const encoded = qs.stringify(data)
  const response = await axios.post(url_login, encoded, options)

  return response
}

export { login }

