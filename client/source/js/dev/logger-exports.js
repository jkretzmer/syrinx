import { createLogger } from 'redux-logger';
import { Map } from 'immutable';
import socket_actions from 'actions/socket_actions.js';

// Redux logger
const logger = createLogger({
  predicate: (getState, action) => {
    action.type !== socket_actions.SBP_JSON_MSG_RECEIVED
  }
});

export default logger;
