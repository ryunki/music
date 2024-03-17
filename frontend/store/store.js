import { configureStore } from '@reduxjs/toolkit'
import drawingReducer from './features/drawing/drawingSlice'
import toggleDrawReducer from './features/drawing/toggleDrawSlice'
import soundReducer from './features/sound/soundSlice'
export const store = configureStore({
  reducer: {
    answerPath: drawingReducer,
    toggleDraw: toggleDrawReducer,
    toggleSoundAndMusic: soundReducer, 
  },
})