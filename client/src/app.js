import './styles/style.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes, Navigate }
    from 'react-router-dom';
import Home from "./pages/home";
import Login from './pages/login';
import Test from "./pages/test";
import NotFound from "./pages/not_found";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/disk/" />} />
                <Route path="/disk/*" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/tests" element={<Test />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}


export default App;