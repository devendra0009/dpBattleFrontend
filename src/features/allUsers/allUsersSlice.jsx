import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllUsers } from "./allUsersApi";

const initialState = {
  allUsersInfo: null,
  pagination: null,
  loading: false,
  error: null,
  selectedPopularUserProfile: null,
  hasMore: true, // For infinite loading
};

export const fetchAllUsersAsync = createAsyncThunk(
  "allUsers/fetchAllUsers",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await fetchAllUsers(params);
      return { resData: response.data, append: params.append || false };
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const updateAllUsers = createAction(
  "allUsers/updateAllUsers",
  (updatedUser) => {
    return {
      payload: updatedUser,
    };
  }
);

export const allUsersSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {
    setSelectedPopularUserProfile: (state, action) => {
      console.log(action);
      state.selectedPopularUserProfile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsersAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsersAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;

        if (
          action.payload.append &&
          state.allUsersInfo &&
          Array.isArray(state.allUsersInfo)
        ) {
          // Append new users for infinite loading
          state.allUsersInfo = [
            ...state.allUsersInfo,
            ...(action.payload.resData.users || []),
          ];
        } else {
          // Replace users for new search/filter
          state.allUsersInfo = action.payload.resData.users || [];
        }

        state.pagination = action.payload.resData.pagination;
        state.hasMore =
          action.payload.resData.pagination &&
          action.payload.resData.pagination.currentPage <
            action.payload.resData.pagination.totalPages;
        state.error = null;
        // remove token from local
      })
      .addCase(fetchAllUsersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(updateAllUsers, (state, action) => {
        console.log(action);
        const updatedUserIndex = state.allUsersInfo.findIndex(
          (user, idx) => user._id === action.payload._id
        );
        const updatedUser = action.payload;
        state.allUsersInfo[updatedUserIndex] = updatedUser;
        if (state.selectedPopularUserProfile) {
          const updatedSelectedUserProfile = state.allUsersInfo.find(
            (user, idx) => user._id === action.payload._id
          );
          state.selectedPopularUserProfile = updatedSelectedUserProfile;
        }
      });
  },
});

export const { setSelectedPopularUserProfile } = allUsersSlice.actions;

export const selectAllUsers = (state) => state.allUsers.allUsersInfo;
export const selectUsersPagination = (state) => state.allUsers.pagination;
export const selectUsersHasMore = (state) => state.allUsers.hasMore;
export const selectPopularUserProfile = (state) =>
  state.allUsers.selectedPopularUserProfile;
export const selectAllUsersError = (state) => state.allUsers.error;
export const selectAllUsersLoading = (state) => state.allUsers.loading;

export default allUsersSlice.reducer;
