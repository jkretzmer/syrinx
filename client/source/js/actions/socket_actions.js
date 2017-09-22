const SBP_JSON_CONNECT = 'SBP_JSON_CONNECT';
const SBP_JSON_CONNECTION = 'SBP_JSON_CONNECTION';
const SBP_JSON_DISCONNECT = 'SBP_JSON_DISCONNECT';
const SBP_SEND_MSG = 'SBP_SEND_MSG';
const SBP_JSON_MSG_RECEIVED = 'SBP_JSON_MSG_RECEIVED';

export const socket_actions = {
  SBP_JSON_CONNECT,
  SBP_JSON_DISCONNECT,
  SBP_JSON_CONNECTION,
  SBP_SEND_MSG,
  SBP_JSON_MSG_RECEIVED,

  connect: () =>({
    type: 'SBP_JSON_CONNECT',
    url: 'ws://10.1.23.5:5000',
    protocol: 'sbp-ws',
    token: '1'
  }),

  disconnect: () =>({
    type: 'SBP_JSON_DISCONNECT'
  }),

  connected: () => ({
      type: 'SBP_JSON_CONNECTION',
      status: 'connected'
  }),

  connecting: () => ({
      type: 'SBP_JSON_CONNECTION',
      status: 'connecting'
  }),

  disconnected: () => ({
      type: 'SBP_JSON_CONNECTION',
      status: 'disconnected'
  }),

  messageReceived: (msg) => ({
      type: 'SBP_JSON_MSG_RECEIVED',
      msg: msg
  })
}

export default socket_actions;
