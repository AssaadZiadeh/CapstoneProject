import { createSlice } from '@reduxjs/toolkit'

export const saleSlice = createSlice({
  name: 'sale',
  initialState: {
    tradeData: null,
    quantity: 0,
  },
  reducers: {
    setTrade: (state, action) => {
      console.log("Hello from trade!");
        state.tradeData = action?.payload
    },
    setQuantity: (state, action) => {
        state.quantity = action?.payload
    },
    emptyTrade: (state) => {
        state.tradeData = null;
        state.quantity = 0;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setTrade, setQuantity, emptyTrade } = saleSlice.actions

export default saleSlice.reducer