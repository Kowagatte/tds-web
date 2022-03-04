import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { useEffect } from 'react';
import LoginPage from "./screens/login/loginpage";
import CreateAccountPage from "./screens/createaccount/createaccountpage"
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
        <p>
          <BrowserRouter>
            <Routes>
              <Route exact path='/' element={<LoginPage/>} />
              <Route path='/create-account' element={<CreateAccountPage/>}/>
            </Routes>
          </BrowserRouter>
        </p>
      </header>
    </div>
  );
}

export default App;
