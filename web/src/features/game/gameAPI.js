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

async function apiStartNewGame(slug) {

  axios.defaults.withCredentials = true

  const cookies = new Cookies()
  const options = {
    headers: {
      'X-CSRFToken': cookies.get('csrftoken')
    }
  }

  // TODO: hard-coded endpoint
  const url = '/api/activegame/' + slug + '/start'
  const response = await axios.post(url, {}, options)

  return response
}

async function apiGetFinishedGames(slug) {

  axios.defaults.withCredentials = true

  // TODO: hard-coded endpoint
  const url = '/api/finishedgames/' + slug + '/get'
  const response = await axios.get(url)

  return response
}

async function apiGetPhrases(game) {

  axios.defaults.withCredentials = true

  // TODO: hard-coded endpoint
  const url = '/api/finalphrases/' + game.id + '/get'
  const response = await axios.get(url)

  return response
}

async function apiPostPhrase({game, phrase}) {

  axios.defaults.withCredentials = true

  const cookies = new Cookies()
  const options = {
    headers: {
      'X-CSRFToken': cookies.get('csrftoken')
    }
  }

  // TODO: hard-coded endpoint
  const url = '/api/activegame/' + game.id + '/phrase/post';
  const data = qs.stringify({gameID: game.id, phrase})
  const response = await axios.post(url, data, options)

  return response
}

async function apiVoteFor(phrase) {

  axios.defaults.withCredentials = true

  const cookies = new Cookies()
  const options = {
    headers: {
      'X-CSRFToken': cookies.get('csrftoken')
    }
  }

  // TODO: hard-coded endpoint
  const url = '/api/phrase/' + phrase.id + '/vote/';
  const response = await axios.post(url, {}, options)

  return response
}

async function apiGetVotes(game) {

  axios.defaults.withCredentials = true

  const cookies = new Cookies()
  const options = {
    headers: {
      'X-CSRFToken': cookies.get('csrftoken')
    }
  }

  // TODO: hard-coded endpoint
  const url = '/api/votes/' + game.id + '/get';
  const response = await axios.post(url, {}, options)

  return response
}

export { apiGetActiveGame,
         apiStartNewGame,
         apiGetFinishedGames,
         apiGetPhrases,
         apiGetVotes,
         apiPostPhrase,
         apiVoteFor,
       }

