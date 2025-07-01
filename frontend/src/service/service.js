import { createAsyncThunk } from "@reduxjs/toolkit";

export const addItemsToServer = createAsyncThunk(
  "data/AddDataToServer",
  async (items, thunkAPI) => {
    // Add thunkAPI parameter
    try {
      const response = await fetch("http://localhost:3000/task/add-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(items),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      return await response.json();
    } catch (error) {
      console.log("something went wrong with frontend addTask", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getItemsFromServer = createAsyncThunk(
  "data/getDataFromServer",
  async (thunkAPI) => {
    const response = await fetch("http://localhost:3000/task/home");

    return await response.json();
  }
);
