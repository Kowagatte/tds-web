import "./loginpage.css"
import {sProvider} from '../../socket';
import React, {useEffect, useState,} from "react";

function LoginPage() {
  const [socket, setSocket] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  //let navigate = useNavigate();


  useEffect(() =>{
    var parentSocket = sProvider.getSocket();
    if(parentSocket){
      parentSocket.onmessage = ({data}) => {
        console.log('Server: ', data)
      }
      setSocket(parentSocket)
    }
  }, []);


  const handleSubmit = (evt) => {
      evt.preventDefault()
      console.log("Attempted to login")
      if(username !=== ""){
        if(password !=== ""){
          if(/^([a-z0-9]{5,})$/.test('abc1')){
            
          }else{
            setError('not a valid password')
          }
        }
      }
      socket.send('trying to login')
      //Do something
  }

  const createAccountClick = () => {
    console.log("wants to create account")
  }

  return(
    <div>
        <h1>TopDownShooter</h1>
        <form onSubmit={handleSubmit}>
            <label>Username:</label><br/>
            <input type={'text'} value={username} onChange={e => setUsername(e.target.value)}/><br/>
            <label>Password:</label><br/>
            <input type={'password'} value={password} onChange={ e => setPassword(e.target.value)}/><br/>
            <input type={'submit'} value={'Login'}/>
        </form>
        <button onClick={createAccountClick}>Create Account</button>
        <div id={'error'}>{error}</div>
    </div>
  );

}

export default LoginPage;
