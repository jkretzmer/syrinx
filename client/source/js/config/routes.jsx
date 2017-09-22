import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Status from 'views/Status';
import Position from 'views/Position';
import IMU from 'views/IMU';
import Settings from 'views/Settings';
import About from 'views/About';
import Dashboard from 'views/Dashboard';
import NotFound from 'views/NotFound';

const publicPath = '/';

export const routeCodes = {
  STATUS: publicPath,
  POSITION: `${ publicPath }position`,
  IMU: `${ publicPath }imu`,
  SETTINGS: `${ publicPath }settings`,
  ABOUT: `${ publicPath }about`,
  DASHBOARD: `${ publicPath }dashboard`,
};

export default () => (
  <Switch>
    <Route exact path={ publicPath } component={ Status } />
    <Route path={ routeCodes.POSITION } component={ Position } />
    <Route path={ routeCodes.IMU } component={ IMU } />
    <Route path={ routeCodes.SETTINGS } component={ Settings } />
    <Route path={ routeCodes.ABOUT } component={ About } />
    <Route path={ routeCodes.Dashboard } component={ Dashboard } />
    <Route path='*' component={ NotFound } />
  </Switch>
);
