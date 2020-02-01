import {  all } from 'redux-saga/effects'

import BatterySaga from './BatterySaga';

export default function* rootSaga() {
    yield all([
      BatterySaga()
    ])
    // code after all-effect
  }
