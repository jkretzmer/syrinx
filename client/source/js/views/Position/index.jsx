import React, { Component } from 'react';
import Helmet from 'react-helmet';
import syrinx_config from 'config/syrinx_config';
import BaselineGraph from 'components/Global/Graphs/BaselineGraph';

export default class Position extends Component {
  render() {
    return (
      <div className='Position'>
        <Helmet title="Position" />
        <h1>Position</h1>
        <hr />
        <h4>RTK Baseline</h4>
        <BaselineGraph/>
      </div>
    );
  }
}
