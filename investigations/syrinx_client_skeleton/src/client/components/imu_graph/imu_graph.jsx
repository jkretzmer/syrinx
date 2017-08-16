/*
 * Copyright (C) 2011-2017 Swift Navigation Inc.
 * Contact: Johannes Walter <johannes@swift-nav.com>
 *
 * This source is subject to the license found in the file 'LICENSE' which must
 * be be distributed together with this source. All other rights reserved.
 *
 * THIS CODE AND INFORMATION IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND,
 * EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A PARTICULAR PURPOSE.
 */

import React, { Component } from 'react';
import {connect} from 'react-redux'
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
import { getIMUData, makeGetFilteredSBPData } from '../../selectors/selectors.jsx'
import {updateGraphData} from '../../actions/action.jsx'
import sbpIMU from 'libsbp/javascript/sbp/imu';

const makeMapStateToProps = () => {
  const getFilteredSBPData = makeGetFilteredSBPData()
  const mapStateToProps = (state, props) => {
    return{
      imu_data: getFilteredSBPData(state, props),
      graph_data: state.graph_data
    }
  }
  return mapStateToProps
}

const rootMeanSquare = xs =>
  Math.sqrt(
    xs.reduce(
      (a, x) => (a + x * x),
      0
    ) / xs.length
  );

const IMUGraphConfig = () => {
  return{
    sbp_filter_list: [sbpIMU.MsgImuRaw.prototype.msg_type]
  }
}

const FlexibleXYPlot = makeWidthFlexible(XYPlot);

export class IMUGraph extends React.Component {
  constructor(props) {
    super(props);
    const {dispatch} = this.props;
    this.process = this.process.bind(this);
  }

  componentDidMount() {
    this.process();
    this.interval = setInterval(this.process.bind(this), 50);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  process() {
    const {dispatch, imu_data} = this.props;
    if (imu_data.length == 0) {
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

    update.acc_x = imu_data.map((msg, index) => {return {x: index, y:msg.acc_x}});
    update.acc_y = imu_data.map((msg, index) => {return {x: index, y:msg.acc_y}});
    update.acc_z = imu_data.map((msg, index) => {return {x: index, y:msg.acc_z}});

    update.gyr_x = imu_data.map((msg, index) => {return {x: index, y:msg.gyr_x}});
    update.gyr_y = imu_data.map((msg, index) => {return {x: index, y:msg.gyr_y}});
    update.gyr_z = imu_data.map((msg, index) => {return {x: index, y:msg.gyr_z}});

    dispatch(updateGraphData(update));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.graph_data !== this.props.graph_data
  }



  render() {
    const {graph_data} = this.props;
    /*
    if(graph_data === undefined){
      return(<div id="IMUGraph"></div>);
    }
    if(graph_data.len < 2){
      return(<div id="IMUGraph"></div>);
    }
*/

    const minValue = -30000;
    const maxValue = 30000;

    const yDomain = [0.98 * minValue, 1.02 * maxValue];

    let tickValues = [];
    /*if(!!graph_data[0].acc_x){
      tickValues = graph_data[0].acc_x.map(d => d.x);
    }*/
    //const tickValues = [];

    //const labelValues = makeLabelValues(graph_data[0]);
    const labelValues = [];

    let sf = 2.**(2 + 1) / 2.**15
    let rms_acc_x = 0;
    let rms_acc_y = 0;
    let rms_acc_z = 0;

    if (graph_data[0].acc_x === undefined)
    {
      console.log('acc_x undef')
    }
    else
      {
       rms_acc_x = sf * rootMeanSquare(graph_data[0].acc_x.map((msg) => {return msg.y}),2);
       rms_acc_y = sf * rootMeanSquare(graph_data[0].acc_y.map((msg) => {return msg.y}),2);
       rms_acc_z = sf * rootMeanSquare(graph_data[0].acc_z.map((msg) => {return msg.y}),2);
      }

    //self.rms_acc_x = sf * np.sqrt(np.mean(np.square(self.acc[:, 0])))

    return(
      <div id="IMUGraph">
        <div id="rms_acc_x">RMS Acceleration X: {rms_acc_x.toFixed(2)}</div>
        <div id="rms_acc_y">RMS Acceleration Y: {rms_acc_y.toFixed(2)}</div>
        <div id="rms_acc_z">RMS Acceleration Z: {rms_acc_z.toFixed(2)}</div>
        <div style={{
          background: 'white',
          borderRadius: '3px',
          height: '345px',
          position: 'relative',
          width: '100%'
        }}>
        <FlexibleXYPlot
          height={300}
          margin={{top: 5, bottom: 40, left: 50, right: 0}}
          yDomain={yDomain}
        >
          <LineSeries
            data={graph_data[0].acc_x}
            stroke='#3385FF'
            strokeWidth={2}
          />
          <LineSeries
            data={graph_data[0].acc_y}
            stroke='#FF5733'
            strokeWidth={2}
          />
          <LineSeries
            data={graph_data[0].acc_z}
            stroke='#FFD733'
            strokeWidth={2}
          />
          <LineSeries
            data={graph_data[0].gyr_x}
            stroke='#42f44b'
            strokeWidth={2}
          />
          <LineSeries
            data={graph_data[0].gyr_y}
            stroke='#c141f4'
            strokeWidth={2}
          />
          <LineSeries
            data={graph_data[0].gyr_z}
            stroke='#000000'
            strokeWidth={2}
          />

          <XAxis
            tickSize={4}
            tickValues={tickValues}
            labelValues={labelValues}
          />

          <YAxis
            tickSize={4}
          />
        </FlexibleXYPlot>
        </div>
      </div>
    );
  }
}

export default connect(makeMapStateToProps)(IMUGraph)
