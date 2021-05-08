import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiGetRoom } from './roomAPI'

const initialState = {
  slug: null,
  description: null
}

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
  },
})

export const roomSelector = (state) => state.room

