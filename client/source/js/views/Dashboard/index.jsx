import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { testAction, testAsync } from 'actions/app';
import socket_actions from 'actions/socket_actions';
import Helmet from 'react-helmet';

@connect(state => ({
  asyncData: state.app.asyncData,
  asyncError: state.app.asyncError,
  asyncLoading: state.app.asyncLoading,
  counter: state.app.counter,
  sbpConnectionStatus: state.app.sbpConnectionStatus,
}))

export default class Dashboard extends Component {
  static propTypes = {
    asyncData: PropTypes.string,
    asyncError: PropTypes.object,
    asyncLoading: PropTypes.bool,
    counter: PropTypes.number,
    sbpConnectionStatus: PropTypes.string,
    // from react-redux connect
    dispatch: PropTypes.func,
  }

  constructor() {
    super();

    this.handleAsyncButtonClick = this.handleAsyncButtonClick.bind(this);
    this.handleTestButtonClick = this.handleTestButtonClick.bind(this);
    this.handleConnectButtonClick = this.handleConnectButtonClick.bind(this);
  }

  handleConnectButtonClick() {
    const { dispatch } = this.props;

    dispatch(socket_actions.connect());
  }

  handleAsyncButtonClick() {
    const { dispatch } = this.props;

    dispatch(testAsync());
  }

  handleTestButtonClick() {
    const { dispatch } = this.props;

    dispatch(testAction());
  }

  render() {
    const {
      asyncData,
      asyncError,
      asyncLoading,
      counter,
      sbpConnectionStatus,
    } = this.props;

    return (
      <div className='Status'>
        <Helmet title="Status" />
        <h1>Status</h1>

        <h3>Connection</h3>
        <div className='Example'>
          { sbpConnectionStatus &&
            <p>
              SBP Connection Status: { sbpConnectionStatus }<br />
            </p> }
          <button onClick={ this.handleConnectButtonClick }>
            Connect
          </button>
        </div>

        <h3>Synchronous action</h3>
        <div className='Example'>
          <p>Counter: { counter }</p>
          <button onClick={ this.handleTestButtonClick }>
            Increase
          </button>
        </div>

        <h3>Async action example</h3>
        <div className='Example'>
          { asyncData &&
            <p>
              Date: { asyncData.date }<br />
              Time: { asyncData.time }<br />
              Miliseconds since epoch: { asyncData.milliseconds_since_epoch }
            </p> }
          { asyncLoading && <p>Loading...</p> }
          { asyncError && <p>Error: { asyncError }</p> }
          <button
            disabled={ asyncLoading }
            onClick={ this.handleAsyncButtonClick }
          >
            Get async data
          </button>
        </div>

      </div>
    );
  }
}
