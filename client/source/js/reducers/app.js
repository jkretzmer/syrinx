import {
  TEST_ACTION,
  TEST_ASYNC_ACTION_START,
  TEST_ASYNC_ACTION_ERROR,
  TEST_ASYNC_ACTION_SUCCESS,
} from 'actions/app.js';

import socket_actions from 'actions/socket_actions.js';
import sbp_msgs from 'libsbp/javascript/sbp/msg';

let additional_state = {
  counter: 0,
  asyncLoading: false,
  asyncError: null,
  asyncData: null,
  sbpConnectionStatus: null,
  lastMessage: null
};

let sbp_msg_state = {};
let sbp_buffer_size = {};

const defaultSBPBufferSize = 50;

for (let key of Object.keys(sbp_msgs.sbpMessageTypesTable)) {
  let msg_type = sbp_msgs.sbpMessageTypesTable[key].prototype.msg_type;
  sbp_msg_state[msg_type] = [];
  sbp_buffer_size[msg_type] = defaultSBPBufferSize;
}

sbp_buffer_size[2304] = 400;
sbp_buffer_size[524] = 1000;

const initialState = {...additional_state, ...sbp_msg_state};

const actionsMap = {
  [socket_actions.SBP_JSON_CONNECTION]: (state, action) => {
    return {
      ...state,
      sbpConnectionStatus: action.status
    }
  },

  [socket_actions.SBP_JSON_MSG_RECEIVED]: (state, action) => {
    if(action.msg == state.lastMessage) {
      return state;
    }
    let msg_type = action.msg.msg_type;
    if(!(state && state[msg_type])) {
      return state;
    } else if(state[msg_type].length >= sbp_buffer_size[msg_type]) {
      if(msg_type == 1025){
        console.log(action.msg);
      }
      return {
          ...state,
          lastMessage: action.msg,
          [msg_type]: [...state[msg_type].slice(1),
                    action.msg]
      }
    }
    else {
      if(msg_type == 1025){
        console.log(action.msg);
      }
      return {
          ...state,
          lastMessage: action.msg,
          [msg_type]: [...state[msg_type], action.msg]
      }
    }

    return state;
  },


  [TEST_ACTION]: (state) => {
    const counter = state.counter + 1;
    return {
      ...state,
      counter: counter
    };
  },

  // Async action
  [TEST_ASYNC_ACTION_START]: (state) => {
    return {
      ...state,
      asyncLoading: true,
      asyncError: null,
      asyncData: null
    }
  },

  [TEST_ASYNC_ACTION_ERROR]: (state, action) => {
    return {
      ...state,
      asyncLoading: false,
      asyncError: action.data
    }
  },

  [TEST_ASYNC_ACTION_SUCCESS]: (state, action) => {
    return {
      ...state,
      asyncLoading: false,
      asyncData: action.data
    }
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
