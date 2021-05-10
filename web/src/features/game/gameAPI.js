import axios from 'axios'
import qs from 'qs'

async function apiGetActiveGame(slug) {

  axios.defaults.withCredentials = true

  // TODO: hard-coded endpoint
  const url = '/api/activegame/' + slug + '/get'
  const response = await axios.get(url)

  return response
}

async function apiGetFinishedGames(slug) {

  axios.defaults.withCredentials = true

  // TODO: hard-coded endpoint
  const url = '/api/finishedgames/' + slug + '/get'
  const response = await axios.get(url)

  return response
}

async function apiGetPhrases(game_id) {

  axios.defaults.withCredentials = true

  // TODO: hard-coded endpoint
  const url = '/api/finalphrases/' + game_id + '/get'
  const response = await axios.get(url)

  return response
}

async function apiPostPhrase(gameID, phrase) {

  axios.defaults.withCredentials = true

  const csrf = localStorage.getItem('axios.csrf')
  const options = {
    headers: {
      'X-CSRFToken': csrf
    }
  }

  // TODO: hard-coded endpoint
  const url = '/api/activegame/' + gameID + '/phrase/post';
  const data = qs.stringify({gameID, phrase})
  const response = await axios.post(url, data, options)

  return response
}

export { apiGetActiveGame,
         apiGetFinishedGames,
         apiGetPhrases,
         apiPostPhrase
       }

