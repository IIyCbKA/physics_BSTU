import './styles/style.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/home";
import Login from './pages/login';
import Test from "./pages/test";

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/disk/*" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/tests" element={<Test />} />
          </Routes>
      </Router>
  );
}

export default App;
