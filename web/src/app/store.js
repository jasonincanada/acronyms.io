import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import { userSlice } from '../features/user/userSlice'
import { activeGameSlice } from '../features/game/gameSlice'
import { roomSlice } from '../features/room/roomSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userSlice.reducer,
    activegame: activeGameSlice.reducer,
    room: roomSlice.reducer
  },
})
