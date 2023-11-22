import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createContest, createContestWithFriend, fetchAllContest, joinContest, updateContest } from './contestApi';
import { toastError } from '../../components/toasts/ToastError';
import { toastSuccess } from '../../components/toasts/ToastSuccess';
import { selectTheme } from '../theme/themeSlice';

const initialState = {
  allContests: null, // this will contain all the contests existing -> inme se jinka status matching h use join contest(to join & update) m dikha de or jinka status fighting h unhe home m dikha de(to vot)
  loading: false,
  error: null,
};

export const updateContestAsync=createAsyncThunk(
  'contest/updateContest',
  async (data, { rejectWithValue, getState }) => {
    try {
      const state = getState();

      // Get the theme state using the selectTheme selector from the themeSlice
      const currentTheme = selectTheme(state);

      const response = await updateContest(data);

      return {resData:response.data,currentTheme};
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error);
    }
  }
)

export const fetchAllContestAsync = createAsyncThunk(
  'contest/fetchAllContest',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAllContest();
      return {resData:response.data};
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const createContestAsync = createAsyncThunk(
  'contest/createContest',
  async (contestData, { rejectWithValue, getState }) => {
    try {
      const state = getState();

      // Get the theme state using the selectTheme selector from the themeSlice
      const currentTheme = selectTheme(state);
        console.log(contestData);
      const response = await createContest(contestData);
      return {resData:response.data,currentTheme};
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const joinContestAsync = createAsyncThunk(
  'contest/joinContest',
  async (formData, { rejectWithValue, getState }) => {
    try {
      const state = getState();

      // Get the theme state using the selectTheme selector from the themeSlice
      const currentTheme = selectTheme(state);
      const response = await joinContest(formData);
      return {resData:response.data,currentTheme};
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const createContestWithFriendAsync = createAsyncThunk(
  'contest/createContestWithFriend',
  async (contestData, { rejectWithValue, getState }) => {
    try {
        console.log(contestData);
        const state = getState();

      // Get the theme state using the selectTheme selector from the themeSlice
      const currentTheme = selectTheme(state);
      const response = await createContestWithFriend(contestData);
      return {resData:response.data,currentTheme};
    } catch (error) {
      // console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const contestSlice = createSlice({
  name: 'contest',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllContestAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllContestAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;

        state.allContests = action.payload.resData.contests.reverse();
        state.error = null;
        // remove token from local
      })
      .addCase(fetchAllContestAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(createContestAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createContestAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.allContests.unshift(action.payload.resData.contest);
        state.error = null;
        // remove token from local
        const currentTheme = action.payload.currentTheme;
        toastSuccess('Contest Created !', "⚔️", currentTheme);
      })
      .addCase(createContestAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error.msg;
        toastError(action.payload.error.msg);
      })
      .addCase(joinContestAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(joinContestAsync.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.loading = false;
        let findIndex=state.allContests.findIndex((contest)=>contest._id===action.payload.resData.updatedContest._id)
        if (findIndex !== -1) state.allContests[findIndex]=action.payload.resData.updatedContest;
        state.allContests=state.allContests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        state.error = null;
        const currentTheme = action.payload.currentTheme;
        toastSuccess('Contest Joined !','⚔️',currentTheme);
        // remove token from local
      })
      .addCase(joinContestAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error.msg;
        console.log(action.error);
        toastError(action.payload.error.msg);
      })
      .addCase(updateContestAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateContestAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        let findIndex=state.allContests.findIndex((contest)=>contest._id===action.payload.resData.updatedContest._id)
        if (findIndex !== -1) state.allContests[findIndex]=action.payload.resData.updatedContest;
        state.error = null;
        const currentTheme = action.payload.currentTheme;
        toastSuccess('Like submitted !','👍',currentTheme);
        // remove token from local
      })
      .addCase(updateContestAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error.msg;
        toastError(action.payload.error.msg);
      })
      .addCase(createContestWithFriendAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createContestWithFriendAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.allContests.unshift(action.payload.resData.contest);
        state.error = null;
        const currentTheme = action.payload.currentTheme;
        toastSuccess('Contest Created !','⚔️',currentTheme);
        // remove token from local
      })
      .addCase(createContestWithFriendAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error.msg;
        console.log(action);
        toastError(action.payload.error.msg)
      })
  },
});

export const selectAllContests = (state) => state.contest.allContests;
export const selectUserError = (state) => state.contest.error;
export const selectUserLoading = (state) => state.contest.loading;

export default contestSlice.reducer;
