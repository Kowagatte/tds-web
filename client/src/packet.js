export class Packet{
  static Login = new Packet(1024, "Login", () =>{})
  static CreateAccount = new Packet(1025, "CreateAccount", () =>{})

  constructor(id, name, callback){
    this.id = id;
    this.name = name;
    this.callback = callback;
  }

  static Construct(packet, body) {
    return JSON.stringify({id:packet.id, body:body})
  }

}
