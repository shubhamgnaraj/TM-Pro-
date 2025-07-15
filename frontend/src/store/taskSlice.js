import { createSlice } from "@reduxjs/toolkit";
import { addItemsToServer, getItemsFromServer, fetchAllEmployees, getLoggedInEmployee } from "../service/service";
import { registerUserFromServer } from "../service/authService";
import { loginUser } from "../service/authService";

// const userFromStorage = JSON.parse(localStorage.getItem("employeeInfo"))

const initialState = {
  employeeInfo: null,
  loggedEmployee: null,
  isLoading: false,
  error: null,
  isAuthentication: false,
};

const tasksSlice = createSlice({
  name: "employeeInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addItemsToServer.pending, (state) => {
        state.isLoading = true;
        state.isAuthentication = true;
      })
      .addCase(addItemsToServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthentication = true;
      })
      .addCase(addItemsToServer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "Task Not Added";
        state.isAuthentication = true;
      });

    builder
      .addCase(getItemsFromServer.pending, (state) => {
        state.isLoading = true;
        state.isAuthentication = true;
      })
      .addCase(getItemsFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.tasks = action.payload;
        state.isAuthentication = true;
      })
      .addCase(getItemsFromServer.rejected, (state) => {
        state.isLoading = false;
        state.error = "Please Add a Task ";
        state.isAuthentication = true;
        state.isAuthentication = true;
      });

    builder
      .addCase(registerUserFromServer.pending, (state) => {
        state.isLoading = true;
        state.isAuthentication = false;
      })
      .addCase(registerUserFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthentication = false;
      })
      .addCase(registerUserFromServer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthentication = false;
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isAuthentication = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthentication = false;
      });

      builder.addCase(fetchAllEmployees.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllEmployees.fulfilled, (state, action) =>{
        state.isLoading = false;
        state.employeeInfo = action.payload.user

      })
      .addCase(fetchAllEmployees.rejected, (state) => {
        state.isLoading = false;
      });

      builder.addCase(getLoggedInEmployee.pending, (state ) => {
        state.isLoading = true
      })
      .addCase(getLoggedInEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.loggedEmployee = action.payload.tasks;
      })
      .addCase(getLoggedInEmployee.rejected, (state) =>{
        state.isLoading = true;
      })
  },
});

export default tasksSlice.reducer;
