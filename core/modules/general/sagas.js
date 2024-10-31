import { takeLatest } from 'redux-saga/effects';

import { setTestGeneral } from './reducer';

function* setTestGeneralSaga() {
  try {
    yield console.log('setTestGeneralSaga');
  } catch (error) {
    console.log(error);
  }
}

function* generalSaga() {
  yield takeLatest(setTestGeneral.type, setTestGeneralSaga);
}

export default generalSaga;
