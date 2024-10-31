import { combineReducers } from 'redux';

import commonReducer from 'core/modules/common/reducer';
import generalReducer from 'core/modules/general/reducer';

export default combineReducers({
  common: commonReducer,
  general: generalReducer,
});
