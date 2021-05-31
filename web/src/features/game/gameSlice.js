import { createSlice } from '@reduxjs/toolkit'
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

export const getActiveGame = createAcroThunk('activegame/get', apiGetActiveGame)
export const startNewGame  = createAcroThunk('activegame/start', apiStartNewGame)
export const postPhrase    = createAcroThunk('activegame/post-phrase', apiPostPhrase)


/* Slices */

export const activeGameSlice = createSlice({
  name: 'activegame',
  initialState,
  reducers: {
    finishGame: () => { return initialState },
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
      state.myphrase = payload.arg.phrase
      state.error = null
    },
    [postPhrase.rejected]: (state, {payload}) => {
      state.error = payload
    },
  },
})

export const { finishGame } = activeGameSlice.actions


/* Selectors */

export const activeGameSelector = (state) => state.activegame

