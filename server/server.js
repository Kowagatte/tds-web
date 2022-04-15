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
const HOST = '192.168.0.14';
const app = express();

//Database connection
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'tdsweb',
    password: secret.mysql
});

//Websocket connection
const wss = new WebSocket.Server({ host: '192.168.0.14', port: 8888 });


//Express Junk
app.use(bodyParser.json());

app.use(express.static("../client/build"))

app.get('*', (req, res)=>{
  res.sendFile(path.resolve('..', 'client', 'build', 'index.html'))
})

class Clients{
  constructor(){
    this.clientList = {};
    this.saveClient = this.saveClient.bind(this);
    this.logInClient = this.logInClient.bind(this);
    this.logOutClient = this.logOutClient.bind(this);
    this.disconnect = this.disconnect.bind(this);
  }
  saveClient(client){
    this.clientList[client] = 'Guest';
  }
  logInClient(client, account){
    this.clientList[client] = account;
  }
  logOutClient(client, account){
    this.clientList[client] = 'Guest';
  }
  disconnect(client){
    delete this.clientList[client];
  }
}

const clients = new Clients();

wss.on('connection', (client) =>{
  client.on('message', (msg) =>{

    console.log(clients.clientList[client] + ': %s', msg)

    var data = JSON.parse(msg)
    if(data.id in packetDict){
      packetDict[data.id].execute(client, data.body)
    }
  });

  client.on('close', (reasonCode, description)=>{
    console.log((new Date()) + ' Peer ' + clients.clientList[client] + ' disconnected.');
  })

  clients.saveClient(client)
  console.log('Client Connected.')
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

exports.con = con;
exports.clients = clients;
