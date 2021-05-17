import { createAsyncThunk } from '@reduxjs/toolkit'


// our common thunk creator that calls a particular async API function to
// request something from the API. if the response contains a property .result
// that is 'ok', the thunk promise is considered fulfilled, otherwise rejected
//
export const createAcroThunk = (name, apiCall) => {
  return createAsyncThunk(
    name,
    async (arg, thunkAPI) => {
      try {
        const response = await apiCall(arg)

        if (response.status === 200) {

          // our django API code sets .result to 'ok' to signal success
          if (response.data.result === 'ok') {

            // attach the argument that was passed to this thunk
            response.data.arg = arg
            return response.data
          }

          // if unsuccessful the django API code will describe why in .error
          else {
            return thunkAPI.rejectWithValue(response.data.error)
          }
        }

        // API call status code was something other than 200
        else {
          return thunkAPI.rejectWithValue('API Request Error ' + response.status)
        }
      }

      // unhandled exception with the API call
      catch (e) {
        thunkAPI.rejectWithValue(e.response.data)
      }
    }
  )
}

