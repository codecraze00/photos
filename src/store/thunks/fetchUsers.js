import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
    const res = await axios.get('http://localhost:3001/users')

    //DEV ONLY
    await pause(2000);

    return res.data;
})

//DEV ONLY !!
const pause = (delay) => {
    return new Promise(resolve => setTimeout(resolve, delay))
}