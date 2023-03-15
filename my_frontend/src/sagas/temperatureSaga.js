import { put, takeEvery } from "redux-saga/effects";
import * as types from "../commons/index";
import callApi from "../fetchApi/index";
function convert(res) {
  let temperature = [];
  let humidity = [];
  res.forEach((element) => {
    temperature.push(parseFloat(element.temperature));
    humidity.push(parseFloat(element.humidity));
  });
  return { temperature: temperature, humidity: humidity };
}
function* getTemperature() {
  try {
    let res = yield callApi(`/temperature/8`, {}, "GET");
    yield put({
      type: types.GET_TEMPERATURE_SUCCESS,
      payload: convert(res.data),
    });
  } catch (error) {
    yield put({
      type: types.GET_TEMPERATURE_FAIL,
      payload: {
        errorMessage: error.message,
      },
    });
  }
}
function* addStateLed(action) {
  try {
    let res = yield callApi(`/led`, action.payload, "POST");
    yield put({
      type: types.ADD_STATELED_SUCCESS,
      payload: res,
    });
  } catch (error) {
    yield put({
      type: types.ADD_STATELED_FAIL,
      payload: {
        errorMessage: error.message,
      },
    });
  }
}
function* addStateDoor(action) {
  try {
    let res = yield callApi("/door", action.payload, "POST");
    yield put({
      type: types.ADD_STATEDOOR_SUCCESS,
      payload: res,
    });
  } catch (error) {
    yield put({
      type: types.ADD_STATELED_FAIL,
      payload: {
        errorMessage: error.message,
      },
    });
  }
}
export const TempSaga = [
  takeEvery(types.GET_TEMPERATURE_REQ, getTemperature),
  takeEvery(types.ADD_STATELED_REQ, addStateLed),
  takeEvery(types.ADD_STATEDOOR_REQ, addStateDoor),
];
