import React, { Component } from 'react';
import Helmet from 'react-helmet';
import syrinx_config from 'config/syrinx_config';
import LogMonitor from 'components/Global/Graphs/LogMonitor';

export default class Status extends Component {
  render() {
    return (
      <div className='Status'>
        <Helmet title="Status" />
        <h1>Status</h1>
        <hr />
        <h4>Log</h4>
        <LogMonitor />
      </div>
    );
  }
}
