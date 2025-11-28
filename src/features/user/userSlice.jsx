import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteUser,
  fetchUserInfo,
  updateFollowerFollowing,
  updateUser,
} from "./userApi";
import { toastSuccess } from "../../components/toasts/ToastSuccess";
import { toastError } from "../../components/toasts/ToastError";
import { selectTheme } from "../theme/themeSlice";

const initialState = {
  userInfo: null, // user info m sb ajaega uske followers, following, no. of votes and all
  searchedUser: "",
  loading: false,
  error: null,
};

export const fetchUserInfoAsync = createAsyncThunk(
  "user/fetchUserInfo",
  async (_, { rejectWithValue, getState }) => {
    // console.log(userId);
    try {
      const state = getState();
      const currentTheme = selectTheme(state);
      const response = await fetchUserInfo();
      return { resData: response.data, currentTheme };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (updateData, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const currentTheme = selectTheme(state);
      const response = await updateUser(updateData);
      return { resData: response.data, currentTheme };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateFollowerFollowingAsync = createAsyncThunk(
  "user/updateFollowerFollowing",
  async (updateData, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const currentTheme = selectTheme(state);
      const response = await updateFollowerFollowing(updateData);
      return { resData: response.data, currentTheme };
    } catch (error) {
      const state = getState();
      const currentTheme = selectTheme(state);
      return rejectWithValue({ error: error.error || error, currentTheme });
    }
  }
);

// on deletion of user clear the state and remove token from local
export const deleteUserAsync = createAsyncThunk(
  "user/deleteUser",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const currentTheme = selectTheme(state);
      const response = await deleteUser();
      return { resData: response.data, currentTheme };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserState: (state) => (state = initialState),
    setSearchedUser: (state, action) => {
      // console.log(action);
      state.searchedUser = action.payload;
    },
    clearSearchedUser: (state, action) => {
      // console.log(action);
      state.searchedUser = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfoAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserInfoAsync.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.userInfo = action.payload.resData.user;
        state.error = null;
      })
      .addCase(fetchUserInfoAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error.msg;
        toastError(action.payload.error.msg);
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.userInfo = action.payload.resData.data;
        state.error = null;
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error.msg;
        toastError(action.payload.error.msg);
      })
      .addCase(updateFollowerFollowingAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateFollowerFollowingAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;

        if (action.payload.resData?.updatedUser) {
          const prevFollowerCount = state.userInfo?.following?.length || 0;
          state.userInfo = action.payload.resData.updatedUser;
          console.log(state.userInfo);
          const currFollowerCount = state.userInfo?.following?.length || 0;
          const currentTheme = action.payload.currentTheme;
          toastSuccess(
            `${
              prevFollowerCount < currFollowerCount
                ? "User followed !"
                : "User Unfollowed !"
            }`,
            "🚀",
            currentTheme
          );
        }

        if (action.payload.resData?.updatedTargetUser) {
          // Update the target user in allUsers list if it exists
          // This is handled by updateAllUsers action in Profile component
        }

        state.error = null;
      })
      .addCase(updateFollowerFollowingAsync.rejected, (state, action) => {
        state.loading = false;
        const errorMsg =
          action.payload?.error?.msg ||
          action.payload?.error ||
          action.error?.message ||
          "Failed to update follow status";
        state.error = errorMsg;
        const currentTheme = action.payload?.currentTheme || "light";
        toastError(errorMsg, "❌", currentTheme);
      })
      .addCase(deleteUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.userInfo = null;
        state.searchedUser = null;
        state.error = null;
        const currentTheme = action.payload.currentTheme;
        toastSuccess("User Deleted !", "❎", currentTheme);
        // remove token from local
      })
      .addCase(deleteUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error.msg;
        toastError(action.payload.error.msg);
      });
  },
});

export const { clearUserState, setSearchedUser, clearSearchedUser } =
  userSlice.actions;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectSearchedUser = (state) => state.user.searchedUser;
export const selectUserError = (state) => state.user.error;
export const selectUserLoading = (state) => state.user.loading;

export default userSlice.reducer;
