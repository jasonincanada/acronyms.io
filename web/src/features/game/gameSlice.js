import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiGetActiveGame } from './gameAPI'

const initialState = {
  acronym: null,
  finishing: null,
  myphrase: null
}

export const getActiveGame = createAsyncThunk(
  'activegame/get',
  async ({ slug }, thunkAPI) => {
    try {
      const response = await apiGetActiveGame(slug)

      if (response.status === 200) {
        if (response.data.result === 'ok') {
          return { acronym: response.data.acronym,
                   finishing: response.data.finishing,
                 //myphrase: response.data.myphrase,
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

export const activeGameSlice = createSlice({
  name: 'activegame',
  initialState,
  reducers: {
  },
  extraReducers: {
    [getActiveGame.fulfilled]: (state, {payload}) => {
      state.acronym = payload.acronym;
      state.finishing = payload.finishing;
    //state.myphrase = payload.myphrase;
    },
  },
})

export const activeGameSelector = (state) => state.activegame

