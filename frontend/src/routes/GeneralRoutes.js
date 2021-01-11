import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import UsersLogin from '../components/Users/Login/';
import UsersRegister from '../components/Users/Register/';
const GeneralRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route path='/register'>
          <UsersRegister />
        </Route>
        <Route path='/'>
          <UsersLogin />
        </Route>
      </Switch>
    </Router>
  );
};

export default GeneralRoutes;
