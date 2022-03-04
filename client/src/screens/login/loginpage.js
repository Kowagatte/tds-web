import "./loginpage.css"
import {sProvider} from '../../socket';
import React, {useEffect, useState,} from "react";
import {useNavigate} from "react-router-dom";

function LoginPage() {
  const [socket, setSocket] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  let navigate = useNavigate();


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
      if(email !== ""){
        if(password !== ""){
          socket.send(JSON.stringify({email:email, password:password}))
        }else{
          setError('You must provide a password.')
        }
      }else{
        setError('You must provide a email.')
      }
      socket.send('trying to login')
      //Do something
  }

  const createAccountClick = () => {
    console.log("wants to create account")
    navigate('/create-account');
  }

  return(
    <div>
        <h1>TopDownShooter</h1>
        <form onSubmit={handleSubmit}>
            <label>Email:</label><br/>
            <input type={'text'} value={email} onChange={e => setEmail(e.target.value)}/><br/>
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
