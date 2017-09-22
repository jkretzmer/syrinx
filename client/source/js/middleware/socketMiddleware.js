import socket_actions from 'actions/socket_actions.js';

const socketMiddleware = (function(){
  let socket = null;

  const onOpen = (ws,store,token) => evt => {
    //Send a handshake, or authenticate with remote end
    //Tell the store we're connected
    socket.send("SBP_JSON_REQ");
    store.dispatch(socket_actions.connected());
  }

  const onClose = (ws,store) => evt => {
    //Tell the store we've disconnected
    store.dispatch(socket_actions.disconnected());
  }

  const onMessage = (ws,store) => evt => {
    //Parse the JSON message received on the websocket
    let ws_output = evt.data.split('\0');
    let sbp_data = null;
    ws_output.map((sentence)=>{
      //console.log(sentence);
      try {
        sbp_data = JSON.parse(sentence);
      } catch (e) {
        //do nothing;
      }
      if (!!sbp_data) {
        //console.log(sbp_data);
        store.dispatch(socket_actions.messageReceived(sbp_data));
      }
    });
  }

  return store => next => action => {
    switch(action.type) {
      //The user wants us to connect
      case 'SBP_JSON_CONNECT':
        //Start a new connection to the server
        if(socket != null) {
          socket.close();
        }
        //Send an action that shows a "connecting..." status for now
        store.dispatch(socket_actions.connecting());

        //Attempt to connect (we could send a 'failed' action on error)

        try {
          socket = new WebSocket(action.url, action.protocol);
          socket.onmessage = onMessage(socket,store);
          socket.onclose = onClose(socket,store);
          socket.onopen = onOpen(socket,store,action.token);
        } catch (e) {
          socket = null;
          store.dispatch(socket_actions.disconnected());
        }

        break;

      //The user wants us to disconnect
      case 'SBP_JSON_DISCONNECT':
        if(socket != null) {
          socket.close();
        }
        socket = null;

        //Set our state to disconnected
        store.dispatch(socket_actions.disconnected());
        break;

      //Send the 'SBP_SEND_MSG' action down the websocket to the server
      case 'SBP_SEND_MSG':
        socket.send(JSON.stringify(action));
        break;

      //This action is irrelevant to us, pass it on to the next middleware
      default:
        return next(action);
    }
  }

})();

export default socketMiddleware
