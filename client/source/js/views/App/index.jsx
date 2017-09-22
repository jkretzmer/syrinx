import React, { Component } from 'react';
import Routes from 'config/routes';
import Helmet from 'react-helmet';
import Menu_NavBar from 'components/Global/Menu_NavBar';
import NetworkManager from 'components/Global/NetworkManager';

import syrinx_config from 'config/syrinx_config';

export default class App extends Component {
  render() {
    return (
      <div className='container'>
        <NetworkManager />
        <Helmet {...syrinx_config.app.head} />
        <Menu_NavBar/>
        <div style={{height: 66+'px'}} />
        <div className='container' role="main">
          <Routes />
        </div>
      </div>
    );
  }
}
