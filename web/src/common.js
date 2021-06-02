import { createAsyncThunk } from '@reduxjs/toolkit'


// our common thunk creator that calls a particular async API function to
// request something from the API. if the response contains a property .result
// that is 'ok', the thunk promise is considered fulfilled, otherwise rejected
//
export const createAcroThunk = (name, apiCall, condition) => {
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
    },

    // the third argument to createAsyncThunk lets us cancel a thunk before
    // creating the payload, which is what we want to do in certain normal
    // circumstances, eg. not retrieving the phrase list for a given finished
    // game more than once, since they are locked in at that point and we can
    // re-use our local copy
    //
    // https://redux-toolkit.js.org/api/createAsyncThunk#canceling-before-execution
    {
      condition: (arg, {getState}) => {

        // if we've supplied a third argument to createAcroThunk
        if (condition) {

          // pass the current state to our condition function so it can make
          // a decision on whether to cancel the request
          return condition(arg, getState)
        }
      }
    }
  )
}

