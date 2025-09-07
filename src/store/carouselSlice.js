import { createSlice } from '@reduxjs/toolkit';

const carouselSlice = createSlice({
  name: 'carousel',
  initialState: {
    currentImageIndex: 0,
    images: [
        '/images/beach1.jpg',
        '/images/beach2.jpg',
        '/images/image1.jpg',
        '/images/image10.jpg',
        '/images/image2.jpg',
        '/images/image3.jpg',
        '/images/image4.jpg',
        '/images/image5.jpg',
        '/images/image6.jpg',
        '/images/image7.jpg',
        '/images/image8.jpg',
        '/images/image9.jpg',
        '/images/jungle2.jpeg',
        '/images/mountain1.jpg',
        '/images/mountain2.jpg',
      ],
  },
  reducers: {
    nextImage: (state) => {
      state.currentImageIndex = (state.currentImageIndex + 1) % state.images.length;
    },
  },
});

export const { nextImage } = carouselSlice.actions;
export default carouselSlice.reducer;
