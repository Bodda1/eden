import { takeLatest } from 'redux-saga/effects';

import { setTestCommon } from './reducer';

function* setTestCommonSaga() {
  try {
    yield console.log('setTestCommonSaga');
  } catch (error) {
    console.log(error);
  }
}

function* commonSaga() {
  yield takeLatest(setTestCommon.type, setTestCommonSaga);
}

export default commonSaga;
