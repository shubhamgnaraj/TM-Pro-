import { createSlice } from "@reduxjs/toolkit";
import { addItemsToServer, getItemsFromServer } from "../service/service";
import { registerUserFromServer } from "../service/authService";
import { loginUser } from "../service/authService";

const initialState = {
  tasks: [],
  userInfo: {},
  isLoading: false,
  error: null,
  isAuthentication: false,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemsToServer.pending, (state) => {
        state.isLoading = true;
        state.isAuthentication = true
        
      })
      .addCase(addItemsToServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
        state.isAuthentication = true
        
      })
      .addCase(addItemsToServer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "Task Not Added";
        state.isAuthentication = true
      });

    builder
      .addCase(getItemsFromServer.pending, (state) => {
        state.isLoading = true;
        state.isAuthentication = true
      })
      .addCase(getItemsFromServer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
        state.isAuthentication = true
      })
      .addCase(getItemsFromServer.rejected, (state) => {
        state.isLoading = false;
        state.error = "Please Add a Task ";
        state.isAuthentication = true
        state.isAuthentication = true
      });

      builder
      .addCase(registerUserFromServer.pending, (state) => {
        state.isLoading = true
        state.isAuthentication = false
        
      })
      .addCase(registerUserFromServer.fulfilled, (state, action) => {
        state.isLoading = false
        state.userInfo = action.payload
        state.isAuthentication = false
        
      })
      .addCase(registerUserFromServer.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.isAuthentication = false
        
      })

      builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isAuthentication = false
        
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload
        state.isAuthentication = true
        state.isAuthentication = false
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
        state.isAuthentication = false
        
      })
  },
});

export default tasksSlice.reducer;
