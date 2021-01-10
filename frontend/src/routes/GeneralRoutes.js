import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import UsersLogin from '../components/Users/Login/';

const GeneralRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route path='/'>
          <UsersLogin />
        </Route>
      </Switch>
    </Router>
  );
};

export default GeneralRoutes;
