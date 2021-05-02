import axios from 'axios'
import Cookies from 'universal-cookie'

// TODO: hard-coded endpoints
const url_login = 'http://192.168.0.16:8000/accounts/login/'
const url_csrf  = 'http://192.168.0.16:8000/acro/api/csrf/get'

async function login(username, password) {

  const data = {
    username,
    password,
  };

debugger

  // first fetch the csrf token
  const csrf = await axios.get(url_csrf, {});

  if (csrf.status !== 200) {
    throw new Error('error');
  }

  // i think that just set the cookie?

  console.log(csrf);

  // then log in 
  const cookies = new Cookies();
  const options = {
    headers: { 'X-CSRFToken': cookies.get('csrftoken') }
  };

  const response = await axios.post(url_login, data, options);

  return response;
}

export { login }

