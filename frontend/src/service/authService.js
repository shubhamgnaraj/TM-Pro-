import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../config";

export const registerUserFromServer = createAsyncThunk(
  "data/registerUserFromServer",
  async (employeeInfo, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("firstname", employeeInfo.firstname);
      formData.append("lastname", employeeInfo.lastname);
      formData.append("email", employeeInfo.email);
      formData.append("password", employeeInfo.password);
      formData.append("confirmPassword", employeeInfo.confirmPassword);
      formData.append("photo", employeeInfo.photo);
      formData.append("position", employeeInfo.position);

      const response = await fetch(`${BASE_URL}/manager/add-user`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        return thunkAPI.rejectWithValue(error);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: "failed to register user",
        error,
      });
    }
  }
);

export const loginUser = createAsyncThunk(
  "data/auth/loginUser",
  async (userData, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/employee/login`, {
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
      const data = await response.json();

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("failed to Login");
    }
  }
);
