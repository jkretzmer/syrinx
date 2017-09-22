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
import sbpIMU from 'libsbp/javascript/sbp/imu';
import Helmet from 'react-helmet';
import syrinx_config from 'config/syrinx_config';

const FlexibleXYPlot = makeWidthFlexible(XYPlot);
const maxRefreshRateHz = 30;

@connect(state => ({
  imu: state.app[2304],
}))

export default class IMUGraph extends Component {
  static propTypes = {
    imu: PropTypes.array,
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
    const {dispatch, imu} = this.props;
    if (imu.length == 0) {
      return;
    }

    let update =
      {
        acc_x: [],
        acc_y: [],
        acc_z: [],
        gyr_x: [],
        gyr_y: [],
        gyr_z: []
      }

    update.acc_x = imu.map((msg, index) => {return {x: index, y:msg.acc_x}});
    update.acc_y = imu.map((msg, index) => {return {x: index, y:msg.acc_y}});
    update.acc_z = imu.map((msg, index) => {return {x: index, y:msg.acc_z}});

    update.gyr_x = imu.map((msg, index) => {return {x: index, y:msg.gyr_x}});
    update.gyr_y = imu.map((msg, index) => {return {x: index, y:msg.gyr_y}});
    update.gyr_z = imu.map((msg, index) => {return {x: index, y:msg.gyr_z}});

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
      console.log('setting first time');
    } else if ((currentTime - this.lastUpdateTime) > this.maxRefreshRateMS) {
      this.lastUpdateTime = currentTime;
      return true;
    }
    return false;
  }

  render() {
    const {imu, dispatch} = this.props;
    const minValue = -30000;
    const maxValue = 30000;
    const yDomain = [0.98 * minValue, 1.02 * maxValue];
    let tickValues = [];
    const labelValues = [];

    let updateTime = [this.lastUpdateTime];
    let plot = <div/>;

    if(Object.keys(this.graph_data).length > 0){

      let acceleration_series = [
        { name: 'acc_x', label: 'Acceleration X', data: this.graph_data.acc_x, stroke: '#3385FF',
           strokeWidth: 2, enabled: true },
        { name: 'acc_y', label: 'Acceleration Y', data: this.graph_data.acc_y, stroke: '#FF5733',
           strokeWidth: 2, enabled: true },
        { name: 'acc_z', label: 'Acceleration Z', data: this.graph_data.acc_z, stroke: '#FFD733',
           strokeWidth: 2, enabled: true },
      ];

      let gyro_series = [
        { name: 'gyr_x', label: 'Gryo X', data: this.graph_data.gyr_x, stroke: '#42F44b',
           strokeWidth: 2, enabled: true },
        { name: 'gyr_y', label: 'Gyro Y', data: this.graph_data.gyr_y, stroke: '#C141F4',
           strokeWidth: 2, enabled: true },
        { name: 'gyr_z', label: 'Gyro Z', data: this.graph_data.gyr_z, stroke: '#000000',
           strokeWidth: 2, enabled: true },
      ];

      let acc_line_series = acceleration_series.map(line => (
        <LineSeries data={line.data} stroke={line.stroke} strokeWidth={line.strokeWidth} key={line.name}/>
      ));

      let gyr_line_series = gyro_series.map(line => (
        <LineSeries data={line.data} stroke={line.stroke} strokeWidth={line.strokeWidth} key={line.name}/>
      ));

      plot = <FlexibleXYPlot height={300} margin={{top: 5, bottom: 40,
            left: 50, right: 0}} yDomain={yDomain}>
              {acc_line_series}
              {gyr_line_series}
            <XAxis tickSize={4} tickValues={tickValues} labelValues={labelValues} />
            <YAxis tickSize={4} />
          </FlexibleXYPlot>;
    }

    return(
      <div id="IMUGraph">
        <div style={{ background: 'white', borderRadius: '3px', height: '345px',
          position: 'relative', width: '100%' }}>
          {plot}
        </div>
      </div>
    );
  }
}
