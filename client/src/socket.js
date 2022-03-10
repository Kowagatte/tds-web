const messageHandlers = new Set()

export const connectToServer = () => {
  socket = new WebSocket('ws://127.0.0.1:8888');
  socket.onmessage = ({data}) => {
    messageHandlers.forEach((handler) => handler(data))
  }
}

export const addMessageHandler = (handler) => {
  messageHandlers.add(handler)
}

export const removeMessageHandler = (handler) =>{
  messageHandlers.delete(handler)
}

export function getSocket() {
  return socket
}

var socket = null;
connectToServer()

//exports.sProvider = sProvider;
