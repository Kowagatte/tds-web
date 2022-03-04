import "./createaccountpage.css"
import {sProvider} from '../../socket';
import React, {useEffect, useState,} from "react";
import {useNavigate} from "react-router-dom";

function CreateAccountPage() {
  const [socket, setSocket] = useState(null)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
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
      if(username !== ""){

        if(email !== ""){

          if(password !== ""){

            if(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(password)){

              if(password === confirmPassword){

                setError('')
                setSuccess('Account Created!')
                socket.send(JSON.stringify({email:email, username:username, password:password}))
                return;

              }else{
                setError('Passwords do not match.')
              }

            }else{
              setError('not a valid password')
            }
          }else{
            setError('You must provide a password.')
          }

        }else{
          setError('You must provide a email.')
        }

      }else{
        setError('You must provide a username.')
      }
      setSuccess('')
  }

  const loginClick = () => {
    console.log("wants to create account")
    navigate('/');
  }

  return(
    <div>
        <h1>TopDownShooter</h1>
        <form onSubmit={handleSubmit}>
            <label>Username:</label><br/>
            <input type={'text'} value={username} onChange={e => setUsername(e.target.value)}/><br/>
            <label>Email:</label><br/>
            <input type={'text'} value={email} onChange={e => setEmail(e.target.value)}/><br/>
            <label>Password:</label><br/>
            <input type={'password'} value={password} onChange={ e => setPassword(e.target.value)}/><br/>
            <label>Confirm Password:</label><br/>
            <input type={'password'} value={confirmPassword} onChange={ e => setConfirmPassword(e.target.value)}/><br/>
            <input type={'submit'} value={'Create Account'}/>
        </form><br/>
        Already have an account? <button onClick={loginClick}>Login</button>
        <div id={'error'}>{error}</div>
        <div id={'success'}>{success}</div>
    </div>
  );

}

export default CreateAccountPage;
