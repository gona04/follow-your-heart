import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  headingText: "Follow Your Heart".trim(),
  subheadingText: "Why limit yourself to being only a beach or a mountain person? When you can be so much more....".trim(),
  typedHeading: '',
  typedSubheading: '',
};

const typingSlice = createSlice({
  name: 'typing',
  initialState,
  reducers: {
    typeHeadingChar: (state) => {
      if (state.typedHeading.length < state.headingText.length) {
        state.typedHeading += state.headingText.charAt(state.typedHeading.length);
      }
    },
    typeSubheadingChar: (state) => {
      if (state.typedSubheading.length < state.subheadingText.length) {
        state.typedSubheading += state.subheadingText.charAt(state.typedSubheading.length);
      }
    },
    resetTyping: (state) => {
      state.typedHeading = '';
      state.typedSubheading = '';
    },
  },
});

export const { typeHeadingChar, typeSubheadingChar, resetTyping } = typingSlice.actions;
export default typingSlice.reducer;
