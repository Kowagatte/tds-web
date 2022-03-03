const express = require('express');
const bodyParser = require('body-parser');
//I'm using mysql2 since I get a authorization error trying to connect to my SQL Server.
const mysql = require('mysql2')
const secret = require('./secret.json')

const PORT = 8080;
const HOST = '127.0.0.1';
const app = express();

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'tdsweb',
    password: secret.mysql
});

app.use(bodyParser.json());

app.use('/', express.static('../client/build'));

con.connect(function(err) {
    if (err) console.log(err);
    else{
        app.listen(PORT, HOST);
        console.log('SERVER RUNNING');
    }
});
