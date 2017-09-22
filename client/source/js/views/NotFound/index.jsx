import React, { Component } from 'react';
import Helmet from 'react-helmet';
import RouteStatus from 'components/Global/RouteStatus';
import syrinx_config from 'config/syrinx_config';

export default class NotFound extends Component {
  render() {
    return (
      <RouteStatus code={ 404 }>
        <div className='NotFound'>
          <Helmet title="404 - Not Found" />
          <h1>404 - Not Found</h1>
        </div>
      </RouteStatus>
    );
  }
}
