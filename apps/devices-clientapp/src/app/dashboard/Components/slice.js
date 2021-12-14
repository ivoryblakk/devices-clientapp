import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import axios from "axios";

const GET_DEVICES = 'http://localhost:3000/devices'
const name = 'devicesList'

export const fetchDevices = createAsyncThunk(`${name}/fetchDevices`, async () => {
    const { data } = await axios.get(GET_DEVICES)
    return await { data }
})

export const updateDevice = createAsyncThunk(`${name}/updateDevice`, async ({ id, system_name, type, hdd_capacity }) => {
    const { data } = await axios.put(`${GET_DEVICES}/${id}`, { system_name, type, hdd_capacity,})
    return  { data }
})

export const addDevice = createAsyncThunk(`${name}/addDevice`, async ({ system_name, type, hdd_capacity }) => {
   
    const headers = { 'Content-Type': 'application/json' }
    const { data } = await axios.post(GET_DEVICES, { system_name, type, hdd_capacity }, headers)
  
    return await { data }
})

export const deleteDevice = createAsyncThunk(`${name}/deleteDevice`, async ({ id }) => {
    const { data } = await axios.delete(`${GET_DEVICES}/${id}`)
    return await { data }
})

export const devicesListAdapter = createEntityAdapter();
export const devicesListSelector = devicesListAdapter.getSelectors(state => state.devicesList)


const initialState = devicesListAdapter.getInitialState({
    isFetching: false,
    devicesList: [],
    error: null,
    addedDeviceDetails: '',
    updatedDevice: '',
    deletedDevice: ''
}
)
export const devicesList = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDevices.pending, (state) => {
            state.isFetching = true
            state.error = null
        })
        builder.addCase(addDevice.pending, (state) => {
            state.error = null
        })
        builder.addCase(updateDevice.pending, (state) => {
            state.error = null
        })
        builder.addCase(deleteDevice.pending, (state) => {
            state.error = null
        })
        builder.addCase(fetchDevices.fulfilled, (state, action) => {
            state.isFetching = false
            devicesListAdapter.setAll(state, action.payload.data)
        })
        builder.addCase(addDevice.fulfilled, (state, action) => {
            state.addedDeviceDetails = action.payload.data
        })
        builder.addCase(updateDevice.fulfilled, (state, action) => {
            state.updatedDevice = action.payload.data
        })
        builder.addCase(deleteDevice.fulfilled, (state, action) => {
            state.deletedDevice = action.payload.data
        })
        builder.addCase(fetchDevices.rejected, (state, action) => {
            state.isFetching = false
            state.error = action.error
        })
        builder.addCase(addDevice.rejected, (state, action) => {
            state.isFetching = false
            state.error = action.error
        })
        builder.addCase(updateDevice.rejected, (state, action) => {
            state.error = action.error
        })
        builder.addCase(deleteDevice.rejected, (state, action) => {
            state.isFetching = false
            state.error = action.error
        })
    }
})

export const { reducer: devicesListReducer } = devicesList;