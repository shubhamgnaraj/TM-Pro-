import { createAsyncThunk } from "@reduxjs/toolkit";
export const registerUserFromServer = createAsyncThunk(
  "data/registerUserFromServer",
  async (userInfo, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3000/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      if (!response.ok) {
        const error = await response.json();
        return thunkAPI.rejectWithValue(error);
      }

      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: "failed to register user"
      });
    }
  }
);

export const loginUser = createAsyncThunk(
  "data/auth/loginUser",
  async (userData, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();
        return thunkAPI.rejectWithValue(error);
      }

      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue("faild to Login");
    }
  }
);
