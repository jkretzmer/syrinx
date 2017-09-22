import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import socket_actions from 'actions/socket_actions';


@connect(state => ({
  sbpConnectionStatus: state.sbpConnectionStatus,
}))

/* The NetworkContainer Component issues actions to set up,
 * maintain, and tear down the websocket connection.
 */
export default class NetworkManager extends Component {
  static propTypes = {
    sbpConnectionStatus: PropTypes.string,
    dispatch: PropTypes.func,
  }

  constructor() {
    super();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('NetworkingContainer: componentWillReceiveProps');
    const { dispatch, sbpConnectionStatus } = this.props;
    if(sbpConnectionStatus == 'disconnected' ||
        !sbpConnectionStatus ) {
      dispatch(socket_actions.connect());
    }
  }

  componentWillMount() {
    const { dispatch, sbpConnectionStatus } = this.props;
    if(sbpConnectionStatus == 'disconnected' ||
        !sbpConnectionStatus ) {
      dispatch(socket_actions.connect());
    }
  }

  componentWillUnmount() {
    const { dispatch, sbpConnectionStatus } = this.props;
    if(sbpConnectionStatus == 'connected') {
      dispatch(socket_actions.disconnect());
    }
  }

  render() {
    return (
      <div className='NetworkContainer'></div>
    );
  }
}
