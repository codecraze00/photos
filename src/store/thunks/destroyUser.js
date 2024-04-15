import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const destroyUser = createAsyncThunk('users/destroy', async (user) => {
    await axios.delete(`http://localhost:3001/users/${user.id}`)
    return user
})