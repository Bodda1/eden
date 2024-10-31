import { fork } from 'redux-saga/effects';

import commonSaga from 'core/modules/common/sagas';
import generalSaga from 'core/modules/general/sagas';

function* rootSaga() {
  yield fork(commonSaga);
  yield fork(generalSaga);
}

export default rootSaga;
