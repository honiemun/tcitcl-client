import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { client } from '~/api/client';
import type { RootState } from '~/store';
import { createAppAsyncThunk } from '~/withTypes';

type NewPost = Pick<Post, 'name' | 'description'>

export interface Post {
    id: number,
    name: string,
    description: string | null;
}

interface PostsState {
    posts: Post[],
    filter: string,
    status: 'idle' | 'pending' | 'succeeded' | 'rejected',
    error: string | null
}

export const fetchPosts = createAppAsyncThunk('posts/fetchPosts', async (): Promise<Post[]> => {
    const response = await client.get<Post[]>('/post')
    return response.data
},
{
    condition (arg, thunkApi) {
        // Safeguard against double requests from StrictMode
        const postsStatus = selectPostsStatus(thunkApi.getState())
        if (postsStatus !== 'idle') {
            return false
        }
    }
});

export const addNewPost = createAppAsyncThunk(
    'posts/addNewPost',
    async (initialPost: NewPost): Promise<Post> => {
        const response = await client.post<Post>('/post', initialPost);
        return response.data;
    }
)

export const deletePost = createAppAsyncThunk(
    'posts/deletePost',
    async (postId: number): Promise<number | null> => {
        await client.delete<Post>(`/post/${postId}`);
        return postId;
    }
);

const initialState: PostsState = {
    posts: [],
    filter: '', // Local only search
    status: 'idle',
    error: null
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setFilter(state, action: PayloadAction<string>) {
            state.filter = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'pending';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message ?? 'Unknown error';
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                state.posts.push(action.payload);
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter(post => post.id !== action.payload);
            })
    }
})

export default postsSlice.reducer;

// Action creator
export const { setFilter } = postsSlice.actions;

export const selectAllPosts = (state: RootState) => state.posts.posts;

export const selectPostsFilter = (state: RootState) => state.posts.filter;

export const selectPostsStatus = (state: RootState) => state.posts.status;
export const selectPostsError = (state: RootState) => state.posts.error;