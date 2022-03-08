import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { useEffect } from 'react';
import LoginPage from "./screens/login/loginpage";
import CreateAccountPage from "./screens/createaccount/createaccountpage";
import GamePage from "./screens/game/game";
import './App.css';
import {getSocket} from './socket';

function App() {

  useEffect(() =>{
    var socket = getSocket();
    if(socket){
      
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
