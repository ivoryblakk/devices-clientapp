import { configureStore } from '@reduxjs/toolkit'
import { devicesListReducer } from './Components/slice' 

export const store = configureStore({
  reducer: {
    devicesList: devicesListReducer
  },
})