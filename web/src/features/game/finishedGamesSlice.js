import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { apiGetFinishedGames } from './gameAPI'

const finishedGamesAdapter = createEntityAdapter({
  // https://stackoverflow.com/questions/492994/compare-two-dates-with-javascript#comment48569803_497790
  sortComparer: (b, a) => (a.finished > b.finished)
                        - (a.finished < b.finished)
})

const phrasesAdapter = createEntityAdapter({})


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
    }
  },
})

export const phrasesGamesSlice = createSlice({
  name: 'phrases',
  initialState: phrasesAdapter.getInitialState(),
  reducers: {
  },
  extraReducers: { },
})

export const finishedGamesSelectors = finishedGamesAdapter
                                        .getSelectors(state => state.finishedgames)

export const phrasesSelectors = phrasesAdapter
                                        .getSelectors(state => state.phrases)
