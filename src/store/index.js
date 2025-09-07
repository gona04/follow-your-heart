import { configureStore } from '@reduxjs/toolkit';
import carouselReducer from './carouselSlice';
import typingReducer from './typingSlice';

const store = configureStore({
  reducer: {
    carousel: carouselReducer,
    typing: typingReducer,
  },
});

export default store;
