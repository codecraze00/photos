import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";
import { addUser } from "../thunks/addUser";
import { destroyUser } from "../thunks/destroyUser";

const userSlice = createSlice({
    name: 'users',
    initialState: {
        list: [],
        isLoading: 0,
        err: null
    },
    extraReducers(builder) {
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.isLoading = true
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.isLoading = false
            state.list = action.payload
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.isLoading = false
            state.err = action.error
        });

        builder.addCase(addUser.pending, (state, action) => {
            state.isLoading = true
        });
        builder.addCase(addUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.list.push(action.payload)
        });
        builder.addCase(addUser.rejected, (state, action) => {
            state.isLoading = false
            state.err = action.error
        });

        builder.addCase(destroyUser.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(destroyUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.list = state.list.filter(user => user.id !== action.payload.id)
        })
        builder.addCase(destroyUser.rejected, (state, action) => {
            state.isLoading = false
            state.err = action.error
        })
    }
})

export const usersReducers = userSlice.reducer;