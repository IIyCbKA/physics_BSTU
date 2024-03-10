import './styles/style.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Route, Navigate, BrowserRouter, Routes} from 'react-router-dom';
import Home from "./pages/home";
import Login from './pages/login';
import Test from "./pages/test";
import NotFound from "./pages/not_found";
import {useSelector} from "react-redux";


function App() {
    const isAuth = useSelector(state => state.user.isAuth)

    return (
        <BrowserRouter>
            {!isAuth &&
                <Routes>
                    <Route path="*" element={<Navigate to="/login" />}/>
                    <Route path="/login" element={<Login />} />
                </Routes>
            }

            {isAuth &&
                <Routes>
                    <Route path="/disk/*" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/tests" element={<Test />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            }
        </BrowserRouter>
    );
}


export default App;