import { createSlice } from '@reduxjs/toolkit'

export const stockSlice = createSlice({
  name: 'quotes',
  initialState: {
    stocks: null,
  },
  reducers: {
    updatePrices: (state, action) => {
        localStorage.setItem('stocks', JSON.stringify({ ...action?.payload}));
        state.stocks = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { updatePrices } = stockSlice.actions

export default stockSlice.reducer
