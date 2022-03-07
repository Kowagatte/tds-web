const express = require('express');
const bodyParser = require('body-parser');
//I'm using mysql2 since I get a authorization error trying to connect to my SQL Server.
const mysql = require('mysql2')
const secret = require('./secret.json')
const WebSocket = require('ws');
const path = require('path');
const packets = require('./src/packets')

//Server details
const PORT = 8080;
const HOST = '127.0.0.1';
const app = express();

//Database connection
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'tdsweb',
    password: secret.mysql
});

//Websocket connection
const wss = new WebSocket.Server({ port: 8888 });


//Express Junk
app.use(bodyParser.json());

app.use(express.static("../client/build"))

app.get('*', (req, res)=>{
  res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
})


//Socket Junk
wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    var parsedData = JSON.parse(data)
    if(parsedData.id in packetDict){
      packetDict[parsedData.id].execute(parsedData.body)
    }
    console.log('received: %s', data);
  });

  ws.send('Connection Established.');
});


const packetDict = {}

//Starting the server.
con.connect(function(err) {
    if (err) console.log(err);
    else{

      Object.keys(packets.Packet).forEach(packet => {
        packetDict[packets.Packet[packet].id] = packets.Packet[packet]
      });

      app.listen(PORT, HOST);
      console.log('SERVER RUNNING');

    }
});

exports.con = con
