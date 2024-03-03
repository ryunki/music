import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  path: []
}

export const drawingSlice = createSlice({
  name: 'pathDataProgress',
  initialState,
  reducers: {
    pathDataProgress: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which dete cts changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.path = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { pathDataProgress } = drawingSlice.actions

export default drawingSlice.reducer