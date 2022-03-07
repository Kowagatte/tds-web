const auth = require('./authentication')

class Packet{

  static Login = new Packet(1024, "Login", (body) =>{
    console.log(auth.authenticate(body.email, body.password))
    //console.log('1')
  })

  static CreateAccount = new Packet(1025, "CreateAccount", (body) =>{
    console.log(auth.addAccount(body.username, body.email, body.password))
    //console.log('2')
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
