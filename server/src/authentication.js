const server = require('../server')
const packets = require('./packets')
const bcrypt = require('bcrypt');
const saltrounds = 10;

function authenticate(client, email, password) {
  server.con.query(`SELECT * from accounts where email=${server.con.escape(email)}`, function (error, results, fields) {
    if (error) throw error;
    if(results.length == 0){
      client.send(packets.Packet.Construct(packets.Packet.Response, {code: 404, message:"Account does not exist."}))
      //console.log((404, "Account does not exist."))
    }else{

      bcrypt.compare(password, results[0].password, function(err, result){
        if(err) return;
        if(result){
          server.clients.logInClient(client, results[0].username)
          client.send(packets.Packet.Construct(packets.Packet.Response, {code: 200, message:"Logged in."}))
          //console.log((200, "Logged in."))
        }else{
          client.send(packets.Packet.Construct(packets.Packet.Response, {code: 403, message:"Incorrect password."}))
          //console.log((403, "Incorrect password."))
        }
      })

    }
  });
}

function addAccount(client, username, email, password) {

  bcrypt.hash(password, saltrounds, function(err, hash) {

    if(err){console.log((500, "Failed to hash password.")); return;}

    var sqlStatement = `insert into accounts (username, email, password) values (${server.con.escape(username)}, ${server.con.escape(email)}, ${server.con.escape(hash)});`;
    server.con.query(sqlStatement, function (error, result) {
      if (error){
        if(error.code === 'ER_DUP_ENTRY'){
          console.log((409, error.sqlMessage))
          return
        }else{
          console.log(error)
          console.log((400, "Unknown Error Happened"))
          return
        }
      }else{
        console.log((200, "Account Successfully Created."))
        return
      }
    });
  });
}

function changeEmail(con, username, newemail) {

}

function changePassword(con, username, newpassword) {

}

function changeUsername() {
  //TODO
}

exports.authenticate = authenticate;
exports.addAccount = addAccount;
