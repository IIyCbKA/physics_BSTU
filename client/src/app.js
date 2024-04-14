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

    const [orientation, setOrientation] = useState(window.innerHeight >
    window.innerWidth ? "portrait" : "landscape");

    useEffect(() => {
        const waitFunc = async () => {
            await dispatch(auth())
            setIsWaiting(false)
        }

        waitFunc()
    }, [dispatch])

    useEffect(() => {
        const handleResize = () => {
            const isPortrait = window.innerHeight > window.innerWidth;

            if (isPortrait && orientation !== "portrait") {
                setOrientation("portrait");
            } else if (!isPortrait && orientation !== "landscape") {
                setOrientation("landscape");
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [orientation]);

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