import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../config";
import { authFetch } from "../utils/authFetch";

export const addItemsToServer = createAsyncThunk(
  "data/AddDataToServer",
  async (items, thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const response = await authFetch(
        `${BASE_URL}/manager/send-task-employee`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(items),
        }
      );

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
    const response = await fetch(`${BASE_URL}/task/home`);

    return await response.json();
  }
);

export const fetchAllEmployees = createAsyncThunk(
  "data/getFetchAllUser",
  async (_, thunkAPI) => {
    try {
      const response = await authFetch(`${BASE_URL}/manager/dashboard`);

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log("something went wrong", error.message);
      return thunkAPI.rejectWithValue("Failed to fetch employees");
    }
  }
);

export const getLoggedInEmployee = createAsyncThunk(
  "data/addAllEmployee",
  async (employeeId, thunkAPI) => {
    const token = localStorage.getItem("token");
    const response = await authFetch(
      `${BASE_URL}/employee/dashboard/${employeeId}`
    );

    const data = await response.json();
    return data;
  }
);
