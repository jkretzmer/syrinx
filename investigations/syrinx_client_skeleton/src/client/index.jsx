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
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

import './sass/main.scss';

import Routes from './routes.jsx'
import reducer from './reducers/reducer.jsx'

const app = document.getElementById('root')

const store = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
	<Provider store={store}>	
		<Routes/>
	</Provider>
	, app);