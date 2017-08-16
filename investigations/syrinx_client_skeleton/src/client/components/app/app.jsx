/*
 * Copyright (C) 2011-2017 Swift Navigation Inc.
 * Contact: Josh Kretzmer <jkretzmer@swiftnav.com>
 *
 * This source is subject to the license found in the file 'LICENSE' which must
 * be be distributed together with this source. All other rights reserved.
 *
 * THIS CODE AND INFORMATION IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND,
 * EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A PARTICULAR PURPOSE.
 */

import React from 'react';
import ReactDOM from "react-dom"
import {connect} from 'react-redux'
import {startSBPStream,bufferSBPData} from '../../actions/action.jsx'
import { Route, Switch, Redirect } from 'react-router-dom'

import IMUGraph from '../imu_graph/imu_graph.jsx'
import sbpIMU from 'libsbp/javascript/sbp/imu';


let socket;

const mapStateToProps = (state) => {
  return {
      sbp_data: state.sbp_data
    };
};

export class App extends React.Component {
  constructor(props)
  {
    super(props);
    const {dispatch} = this.props;

    socket = new WebSocket("ws://10.1.23.5:5000", "sbp-ws");
    console.dir(socket);

    dispatch(startSBPStream(socket));

    socket.onmessage = (packet)=>{
      let json_output = packet.data.split('\0');
      json_output.map((sentence)=>{
        if(sentence.length > 0) {
          console.log(sentence);
          dispatch(bufferSBPData(JSON.parse(sentence)));
        }
      });
    }
  }

  componentWillUnmount(){
    socket.onclose = function (){};
    socket.close();
    console.log('Socket will disconnect');
  }

  render() {
    const {dispatch, sbp_data} = this.props;
    return (
      <div className="app">
        <div className="container-fluid app-content">
            <IMUGraph sbp_filter={[sbpIMU.MsgImuRaw.prototype.msg_type]}/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App)
