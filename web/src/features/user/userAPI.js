import axios from 'axios'

// TODO: hard-coded endpoints
const url_login = 'http://192.168.0.16:8000/accounts/login/'
const url_csrf  = 'http://192.168.0.16:8000/acro/api/csrf/get'

async function login(username, password) {

  axios.defaults.withCredentials = true;

  // first fetch the csrf token
  const csrf = await axios.get(url_csrf);

  if (csrf.status !== 200) {
    throw new Error('error');
  }

  // that fetch will have set the cookie

  // log in with the token
  const data = {
    username,
    password,
  };

  const options = {
    headers: {
      'X-CSRFToken': csrf.data.token
    }
  };

  const response = await axios.post(url_login, data, options);

  return response;
}

export { login }

