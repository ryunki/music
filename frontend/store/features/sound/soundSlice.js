import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  music: true,
  sound: true
}

export const soundSlice = createSlice({
  name: 'toggleSound',
  initialState,
  reducers: {
    toggleMusic: (state, action) => {
      state.music = action.payload
    },
    toggleSound: (state, action) => {
      state.sound = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { toggleMusic, toggleSound } = soundSlice.actions

export default soundSlice.reducer