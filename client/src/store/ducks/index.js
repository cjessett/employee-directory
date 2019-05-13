import { combineReducers } from 'redux';

import employees from './employees';
import filters from './filters';

export default combineReducers({
  employees,
  filters,
});
