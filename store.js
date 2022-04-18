import { configureStore } from '@reduxjs/toolkit';
import authReducer from './ReduxSlices/AuthSlice.js';
import stockReducer from './ReduxSlices/StocksSlice.js';
import basketReducer from './ReduxSlices/BasketSlice.js';
import saleReducer from './ReduxSlices/SaleSlice.js';
import FriendReducer from './ReduxSlices/FriendSlice.js';
import ChartReducer from './ReduxSlices/ChartSlice.js';

export default configureStore({
  reducer: {
      authentication: authReducer,
      quotes: stockReducer,
      purchase: basketReducer,
      sale: saleReducer,
      friend: FriendReducer,
      chart: ChartReducer
  },
})
