import React, { Component } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  HorizontalGridLines,
  LineSeries,
  makeWidthFlexible,
  MarkSeries,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis
} from 'react-vis';

import Helmet from 'react-helmet';
import syrinx_config from 'config/syrinx_config';

const FlexibleXYPlot = makeWidthFlexible(XYPlot);
const maxRefreshRateHz = 30;

@connect(state => ({
  baseline_ned_msgs: state.app[524],
}))

export default class BaselineGraph extends Component {
  static propTypes = {
    baseline_ned_msgs: PropTypes.array,
    dispatch: PropTypes.func,
  }

  lastUpdateTime = null;
  maxRefreshRateMS = (1/maxRefreshRateHz) * 1000;
  graph_data = {};

  constructor() {
    super();

    this.processData = this.processData.bind(this);
  }

  processData() {
    const {dispatch, baseline_ned_msgs} = this.props;
    if (baseline_ned_msgs.length == 0) {
      return;
    }

    let update =
      {
        baseline: []
      }

    update.baseline = baseline_ned_msgs.map((msg, index) => {return {x: msg.e, y:msg.n, time:msg.tow}});
    this.graph_data = update;
  }

  componentWillUpdate(nextProps, nextState) {
    this.processData();
  }

  shouldComponentUpdate(nextProps, nextState) {
    let currentTime = Date.now();
    let diff = (currentTime - this.lastUpdateTime);
    if(!this.lastUpdateTime){
      this.lastUpdateTime = currentTime
      return true;
    } else if ((currentTime - this.lastUpdateTime) > this.maxRefreshRateMS) {
      this.lastUpdateTime = currentTime;
      return true;
    }
    return false;
  }

  render() {
    const {baseline_ned_msgs, dispatch} = this.props;
    let minValue = -110000;
    let maxValue = 110000;
    let yDomain = [0.98 * minValue, 1.02 * maxValue];
    let xDomain = [0.98 * minValue, 1.02 * maxValue];
    let tickValues = [];
    const labelValues = [];

    let updateTime = [this.lastUpdateTime];
    let plot = <div/>;

    if(Object.keys(this.graph_data).length > 0){

      let baseline_series = [
        { name: 'baseline', label: 'RTK Baseline', data: this.graph_data.baseline, stroke: '#FFA500',
           strokeWidth: 2, enabled: true },
         ];

      let baseline_data = baseline_series.map(line => (
        <LineSeries data={line.data} stroke={line.stroke} strokeWidth={line.strokeWidth} key={line.name}/>
      ));


      plot = <FlexibleXYPlot height={300} margin={{top: 5, bottom: 40,
            left: 50, right: 0}} yDomain={yDomain} xDomain={xDomain}>
              {baseline_data}
            <XAxis tickSize={4} tickValues={tickValues} labelValues={labelValues} />
            <YAxis tickSize={4} />
          </FlexibleXYPlot>;
    }

    return(
      <div id="BaselineGraph">
        <div style={{ background: 'white', borderRadius: '3px', height: '345px',
          position: 'relative', width: '100%' }}>
          {plot}
        </div>
      </div>
    );
  }
}
