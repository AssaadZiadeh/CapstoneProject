import { createSlice } from '@reduxjs/toolkit'

export const basketSlice = createSlice({
  name: 'purchase',
  initialState: {
    basket: null,
  },
  reducers: {
    fillBasket: (state, action) => {
      console.log("Hello from basket!");
        state.basket = action?.payload
    },
    emptyBasket: (state) => {
        state.basket = null;
    }
  },
})

// Action creators are generated for each case reducer function
export const { fillBasket, emptyBasket } = basketSlice.actions

export default basketSlice.reducer