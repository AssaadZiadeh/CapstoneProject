import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    user: null
  },
  reducers: {
    login: (state, action) => {
        localStorage.setItem('user', JSON.stringify({ ...action?.payload}));
        state.user = action.payload
    },

    logout: (state) => {
        localStorage.clear();
        state.user = null;
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions

export default authSlice.reducer