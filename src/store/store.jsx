import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/theme/themeSlice.jsx'
import authReducer from '../features/auth/authSlice.jsx'
import contestReducer from '../features/contests/contestSlice.jsx'
import userReducer from '../features/user/userSlice.jsx'
import allUsersReducer from '../features/allUsers/allUsersSlice.jsx'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    user: userReducer,
    contest: contestReducer,
    allUsers: allUsersReducer,
  },
});
