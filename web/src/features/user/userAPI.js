import axios from 'axios'
import qs from 'qs'

// TODO: hard-coded endpoints
const url_login = '/api/login'
const url_signup = '/api/signup'
const url_csrf  = '/api/csrf/get'

async function apiLogin(username, password) {

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

async function apiSignUpUser(username, display_name, email, password1, password2) {

  axios.defaults.withCredentials = true

  // first fetch the csrf token
  const csrf = await axios.get(url_csrf)

  if (csrf.status !== 200) {
    throw new Error('error')
  }

  // that fetch will have set the cookie

  // sign up with the token
  const data = {
    username,
    display_name,
    email,
    password1,
    password2,
  }

  const options = {
    headers: {
      'X-CSRFToken': csrf.data.token
    }
  }

  const encoded = qs.stringify(data)
  const response = await axios.post(url_signup, encoded, options)

  return response
}

export { apiLogin, apiSignUpUser }

