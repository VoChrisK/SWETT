import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import DashboardContainer from './dashboard/dashboard_container';
import Splash from './splash/splash';

const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
      <ProtectedRoute exact path="/dashboard" component={DashboardContainer} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <AuthRoute exact path="/" component={Splash} />
    </Switch>
  </div>
);

export default App;
