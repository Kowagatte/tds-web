import "./createaccountpage.css"
import {getSocket, addMessageHandler, removeMessageHandler} from '../../socket';
import React, {useEffect, useState,} from "react";
import {useNavigate} from "react-router-dom";
import {Packet} from "../../packet"

function CreateAccountPage() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  let navigate = useNavigate();


  useEffect(()=>{
    const handler = (data) => {
      var parsedData = JSON.parse(data)
      if(parsedData.id === 1){
        if(parsedData.body.code != 200){
          setError(parsedData.body.message)
          setSuccess('')
        }else{
          setError('')
          setSuccess('Account Created!')
        }
      }
    }

    addMessageHandler(handler)
    return () => removeMessageHandler(handler)
  })

  const handleSubmit = (evt) => {
      evt.preventDefault()
      if(username !== ""){

        if(email !== ""){

          if(password !== ""){

            if(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(password)){

              if(password === confirmPassword){

                getSocket().send(Packet.Construct(Packet.CreateAccount, {email:email, username:username, password:password}))
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
    navigate('/login');
  }

  return(
    <div className={'createaccountpage'}>
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
