// started from: https://cloudnweb.dev/2021/02/modern-react-redux-tutotials-redux-toolkit-login-user-registration/

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login } from './userAPI'


const initialState = {
  username: null,
  displayname: null,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
}


/* Thunks */

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await login(username, password)

      if (response.status === 200) {
        if (response.data.result === 'ok') {
          return { username,
                   displayname: response.data.displayname }
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


/* Slices */

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, {payload}) => {
      state.username = payload.username
      state.displayname = payload.displayname
      state.isFetching = false
      state.isSuccess = true
      state.isError = false

      localStorage.setItem('user.username', payload.username)
      localStorage.setItem('user.displayname', payload.displayname)
    },
    [loginUser.rejected]: (state, {payload}) => {
      state.isFetching = false
      state.isError = true
      state.errorMessage = payload
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true
      state.isError = false
    },

    'app/init': (state) => {
      const username = localStorage.getItem('user.username')
      const displayname = localStorage.getItem('user.displayname')

      if (username) {
        state.username = username
        state.displayname = displayname
      }
    }
  },
})


/* Selectors */

export const userSelector = (state) => state.user

