/*
 * Copyright (C) 2011-2017 Swift Navigation Inc.
 * Contact: Josh Kretzmer <jkretzmer@swiftnav.com>
 *
 * This source is subject to the license found in the file 'LICENSE' which must
 * be be distributed together with this source. All other rights reserved.
 *
 * THIS CODE AND INFORMATION IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND,
 * EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A PARTICULAR PURPOSE.
 */

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import App from './components/app/app.jsx';

const routes = () => (
  <Router>
    <Switch>
      <Route path="/" component={App}/>
    </Switch>
  </Router>
);

export default routes;
