import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  authenticateUser,
  loginUser,
  logoutUser,
  registerUser,
} from './authApi';

const initialState = {
  loggedInUserToken: null,
  // userId: null, // not reqd because server m id autom chli jari hai and login hote hi vo fetch krlega
  userAuthenticated: false,
  loading: false,
  error: null,
};

export const registerUserAsync = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUser(userData);
      return response.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const loginUserAsync = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    // console.log(userData);
    try {
      const response = await loginUser(userData);
      // response.error={"msg":"falsy"}
      // console.log(response.data, 'res');
      return response.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error);
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
        state.loggedInUserToken = action.payload.token;
        state.userAuthenticated = true;
        state.error=null
        // set token to local
        // localStorage.setItem('auth-token',)
        localStorage.setItem('auth-token',action.payload.token)
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        console.log(action);
        state.loading = false;
        // console.log(action.payload);
        state.loggedInUserToken = action.payload.token;
        state.userAuthenticated = true;
        state.error=null
        // set token to local
        localStorage.setItem('auth-token',action.payload.token)
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        // console.log(action);
        state.loading = false;
        state.error = action.payload;
        console.log(action);
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
