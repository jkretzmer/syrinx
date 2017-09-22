import React, { Component } from 'react';
import IMUGraph from 'components/Global/Graphs/IMUGraph';
import Helmet from 'react-helmet';
import syrinx_config from 'config/syrinx_config';

export default class About extends Component {
  render() {
    return (
      <div className='IMU'>
        <Helmet title="IMU" />
        <h1>IMU</h1>
        <hr />
        <IMUGraph />
      </div>
    );
  }
}
