const auth = require('./authentication')

class Packet{

  static Response = new Packet(1, "Response", () =>{})

  static Login = new Packet(1024, "Login", (client, body) =>{
    auth.authenticate(client, body.email, body.password)
  })

  static CreateAccount = new Packet(1025, "CreateAccount", (client, body) =>{
    auth.addAccount(client, body.username, body.email, body.password)
  })

  constructor(id, name, execute){
    this.id = id;
    this.name = name;
    this.execute = execute;
  }

  static Construct(packet, body) {
    return JSON.stringify({id:packet.id, body:body})
  }

}

exports.Packet = Packet
