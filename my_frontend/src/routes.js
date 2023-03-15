import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import HomeContainer from './containers/homeContainer'
import HouseContainer from './containers/houseContainer'
import LoginContainer from './containers/loginContainer'
import FormContainer from './containers/formContainer'
import history from './history'

const Routes = () => (
  <div className="content">
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={LoginContainer} />
        <Route path="/home"
          component={HomeContainer}
        />
        <Route path="/house"
          component={HouseContainer}
        />
        <Route path="/form"
          component={FormContainer}
        />
      </Switch>
    </Router>
  </div>
);

export default Routes;
