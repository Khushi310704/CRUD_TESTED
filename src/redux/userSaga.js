import { put, call, takeLatest, select } from "redux-saga/effects";
import {
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
} from './userSlice'

import axios from 'axios';
function* fetchUser(action) {
    try {
      // Get users from Redux store
      const users = yield select((state) => state.users.users);
  
      // Check if user exists locally (for newly added users)
      const existingUser = users.find((user) => user.id === Number(action.payload));
  
      if (existingUser) {
        yield put(fetchUserSuccess(existingUser)); // Load from Redux
      } else {
        // Fetch from API if not found in Redux
        const response = yield call(
          axios.get,
          `https://jsonplaceholder.typicode.com/users/${action.payload}`
        );
        yield put(fetchUserSuccess(response.data));
      }
    } catch (error) {
      yield put(fetchUserFailure(error.message));
    }
  }
  function* fetchUsers() {
    try {
      const response = yield call(
        axios.get,
        "https://jsonplaceholder.typicode.com/users"
      );
      yield put(fetchUsersSuccess(response.data));
    } catch (error) {
      yield put(fetchUsersFailure(error.message));
    }
  }

function* addUser(action) {
  try {
    const response = yield call(
      axios.post,
      "https://jsonplaceholder.typicode.com/users",
      {
        name: action.payload.name,
        email: action.payload.email,
        phone: action.payload.phone,
        website: action.payload.website,
      }
    );
    yield put(addUserSuccess(response.data));
  } catch (error) {
    yield put(addUserFailure(error.message));
  }
}

  
  function* updateUser(action) {
    try {
      const response = yield call(
        axios.put,
        `https://jsonplaceholder.typicode.com/users/${action.payload.id}`,
        action.payload
      );
      yield put(updateUserSuccess(response.data));
    } catch (error) {
      yield put(updateUserFailure(error.message));
    }
  }
  
  function* deleteUser(action) {
    try {
      yield call(
        axios.delete,
        `https://jsonplaceholder.typicode.com/users/${action.payload}`
      );
      yield put(deleteUserSuccess(action.payload));
    } catch (error) {
      yield put(deleteUserFailure(error.message));
    }
  }
  
  export default function* userSaga() {
    yield takeLatest(fetchUsersRequest.type, fetchUsers);
    yield takeLatest(fetchUserRequest.type, fetchUser);
    yield takeLatest(addUserRequest.type, addUser);
    yield takeLatest(updateUserRequest.type, updateUser);
    yield takeLatest(deleteUserRequest.type, deleteUser);
  }
  