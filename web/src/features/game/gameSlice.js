import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  acronym: null,
  finishing: null,
  myphrase: null
}

export const activeGameSlice = createSlice({
  name: 'activegame',
  initialState,
  reducers: {
  },
  extraReducers: {
    'room/init': (state, action) => {
      console.log('room/init caught by activeGameSlice: ', action)
    },
  },
})

export const activeGameSelector = (state) => state.activegame

