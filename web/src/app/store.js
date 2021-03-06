import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from '../features/user/userSlice'
import { activeGameSlice } from '../features/game/gameSlice'
import { finishedGamesSlice, phrasesSlice } from '../features/game/finishedGamesSlice'
import { roomSlice } from '../features/room/roomSlice'

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    activegame: activeGameSlice.reducer,
    finishedgames: finishedGamesSlice.reducer,
    phrases: phrasesSlice.reducer,
    room: roomSlice.reducer
  },
})
