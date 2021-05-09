import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiGetActiveGame, apiPostPhrase } from './gameAPI'

const initialState = {
  id: null,
  acronym: null,
  finishing: null,
  myphrase: null
}

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

export const postPhrase = createAsyncThunk(
  'activegame/post-phrase',
  async (phrase, thunkAPI) => {
    try {
      const gameID = thunkAPI.getState().activegame.id
      const response = await apiPostPhrase(gameID, phrase)

      if (response.status === 200) {
        if (response.data.result === 'ok') {
          return {result: 'ok', phrase}
        } else {
          return thunkAPI.rejectWithValue(response.data.result)
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
    [postPhrase.fulfilled]: (state, {payload}) => {
      state.myphrase = payload.phrase
    }
  },
})

export const activeGameSelector = (state) => state.activegame

