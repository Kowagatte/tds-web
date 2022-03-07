import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { useEffect } from 'react';
import LoginPage from "./screens/login/loginpage";
import CreateAccountPage from "./screens/createaccount/createaccountpage";
import GamePage from "./screens/game/game";
import './App.css';
import {sProvider} from './socket';

function App() {

  useEffect(() =>{
    var socket = sProvider.getSocket();
    if(socket){
      socket.onmessage = ({data}) => {
        console.log('Server: ', data)
      }
    }
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<LoginPage/>} />
            <Route path='/create-account' element={<CreateAccountPage/>}/>
            <Route path='/play' element={<GamePage/>}/>
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
