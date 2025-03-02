import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    selectedUser: null,
    loading:false,
    error:null,
}

const userSlice = createSlice({
    name: "users",
    initialState,
    
    reducers: {
      fetchUsersRequest: (state) => {
        state.loading = true;
      },
      fetchUsersSuccess: (state, action) => {
        state.loading = false;
        console.log(action.payload)
        state.users = action.payload;
      },
      fetchUsersFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      fetchUserRequest: (state) => {
         state.loading = true; 
      },
      fetchUserSuccess: (state, action) => {
         state.loading = false; 
         state.selectedUser = action.payload; 
      },
      fetchUserFailure: (state, action) => { 
        state.loading = false; 
        state.error = action.payload; 
      },
      addUserRequest: (state) => {
        state.loading = true;
      },
      addUserSuccess: (state, action) => {
        state.loading = false;
        const newUser = {
          id: state.users.length + 1, // Generate a local ID
          ...action.payload, // Keep all user details (name, email, phone, website)
        };
        state.users.push(newUser);
      },
      addUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      updateUserRequest: (state) => {
        state.loading = true;
      },
      updateUserSuccess: (state, action) => {
        state.loading = false;
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
      },
      updateUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      deleteUserRequest: (state) => {
        state.loading = true;
      },
      deleteUserSuccess: (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user.id !== action.payload);
      },
      deleteUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    },
  });
  export const {
    fetchUsersRequest,
    fetchUsersSuccess,
    fetchUsersFailure,
    fetchUserRequest, 
    fetchUserSuccess, 
    fetchUserFailure ,
    addUserRequest,
    addUserSuccess,
    addUserFailure,
    updateUserRequest,
    updateUserSuccess,
    updateUserFailure,
    deleteUserRequest,
    deleteUserSuccess,
    deleteUserFailure,
  } = userSlice.actions;
  export default userSlice.reducer;
  