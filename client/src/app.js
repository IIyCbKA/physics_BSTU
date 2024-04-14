import {Route, Navigate, BrowserRouter, Routes} from 'react-router-dom';
import Home from "./pages/home";
import Login from './pages/login';
import Test from "./pages/test";
import NotFound from "./pages/not_found";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {auth} from "./actions/user";
import Account from "./pages/account";


function App() {
    const isAuth = useSelector(state => state.user.isAuth)
    const [isWaiting, setIsWaiting] = useState(true)
    const dispatch = useDispatch()

    const [orientation, setOrientation] = useState(window.matchMedia(
        "(orientation: portrait)").matches ? "portrait" : "landscape");

    useEffect(() => {
        const waitFunc = async () => {
            await dispatch(auth())
            setIsWaiting(false)
        }

        waitFunc()
    }, [dispatch])

    useEffect(() => {
        const handleOrientationChange = () => {
            setOrientation(window.matchMedia("(orientation: portrait)").matches
                ? "portrait" : "landscape");
        };

        window.addEventListener("orientationchange", handleOrientationChange);

        return () => {
            window.removeEventListener("orientationchange",
                handleOrientationChange);
        };
    }, []);

    return (
        <BrowserRouter>

            {!isWaiting && !isAuth &&
                <Routes>
                    <Route path="*" element={<Navigate to="/login" />}/>
                    <Route path="/login" element={<Login />} />
                </Routes>
            }

            {!isWaiting && isAuth &&
                <Routes>
                    <Route path="/disk/*" element={<Home orientation={orientation}/>} />
                    <Route path="/login" element={<Navigate to="/disk/" />}/>
                    <Route path="/" element={<Navigate to="/disk/" />}/>
                    <Route path="/tests" element={<Test orientation={orientation}/>} />
                    <Route path="/account" element={<Account orientation={orientation}/>} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            }
        </BrowserRouter>
    );
}


export default App;