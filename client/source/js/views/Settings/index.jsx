import React, { Component } from 'react';
import Helmet from 'react-helmet';
import syrinx_config from 'config/syrinx_config';


export default class Settings extends Component {
  render() {
    return (
      <div className='Settings'>
        <Helmet title="Settings" />
        <h1>Settings</h1>
        <hr />
        <h4>Settings components</h4>
      </div>
    );
  }
}
