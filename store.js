import { configureStore } from '@reduxjs/toolkit';
import authReducer from './ReduxSlices/AuthSlice.js';

export default configureStore({
  reducer: {
      authentication: authReducer
  },
})
