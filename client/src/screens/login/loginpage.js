import "./loginpage.css"
import {getSocket, addMessageHandler, removeMessageHandler} from '../../socket';
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Packet} from "../../packet"

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  let navigate = useNavigate();

   useEffect(()=>{
     const handler = (data) => {
       var parsedData = JSON.parse(data)
       if(parsedData.id === 1){
         if(parsedData.body.code !== 200){
           setError(parsedData.body.message)
         }else{
           //parsedData.body.details contains information for profile badge
           navigate('/', {state: parsedData.body.details})
         }
       }
       console.log(data)
     }

     addMessageHandler(handler)
     return () => removeMessageHandler(handler)
   })


  const handleSubmit = (evt) => {
      evt.preventDefault()
      console.log("Attempted to login")
      if(email !== ""){
        if(password !== ""){
          getSocket().send(Packet.Construct(Packet.Login, {email:email, password:password}))
        }else{
          setError('You must provide a password.')
        }
      }else{
        setError('You must provide a email.')
      }
  }

  const createAccountClick = () => {
    console.log("wants to create account")
    navigate('/create-account');
  }

  return(
    <div className={'loginpage'}>
        <h1>TopDownShooter</h1>
        <form id={'login-form'} onSubmit={handleSubmit}>
            <div id={'email-field'}>
              <label>Email:</label><br/>
              <input className={'field'} type={'text'} value={email} onChange={e => setEmail(e.target.value)}/><br/>
            </div>
            <div id={'password-field'}>
              <label>Password:</label><br/>
              <input type={'password'} value={password} onChange={ e => setPassword(e.target.value)}/><br/>
            </div>
            <input type={'submit'} value={'Login'}/>
        </form>
        <button onClick={createAccountClick}>Create Account</button>
        <div id={'error'}>{error}</div>
    </div>
  );

}

export default LoginPage;
