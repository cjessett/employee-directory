import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import EmployeePage from './components/EmployeePage';

import store from './store';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-placeholder/lib/reactPlaceholder.css';
import './index.css';

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path='/employees' component={App} />
        <Route path='/employees/:id' component={EmployeePage} />
        <Redirect from='/' to='/employees' />
      </Switch>
    </Router>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById('root')); // eslint-disable-line

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
