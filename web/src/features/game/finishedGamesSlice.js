import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { apiGetFinishedGames, apiGetPhrases, apiVoteFor } from './gameAPI'


/* Adapters */

const finishedGamesAdapter = createEntityAdapter({
  // https://stackoverflow.com/questions/492994/compare-two-dates-with-javascript#comment48569803_497790
  sortComparer: (b, a) => (a.finished > b.finished)
                        - (a.finished < b.finished)
})

const phrasesAdapter = createEntityAdapter({})


/* Thunks */

// get finished games for a particular room
//
export const getFinishedGames = createAsyncThunk(
  'finishedgames/get',
  async (slug, thunkAPI) => {
    try {
      const response = await apiGetFinishedGames(slug)

      if (response.status === 200) {
        if (response.data.result === 'ok') {
          return response.data.finishedgames
        } else {
          return thunkAPI.rejectWithValue(response.data.errorMessage)
        }

      } else {
        return thunkAPI.rejectWithValue('todo')
      }
    } catch (e) {
      console.log('Error', e.response.data)
      thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

// get phrases and current vote counts for a particular finishedgame
//
export const getPhrases = createAsyncThunk(
  'phrases/get',
  async (game, thunkAPI) => {
    try {
      const response = await apiGetPhrases(game.id)

      if (response.status === 200) {
        if (response.data.result === 'ok') {
          return { phrases: response.data.phrases,
                   game:    game,
                 }
        } else {
          return thunkAPI.rejectWithValue(response.data.errorMessage)
        }

      } else {
        return thunkAPI.rejectWithValue('todo')
      }
    } catch (e) {
      console.log('Error', e.response.data)
      thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const voteFor = createAsyncThunk(
  'phrases/vote',
  async (phrase, thunkAPI) => {
    try {
      const response = await apiVoteFor(phrase.id)

      if (response.status === 200) {
        if (response.data.result === 'ok') {
          return { tally: response.data.tally }
        } else {
          return thunkAPI.rejectWithValue('todo')
        }

      } else {
        return thunkAPI.rejectWithValue('todo')
      }
    } catch (e) {
      console.log('Error', e.response.data)
      thunkAPI.rejectWithValue(e.response.data)
    }
  }
)


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
      //
      // this line adds a temporarily empty phrase list to each game. it will be populated
      // once when the user clicks on that game. after that, future API hits for that game
      // will only retrieve updated vote counts (since that's the only thing about a
      // finished game that changes over time)
      //
      payload.forEach(game => game.phrases = [])

      finishedGamesAdapter.addMany(state, payload)
    },

    [getPhrases.fulfilled]: (state, {payload}) => {
      const id  = payload.game.id
      const ids = payload.phrases.map(p => p.id)

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
      phrasesAdapter.upsertMany(state, payload.phrases)
    },

    [voteFor.fulfilled]: (state, {payload}) => {

        const update = ({phrase_id, votes}) => {
          return {
            id: phrase_id,
            changes: { votes }
          }
        }

        payload.tally.forEach(p => phrasesAdapter.updateOne(state, update(p)))
    },
  },
})


/* Selectors */

export const finishedGamesSelectors = finishedGamesAdapter
                                        .getSelectors(state => state.finishedgames)

export const phrasesSelectors = phrasesAdapter
                                        .getSelectors(state => state.phrases)

