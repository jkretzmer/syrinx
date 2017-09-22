import React, { Component } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import syrinx_config from 'config/syrinx_config';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

const maxRefreshRateHz = 30;
const log_colors = ['danger','danger', 'danger', 'danger', 'warning', 'info', 'info', 'success']
/*0 EMERG
1 ALERT
2 CRIT
3 ERROR
4 WARN
5 NOTICE
6 INFO
7 DEBUG
*/

@connect(state => ({
  log_msgs: state.app[1025],
}))

export default class LogMonitor extends Component {
  static propTypes = {
    log_msgs: PropTypes.array,
    dispatch: PropTypes.func,
  }

  lastUpdateTime = null;
  maxRefreshRateMS = (1/maxRefreshRateHz) * 1000;
  log_data = [];

  constructor() {
    super();
    this.processData = this.processData.bind(this);
  }

  processData(nextProps) {
    const {dispatch, log_msgs} = this.props;
    if (nextProps.log_msgs.length == 0) {
      return;
    }
    this.log_data = nextProps.log_msgs.slice(0).reverse();
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('log will update');
    this.processData(nextProps);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let currentTime = Date.now();
    console.log(currentTime);
    console.log(this.lastUpdateTime);
    console.log(this.maxRefreshRateMS);
    if(!this.lastUpdateTime){
      this.lastUpdateTime = currentTime;
      console.log('setting first time');
      return true;
    } else if ((currentTime - this.lastUpdateTime) > this.maxRefreshRateMS) {
      this.lastUpdateTime = currentTime;
      return true;
    }
    console.log('should not update');
    return false;
  }

  render() {
    console.log('log render');
    const {log_msgs, dispatch} = this.props;

    let updateTime = [this.lastUpdateTime];
    let plot = <div/>;

    if(this.log_data.length > 0){

      let log_items = this.log_data.map((log_msg, index) => (
        <ListGroupItem bsStyle={log_colors[log_msg.level]} key={index}>{log_msg.text}</ListGroupItem>
      ));

      plot = <ListGroup>
        {log_items}
      </ListGroup>;
    }

    console.log(plot);

    return(
      <div id="LogMonitor">
        <div style={{ background: 'white', borderRadius: '3px', height: '345px',
          position: 'relative', width: '100%' }}>
          {plot}
        </div>
      </div>
    );
  }
}
