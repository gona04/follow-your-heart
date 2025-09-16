import { configureStore } from '@reduxjs/toolkit';
import typingReducer from './typingSlice';
import travelReducer from './travelSlice';

const store = configureStore({
  reducer: {
    typing: typingReducer,
    travel: travelReducer,
  },
});

export default store;
