import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiGetActiveGame, apiPostPhrase, apiStartNewGame } from './gameAPI'

const initialState = {
  id: null,
  acronym: null,
  finishing: null,
  myphrase: null
}


/* Thunks */

export const getActiveGame = createAsyncThunk(
  'activegame/get',
  async (slug, thunkAPI) => {
    try {
      const response = await apiGetActiveGame(slug)

      if (response.status === 200) {
        if (response.data.result === 'ok') {
          return { id: response.data.id,
                   acronym: response.data.acronym,
                   finishing: response.data.finishing,
                   myphrase: response.data.myphrase,
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

export const startNewGame = createAsyncThunk(
  'activegame/start',
  async (slug, thunkAPI) => {
    try {
      const response = await apiStartNewGame(slug)

      if (response.status === 200) {
        if (response.data.result === 'ok') {
          return { id: response.data.game_id,
                   acronym: response.data.acronym,
                   finishing: response.data.finishing,
                   myphrase: null
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
      state.id = payload.id
      state.acronym = payload.acronym
      state.finishing = payload.finishing
      state.myphrase = payload.myphrase
    },
    [getActiveGame.rejected]: (state, {payload}) => {
      return initialState
    },

    [startNewGame.fulfilled]: (state, {payload}) => {
      state.id = payload.id
      state.acronym = payload.acronym
      state.finishing = payload.finishing
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

