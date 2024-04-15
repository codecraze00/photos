import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { faker } from "@faker-js/faker";

export const addUser = createAsyncThunk('user/add', async () => {
    const res = await axios.post('http://localhost:3001/users', {
        name: faker.name.fullName()
    })
    return res.data
})