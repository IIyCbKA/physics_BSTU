import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Pages/Home";
import Login from './Pages/Login';
import Test from "./Pages/Test";
import React from 'react';

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/tests" element={<Test />} />
          </Routes>
      </Router>
  );
}

export default App;
