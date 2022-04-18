import { createSlice } from '@reduxjs/toolkit'

export const friendSlice = createSlice({
  name: 'friend',
  initialState: {
    friend: null
  },
  reducers: {
    setFriend: (state, action) => {
        state.friend = action?.payload
    },

    removeFriend: (state, action) =>{
        state.friend = null;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setFriend, removeFriend } = friendSlice.actions

export default friendSlice.reducer