import { createSlice } from '@reduxjs/toolkit';

const shuffleArray = (array) => {
  const shuffled = [...array.keys()]; // Create an array of indices
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
  }
  return shuffled;
};

const initialImages = [
  "/images/image1.jpg",
  "/images/image2.jpg",
  "/images/image3.jpg",
  "/images/image4.jpg",
];

const initialShuffledOrder = shuffleArray(initialImages);

const initialState = {
  currentImageIndex: initialShuffledOrder[0],
  images: initialImages,
  shuffledOrder: initialShuffledOrder,
  shuffledOrderIndex: 0,
};

const carouselSlice = createSlice({
  name: 'carousel',
  initialState,
  reducers: {
    nextImage: (state) => {
      state.shuffledOrderIndex += 1;

      if (state.shuffledOrderIndex >= state.shuffledOrder.length) {
        state.shuffledOrder = shuffleArray(state.images);
        state.shuffledOrderIndex = 0;
      }

      state.currentImageIndex = state.shuffledOrder[state.shuffledOrderIndex];
    },
  },
});

export const { nextImage } = carouselSlice.actions;
export default carouselSlice.reducer;
