import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiGetRoom } from './roomAPI'
import { getFinishedGames } from '../game/finishedGamesSlice'


const initialState = {
  slug: null,
  description: null,
  finishedgames: [],
}


/* Thunks */

export const getRoom = createAsyncThunk(
  'room/get',
  async (slug, thunkAPI) => {
    try {
      const response = await apiGetRoom(slug)

      if (response.status === 200) {
        if (response.data.result === 'ok') {
          return { slug: response.data.slug,
                   description: response.data.description,
                 }
        } else {
          return thunkAPI.rejectWithValue('no room')
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

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
  },
  extraReducers: {
    [getRoom.fulfilled]: (state, {payload}) => {
      state.slug = payload.slug
      state.description = payload.description
    },

    // whenever a request for a list of games is returned, extract the IDs
    // and store them as room.finishedgames
    [getFinishedGames.fulfilled]: (state, {payload}) => {
      state.finishedgames = payload.finishedgames.map(g => g.id)
    }
  },
})


/* Selectors */

export const roomSelector = (state) => state.room

