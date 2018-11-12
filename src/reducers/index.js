import { combineReducers } from 'redux';
import auth from './auth';
import navigation from './navigation';
import alerts from './alerts';
import goods from './goods';
import brand from './brand';

export default combineReducers({
  alerts,
  auth,
  navigation,
  goods,
  brand,
});
