import { createSlice } from '@reduxjs/toolkit'
import { apiGetRoom } from './roomAPI'
import { getFinishedGames } from '../game/finishedGamesSlice'
import { createAcroThunk } from '../../common'


const initialState = {
  slug: null,
  description: null,
  finishedgames: [],
}


/* Thunks */

export const getRoom = createAcroThunk('room/get', apiGetRoom)


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

