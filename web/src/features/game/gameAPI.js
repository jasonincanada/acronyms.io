import axios from 'axios'

async function apiGetActiveGame(slug) {

  axios.defaults.withCredentials = true

  // TODO: hard-coded endpoint
  const url = '/api/activegame/' + slug + '/get'
  const response = await axios.get(url)

  return response
}

export { apiGetActiveGame }

