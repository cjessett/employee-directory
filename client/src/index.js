import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Employee from './components/EmployeePage';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/employees" component={App} />
        <Route path="/employees/:id" component={Employee} />
        <Redirect from="/" to="/employees" />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<AppRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
