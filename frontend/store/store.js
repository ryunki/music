import { configureStore } from '@reduxjs/toolkit'
import drawingReducer from './features/drawing/drawingSlice'
import toggleDrawReducer from './features/drawing/toggleDrawSlice'
export const store = configureStore({
  reducer: {
    drawing: drawingReducer,
    toggleDraw: toggleDrawReducer,
  },
})