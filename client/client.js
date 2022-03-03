const socket = new WebSocket('ws://127.0.0.1:8080');

socket.onmessage = ({ data }) => {
  console.log('Server: ', data);
};

document.getElementById('1').onclick = () => {
  socket.send('Something');
};
