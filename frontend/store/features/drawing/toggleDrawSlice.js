import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  toggle: true
}

export const toggleDrawSlice = createSlice({
  name: 'toggleDraw',
  initialState,
  reducers: {
    toggleDraw: (state, action) => {
      state.toggle = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { toggleDraw } = toggleDrawSlice.actions

export default toggleDrawSlice.reducer