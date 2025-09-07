import { createSlice } from "@reduxjs/toolkit";

const carouselSlice = createSlice({
  name: "carousel",
  initialState: {
    currentImageIndex: 0,
    images: [
      "/images/image1.jpg",
      "/images/image2.jpg",
      "/images/image3.jpg",
      "/images/image4.jpg",
    ],
  },
  reducers: {
    nextImage: (state) => {
      state.currentImageIndex =
        (state.currentImageIndex + 1) % state.images.length;
    },
  },
});

export const { nextImage } = carouselSlice.actions;
export default carouselSlice.reducer;
