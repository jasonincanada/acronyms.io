import axios from 'axios'

async function apiGetRoom(slug) {

  axios.defaults.withCredentials = true

  // TODO: hard-coded endpoint
  const url = '/api/room/' + slug + '/get'
  const response = await axios.get(url)

  return response
}

export { apiGetRoom }

