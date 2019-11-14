import React from 'react';
import {UsersApi, RegisterBody, LoginBody} from './server'
import './App.css';
import Login from './components/Startpage/Login';

function App() {
  const usersAPI = new UsersApi();
  
  usersAPI.apiClient.authentications.token.apiKey = '<insert api token here>'
//  const register = new RegisterBody("mwerp001", "hallo");
//  usersAPI.authRegisterPost(register)
    const loginbody = new LoginBody("mwerp001", "hallo");
    const login = usersAPI.authLoginPost(loginbody);
    console.log(login);
  return (
    <div className="App">
      <Login></Login>

    </div>
  );
}

export default App;
