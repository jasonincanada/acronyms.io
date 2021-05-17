import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiGetActiveGame, apiPostPhrase, apiStartNewGame } from './gameAPI'
import { createAcroThunk } from '../common'

const initialState = {
  id: null,
  acronym: null,
  started: null,
  finishing: null,
  myphrase: null
}


/* Thunks */

export const getActiveGame = createAcroThunk(
  'activegame/get',
  apiGetActiveGame
)

export const startNewGame = createAcroThunk(
  'activegame/start',
  apiStartNewGame
)

export const postPhrase = createAsyncThunk(
  'activegame/post-phrase',
  async (phrase, thunkAPI) => {
    try {
      const gameID = thunkAPI.getState().activegame.id
      const response = await apiPostPhrase(gameID, phrase)

      if (response.status === 200) {
        const result = response.data.result

        if (result === 'ok') {
          return {result, phrase}
        } else {
          return thunkAPI.rejectWithValue(result)
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

export const activeGameSlice = createSlice({
  name: 'activegame',
  initialState,
  reducers: {
  },
  extraReducers: {
    [getActiveGame.fulfilled]: (state, {payload}) => {
      state.id = payload.activegame.id
      state.acronym = payload.activegame.acronym
      state.started = payload.activegame.started
      state.finishing = payload.activegame.finishing
      state.myphrase = payload.myphrase
    },
    [getActiveGame.rejected]: (state, {payload}) => {
      return initialState
    },

    [startNewGame.fulfilled]: (state, {payload}) => {
      state.id = payload.activegame.id
      state.acronym = payload.activegame.acronym
      state.started = payload.activegame.started
      state.finishing = payload.activegame.finishing
      state.myphrase = payload.myphrase
    },

    [postPhrase.fulfilled]: (state, {payload}) => {
      state.myphrase = payload.phrase
      state.error = null
    },
    [postPhrase.rejected]: (state, {payload}) => {
      state.error = payload
    },
  },
})


/* Selectors */

export const activeGameSelector = (state) => state.activegame

