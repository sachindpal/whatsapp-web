import logo from './logo.svg';
// import './App.css';
import socketService from './helper';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import Login from './Login';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
        </Route>
        <Route path="/login" element={<Login />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
