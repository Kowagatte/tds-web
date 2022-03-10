import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoginPage from "./screens/login/loginpage";
import CreateAccountPage from "./screens/createaccount/createaccountpage";
import GamePage from "./screens/game/game";
import MainScreen from "./screens/mainscreen/mainscreen"
import './App.css';
import {getSocket} from './socket';

function App() {

  const [connection, setConnection] = useState(0)

   useEffect(()=>{
     var socket = getSocket()
     if(socket){
       socket.onopen = (event) =>{
         setConnection(socket.readyState)
       }

       socket.onerror = (event) =>{
         setConnection(socket.readyState)
       }
     }
   }, []);

  return (
    <div className="App">
      <header className="App-header">
        { connection === 1 &&
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<MainScreen/>}/>
              <Route path='/login' element={<LoginPage/>} />
              <Route path='/create-account' element={<CreateAccountPage/>}/>
              <Route path='/play' element={<GamePage/>}/>
            </Routes>
          </BrowserRouter>
        }
        { connection !== 1 &&
          <div>
            <h1>Couldn't connect to the server.</h1>
          </div>
        }
      </header>
    </div>
  );
}

export default App;
