import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { apiGetFinishedGames, apiGetPhrases, apiGetVotes, apiVoteFor } from './gameAPI'
import { createAcroThunk } from '../../common'


/* Adapters */

const finishedGamesAdapter = createEntityAdapter({
  // https://stackoverflow.com/questions/492994/compare-two-dates-with-javascript#comment48569803_497790
  sortComparer: (b, a) => (a.finished > b.finished)
                        - (a.finished < b.finished)
})

const phrasesAdapter = createEntityAdapter({})


/* Thunks */


// if we already have the phrases for a given finished game, don't bother retrieving
// them again, since they don't change after a game has finished
//
// the second argument for this callback would be the getState() function, but we
// already have what we need in the game object, so we leave it out for this condition
//
const checkPhrases = (game) => {
  if (game.phrases) {
    return false
  }
}

export const getFinishedGames = createAcroThunk('finishedgames/get', apiGetFinishedGames)
export const getPhrases       = createAcroThunk('phrases/get', apiGetPhrases, checkPhrases)
export const voteFor          = createAcroThunk('phrases/vote', apiVoteFor)
export const getVotes         = createAcroThunk('phrases/get-votes', apiGetVotes)


/* Slices */

export const finishedGamesSlice = createSlice({
  name: 'finishedgames',
  initialState: finishedGamesAdapter.getInitialState(),
  reducers: {
  },
  extraReducers: {
    [getFinishedGames.fulfilled]: (state, {payload}) => {

      // the finished games arrive without their phrases, and we retrieve them when the
      // player clicks to view that particular game (minimized to start), rather than
      // getting them up front with this game list, which could be wasteful

      finishedGamesAdapter.upsertMany(state, payload.finishedgames)
    },

    [getPhrases.fulfilled]: (state, {payload}) => {
      const game = payload.arg
      const id   = game.id
      const ids  = payload.phrases.map(p => p.id)

      // updateOne is a helper method defined in EntityStateAdapter<T>
      // see: https://redux-toolkit.js.org/api/createEntityAdapter#return-value
      //
      // updateOne<S extends EntityState<T>>(state: S, update: Update<T>): S
      return finishedGamesAdapter.updateOne(state, {id, changes: { phrases: ids }})
    },
  },
})

export const phrasesSlice = createSlice({
  name: 'phrases',
  initialState: phrasesAdapter.getInitialState(),
  reducers: {
  },
  extraReducers: {
    [getPhrases.fulfilled]: (state, {payload}) => {

      // addMany<S extends EntityState<T>>(state: S, entities: T[]): S
      phrasesAdapter.addMany(state, payload.phrases)
    },

    [voteFor.fulfilled]: (state, {payload}) => {

        const phrase = payload.arg

        // remember the phrase that we voted for, we'll specifically set this phrase
        // as having been voted for by us, and the rest to not
        const voted_phrase_id = phrase.id

        // build the object containing update instructions for the phrases adapter
        const update = ({phrase_id, votes}) => {
          return {
            id: phrase_id,
            changes: {
              votes,
              playervoted: phrase_id === voted_phrase_id
            }
          }
        }

        // update the vote counts in the store
        payload.tally.forEach(p => phrasesAdapter.updateOne(state, update(p)))
    },

    // update the vote totals and whether the player voted for each phrase
    [getVotes.fulfilled]: (state, {payload}) => {

      const update = ({phrase_id, votes, playervoted}) => {
        return {
          id: phrase_id,
          changes: { votes, playervoted }
        }
      }

      payload.phrases.forEach(p => phrasesAdapter.updateOne(state, update(p)))
    },
  },
})


/* Selectors */

export const finishedGamesSelectors = finishedGamesAdapter
                                        .getSelectors(state => state.finishedgames)

export const phrasesSelectors = phrasesAdapter
                                        .getSelectors(state => state.phrases)

