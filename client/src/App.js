import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoginPage from "./screens/login/loginpage";
import CreateAccountPage from "./screens/createaccount/createaccountpage";
import GamePage from "./screens/game/game";
import MainScreen from "./screens/mainscreen/mainscreen"
import './App.css';
import {getSocket, connectToServer} from './socket';
import gear from "./gear.svg";

function App() {

  const [connection, setConnection] = useState(0)

  const reconnect = () => {
    connectToServer()
    setConnection(0)
  }

  useEffect(()=>{
    var socket = getSocket()
    if(socket){
     socket.onopen = (event) =>{
       setConnection(socket.readyState)
     }

     socket.onerror = (event) =>{
       setConnection(socket.readyState)
       socket.close()
     }

     socket.onclose = (event) =>{
       setTimeout(reconnect, 2000)
     }
    }
    console.log(connection)
    console.log(socket)
 }, [connection]);

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
        {
          connection !== 1 &&
          <div className={'atr-page'}>
            <h1>Attempting to conenct to server.</h1>
            <img src={gear} className="gear-img" alt="gear"/>
          </div>
        }
      </header>
    </div>
  );
}

export default App;
