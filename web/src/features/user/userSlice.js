// started from: https://cloudnweb.dev/2021/02/modern-react-redux-tutotials-redux-toolkit-login-user-registration/

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login } from './userAPI'

const initialState = {
  username: '',
  displayname: '',
  email: '',
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearState: function(state) {
      state.username = '';
      state.displayname = '';
      state.email = '';
    }
  },
  extraReducers: {
  },
})

export const userSelector = (state) => state.user
export const clearState = () => { return { type: 'users/clearState' } }

export const loginUser = createAsyncThunk(
  'users/login',
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await login(username, password);
      console.log('response', response);

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        return response.data
      } else {
        return thunkAPI.rejectWithValue('todo')
      }
    } catch (e) {
      console.log('Error', e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
)

