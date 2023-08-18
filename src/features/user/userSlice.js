import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAddress } from '../../services/apiGeocoding'

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

export const fetchAddress = createAsyncThunk(
  'user/fetchAddress',
  async function () {
    // get the user's geolocation position
    const positionObj = await getPosition()
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    }

    // 2) Then use a reverse geocoding API to get a description of the user's address, so that it can displayed in the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position)
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`

    // 3) Then return an object with the data
    // Payload of FULFILLED state
    return { position, address }
  }
)

const initialState = {
  username: '',
  status: 'idle',
  position: {},
  address: '',
  error: '',
}

const useSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position
        state.address = action.payload.address
        state.status = 'idle'
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.status = 'error'
        state.error =
          'There was a problem getting your location, try filling it on your own'
      }),
})

export default useSlice.reducer
export const { updateName } = useSlice.actions

export const getUser = (state) => state.user
export const getUserName = (state) => state.user.username
