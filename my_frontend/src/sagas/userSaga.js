import { delay, put, takeEvery } from "redux-saga/effects";
import * as types from "../commons/index";
import callApi from "../fetchApi/index";

function* login(action) {
  try {
    let res = yield callApi(`/login`, action.payload, "POST");
    yield put({
      type: types.LOGIN_SUCCESS,
      payload: res,
    });
  } catch (error) {
    yield put({
      type: types.LOGIN_FAIL,
      payload: {
        errorMessage: error.message,
      },
    });
  }
}
function* register(action) {
  try {
    let res = yield callApi(`/user`, action.payload, "POST");
    yield put({
      type: types.REGISTER_SUCCESS,
      payload: res,
    });
  } catch (error) {
    yield put({
      type: types.REGISTER_FAIL,
      payload: {
        errorMessage: error.message,
      },
    });
  }
}
function* get_user_by_id(action) {
  try {
    let res = yield callApi(`/user/${action.payload}`, {}, "GET");
    yield put({
      type: types.GET_USER_SUCCESS,
      payload: res,
    });
  } catch (error) {
    yield put({
      type: types.GET_USER_FAIL,
      payload: {
        errorMessage: error.message,
      },
    });
  }
}
function* add_home(action) {
  try {
    let res = yield callApi(
      `/house/${action.payload.idHome}`,
      { idUser: action.payload.idUser },
      "POST"
    );
    delay(3000);
    yield put({
      type: types.GET_USER_REQ,
      payload: action.payload.idUser,
    });
  } catch (error) {
    yield put({
      type: types.ADD_HOME_FAIL,
      payload: {
        errorMessage: error.message,
      },
    });
  }
}
function* delete_home(action) {
  try {
    let res = yield callApi(
      `/house/${action.payload.idHome}`,
      { idUser: action.payload.idUser },
      "DELETE"
    );
    yield put({
      type: types.GET_USER_REQ,
      payload: action.payload.idUser,
    });
  } catch (error) {
    yield put({
      type: types.DELETE_HOME_FAIL,
      payload: {
        errorMessage: error.message,
      },
    });
  }
}
export const UserSaga = [
  takeEvery(types.LOGIN_REQ, login),
  takeEvery(types.REGISTER_REQ, register),
  takeEvery(types.GET_USER_REQ, get_user_by_id),
  takeEvery(types.ADD_HOME_REQ, add_home),
  takeEvery(types.DELETE_HOME_REQ, delete_home),
];
