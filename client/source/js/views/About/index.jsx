import React, { Component } from 'react';
import Helmet from 'react-helmet';
import syrinx_config from 'config/syrinx_config';

export default class About extends Component {
  render() {
    return (
      <div className='About'>
        <Helmet title="About" />
        <h1>About</h1>
        <hr />
        <h4>Name: {syrinx_config.app.title}</h4>
        <h4>Support: <a href="https://support.swiftnav.com/">Support Portal</a></h4>
      </div>
    );
  }
}
