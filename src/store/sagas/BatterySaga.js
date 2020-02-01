import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

import { FETCH_BATTERIES } from '../constants';
import { BatteriesFetched } from '../actions';

function notFoundResponse() {
  return {
    status: 404,
    data: false,
  };
}

function request(httpOptions) {
  return axios(httpOptions)
    .then((response) => response)
    .catch((error) => error.response || notFoundResponse());
}

// import { dummy1 } from './dummyData';
export function* fetchBatteries(action) {

  const httpConfig = {
    url: `https://api.myjson.com/bins/f8ncq`,
    method: 'get',
  };
  const response = yield call(request, httpConfig);
  yield put(BatteriesFetched(response.data.BatteryList));
}

export default function* BatterySaga() {
  yield takeLatest(FETCH_BATTERIES, fetchBatteries);
}
