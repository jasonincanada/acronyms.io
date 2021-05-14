// started from: https://cloudnweb.dev/2021/02/modern-react-redux-tutotials-redux-toolkit-login-user-registration/

import { createAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiLogin, apiSignUpUser } from './userAPI'
import Cookies from 'universal-cookie'


const initialState = {
  username: null,
  displayname: null,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
}


/* Actions */

export const logoutUser = createAction('user/logout')


/* Thunks */

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await apiLogin(username, password)

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

export const signUpUser = createAsyncThunk(
  'user/signup',
  async (arg, thunkAPI) => {
    try {
      const {username, display_name, email, password1, password2} = arg;
      const response = await apiSignUpUser(username, display_name, email, password1, password2)

      if (response.status === 200) {
        if (response.data.result === 'ok') {
          return { username, display_name }
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

    /* user login */
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

    'user/logout': (state) => {

      // forget the locally-stored user names and session info
      localStorage.removeItem('user.username')
      localStorage.removeItem('user.displayname')

      const cookies = new Cookies()
      cookies.remove('csrftoken')   // TODO csrftoken is being removed as expected
      cookies.remove('sessionid')   //      but sessionid persists somehow

      return initialState
    },

    /* user signup */
    [signUpUser.fulfilled]: (state, {payload}) => {
      state.username = payload.username
      state.displayname = payload.display_name
      state.isFetching = false
      state.isSuccess = true
      state.isError = false

      localStorage.setItem('user.username', payload.username)
      localStorage.setItem('user.displayname', payload.display_name)
    },
    [signUpUser.rejected]: (state, {payload}) => {
      state.isFetching = false
      state.isError = true
      state.errorMessage = 'todo'
    },
    [signUpUser.pending]: (state) => {
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

