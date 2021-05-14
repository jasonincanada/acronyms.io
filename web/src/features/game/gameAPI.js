import axios from 'axios'
import Cookies from 'universal-cookie'
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

  const cookies = new Cookies()
  const options = {
    headers: {
      'X-CSRFToken': cookies.get('csrftoken')
    }
  }

  // TODO: hard-coded endpoint
  const url = '/api/activegame/' + gameID + '/phrase/post';
  const data = qs.stringify({gameID, phrase})
  const response = await axios.post(url, data, options)

  return response
}

async function apiVoteFor(phrase_id) {

  axios.defaults.withCredentials = true

  const cookies = new Cookies()
  const options = {
    headers: {
      'X-CSRFToken': cookies.get('csrftoken')
    }
  }

  // TODO: hard-coded endpoint
  const url = '/api/phrase/' + phrase_id + '/vote/';
  const response = await axios.post(url, {}, options)

  return response
}

async function apiGetVotes(game_id) {

  axios.defaults.withCredentials = true

  const cookies = new Cookies()
  const options = {
    headers: {
      'X-CSRFToken': cookies.get('csrftoken')
    }
  }

  // TODO: hard-coded endpoint
  const url = '/api/votes/' + game_id + '/get';
  const response = await axios.post(url, {}, options)

  return response
}

export { apiGetActiveGame,
         apiGetFinishedGames,
         apiGetPhrases,
         apiGetVotes,
         apiPostPhrase,
         apiVoteFor,
       }

