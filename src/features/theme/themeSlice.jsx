import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  themeMode: 'light',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    // toggleTheme is action.type and we can take action as a input giving action.payload
    toggleTheme: (state) => {
      if (state.themeMode === 'light') state.themeMode = 'dark';
      else state.themeMode = 'light';
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export const selectTheme = (state) => state.theme.themeMode;

export default themeSlice.reducer;
