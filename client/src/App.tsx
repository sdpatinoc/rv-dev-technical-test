import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateRoutes } from './containers/auth/Auth';
import { Main } from './containers/main/Main';
import { Login } from './containers/auth/Login';
import { Register } from './containers/auth/Register';

class App extends Component<{}> {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoutes/>}>
            <Route path="/" element={<Main/>}/>
          </Route>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
