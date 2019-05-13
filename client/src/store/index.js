import { createStore, applyMiddleware } from 'redux';
import thunkMiddlware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import rootReducer from './ducks';

const store = createStore(rootReducer, composeWithDevTools({})(
  applyMiddleware(thunkMiddlware),
));

export default store;
