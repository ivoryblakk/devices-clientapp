import { configureStore } from '@reduxjs/toolkit'
import { devicesListReducer } from '../app/dashboard/Components/slice' 

export const store = configureStore({
  reducer: {
    devicesList: devicesListReducer
  },
})