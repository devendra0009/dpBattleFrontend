import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  authenticateUser,
  loginUser,
  logoutUser,
  registerUser,
} from './authApi';
import { toastError } from '../../components/toasts/ToastError';
import { selectTheme } from '../theme/themeSlice';
import { toastSuccess } from '../../components/toasts/ToastSuccess';

const initialState = {
  loggedInUserToken: null,
  // userId: null, // not reqd because server m id autom chli jari hai and login hote hi vo fetch krlega
  userAuthenticated: false,
  loading: false,
  error: null,
};

export const registerUserAsync = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue, getState }) => {
    const state = getState();
    const currentTheme = selectTheme(state);
    try {
      const response = await registerUser(userData);
      return {resData:response.data,currentTheme};
    } catch (error) {
      // console.log(error);
      return rejectWithValue({error:error,currentTheme});
    }
  }
);
export const loginUserAsync = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue, getState }) => {
    // console.log(userData);
    const state = getState();
    const currentTheme = selectTheme(state);
    try {
      const response = await loginUser(userData);
      return {resData:response.data,currentTheme};
    } catch (error) {
      // console.log(error);
      return rejectWithValue({error:error,currentTheme});
    }
  }
);

export const logoutUserAsync = createAsyncThunk('auth/logoutUser', async () => {
  const response = await logoutUser();
  return response.data;
});

export const authenticateUserAsync = createAsyncThunk(
  'auth/authenticateUser',
  async (token) => {
    const response = await authenticateUser(token);
    return response.data;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedInUserToken = action.payload.resData.token;
        state.userAuthenticated = true;
        state.error=null
        // set token to local
        localStorage.setItem('auth-token',action.payload.resData.token)
        const currentTheme = action.payload.currentTheme;
        toastSuccess('Registered Successfully!','✅',currentTheme)
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
        const currentTheme = action.payload.currentTheme;
        toastError(state.error.error.msg,'❌',currentTheme)
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        // console.log(action);
        state.loading = false;
        // console.log(action.payload);
        state.loggedInUserToken = action.payload.resData.token;
        state.userAuthenticated = true;
        state.error=null
        // console.log(action.payload.token);
        // set token to local
        localStorage.setItem('auth-token',action.payload.resData.token)
        const currentTheme = action.payload.currentTheme;
        toastSuccess('Logged In Successfully!','✅',currentTheme)
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = action.payload.error;
        const currentTheme = action.payload.currentTheme;
        toastError(state.error.error.msg,'❌',currentTheme)
      })
      .addCase(authenticateUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(authenticateUserAsync.fulfilled, (state, action) => {
        // console.log(action);
        state.loading = false;
        // console.log(action.payload);
        state.loggedInUserToken = action.payload;
        state.userAuthenticated = true;
        state.error=null
      })
      .addCase(authenticateUserAsync.rejected, (state, action) => {
        // console.log(action);
        state.loading = false;
        state.userAuthenticated = false;
        state.error = action.payload;
        // console.log(action);
      })
      .addCase(logoutUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUserAsync.fulfilled, (state) => {
        state.loading = false;
        state.loggedInUserToken = null;
        state.userAuthenticated = false;
        state.error=null
        localStorage.removeItem('auth-token')
      });
  },
});

// export const { authenticateUser } = authSlice.actions; // reducer export

export const selectLoggedInUserToken = (state) => state.auth.loggedInUserToken;
export const selectUserAuthenticated = (state) => state.auth.userAuthenticated;
export const selectLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
