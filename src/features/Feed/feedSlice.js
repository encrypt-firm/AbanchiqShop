import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addPost, getAllFeeds, getSingleFeed, deleteFeed } from './feedService';


const initialState = {
    posts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const addPostAsync = createAsyncThunk(
    'feed/addPost',
    async (postData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await addPost(postData, token);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const fetchAllFeedsAsync = createAsyncThunk(
    'feed/fetchAll',
    async (_, thunkAPI) => {
        try {
            // const token = thunkAPI.getState().auth.user.token;
            return await getAllFeeds();
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const fetchSingleFeedAsync = createAsyncThunk(
    'feed/fetchSingle',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await getSingleFeed(id, token);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteFeedAsync = createAsyncThunk(
    'feed/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            await deleteFeed(id, token);
            return id;
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);




export const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        reset: (state) => {
            state.posts = [];
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addPostAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addPostAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.posts.push(action.payload);
            })
            .addCase(addPostAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(fetchAllFeedsAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllFeedsAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.posts = action.payload;
            })
            .addCase(fetchAllFeedsAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(fetchSingleFeedAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchSingleFeedAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.posts = action.payload;
            })
            .addCase(fetchSingleFeedAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteFeedAsync.fulfilled, (state, action) => {
                state.posts = state.posts.filter(post => post._id !== action.payload);
            })

    },
});

export const { reset } = feedSlice.actions;
export default feedSlice.reducer;