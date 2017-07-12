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
import { getIMUData } from '../../selectors/selectors.jsx'
import {updateGraphData} from '../../actions/action.jsx'

const mapStateToProps = (state) => {
  return {
      imu_data: getIMUData(state),
      graph_data: state.graph_data
    }
};

const FlexibleXYPlot = makeWidthFlexible(XYPlot);

export class TestVis extends React.Component {
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
    let data = imu_data || []

    if (data.length == 0) {
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

    update.acc_x = data.map((msg, index) => {return {x: index, y:msg.acc_x}});
    update.acc_y = data.map((msg, index) => {return {x: index, y:msg.acc_y}});
    update.acc_z = data.map((msg, index) => {return {x: index, y:msg.acc_z}});

    update.gyr_x = data.map((msg, index) => {return {x: index, y:msg.gyr_x}});
    update.gyr_y = data.map((msg, index) => {return {x: index, y:msg.gyr_y}});
    update.gyr_z = data.map((msg, index) => {return {x: index, y:msg.gyr_z}});

    dispatch(updateGraphData(update));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.graph_data !== this.props.graph_data  
  }

  render() {
    const {graph_data} = this.props;

    const minValue = -30000;
    const maxValue = 30000;

    const yDomain = [0.98 * minValue, 1.02 * maxValue];
    //const tickValues = graph_data[0].map(d => d.x);
    const tickValues = [];

    //const labelValues = makeLabelValues(graph_data[0]);
    const labelValues = [];
   
    return(
      <div id="TestVis">
        <div style={{
          background: 'white',
          borderRadius: '3px',
          height: '345px',
          position: 'relative',
          width: '100%'
        }}>
        <div style={{
          fontSize: 20,
          fontWeight: 500,
          lineHeight: '26px',
          marginBottom: 12,
          marginLeft: 40
        }}>TestVis</div>
        <FlexibleXYPlot
          height={300}
          margin={{top: 5, bottom: 0, left: 50, right: 0}}
          //onMouseLeave={() => this.props.highlightX(null)}
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

export default connect(mapStateToProps)(TestVis)
