import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Pages/Home";
import Login from './Pages/Login';
import DataPage from './Pages/Data';

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/data" element={<DataPage />} />
          </Routes>
      </Router>
  );
}

export default App;
