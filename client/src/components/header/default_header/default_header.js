import {Container, Nav, Navbar} from "react-bootstrap";
import {styles} from "./styles/style_header";
import logo from "./icons/logo.png";
import MenuOffcanvas from "../../menu/menu";
import React, {useState} from "react";
import {cleanUserInfo} from "../../../actions/user";
import {PORTRAIT_ORIENTATION} from "../../../classes/OrientationListener";
import {useDispatch, useSelector} from "react-redux";
import './styles/style_header.css';
import {LogoutRounded, TaskAltOutlined, AccountCircleOutlined} from "@mui/icons-material";
import 'bootstrap/dist/css/bootstrap.min.css'

export default function DefaultHeader(){
    const dispatch = useDispatch()
    const orientation = useSelector(state => state.app.orientation)
    const [offcanvasShow, setOffcanvasShow] = useState(false);

    const handleOffcanvasToggle = () => {
        setOffcanvasShow(!offcanvasShow);
    };

    const handlerLogoutClick = () => {
        dispatch(cleanUserInfo())
    }

    const containerStyle = () => {
        if (orientation === PORTRAIT_ORIENTATION){
            return styles.containerHeaderMobile
        } else{
            return styles.containerHeaderPC
        }
    }

    return (
        <Navbar
            collapseOnSelect
            expand='lg'
            style={styles.styleNavbar}
        >
            <Container fluid style={containerStyle()}>
                <Navbar.Brand href='/disk/' style={styles.logotypePadding}>
                    <img
                        src={logo}
                        height="30"
                        width="200"
                        className='d-inline-block align-top none-select'
                        alt='Logo'
                    />
                </Navbar.Brand>
                <Navbar.Toggle
                    aria-controls="responsive-navbar-nav"
                    onClick={handleOffcanvasToggle}
                    style={styles.customToggle}
                >
                    <span className="btn-menu-text none-select">Меню</span>
                </Navbar.Toggle>
                <MenuOffcanvas
                    show={offcanvasShow}
                    handleClose={handleOffcanvasToggle}
                />
                <Navbar.Collapse
                    id="responsive-navbar-nav"
                    className="d-none d-lg-block"
                >
                    <Nav className="ms-auto">
                        <Nav.Link href="/tests"
                                  style={styles.headerIconsForm}
                                  className='main-btns-background'
                        >
                            <TaskAltOutlined style={styles.headerIconStyle}/>
                        </Nav.Link>
                        <Nav.Link href="/account"
                                  style={styles.headerIconsForm}
                                  className='main-btns-background'
                        >
                            <AccountCircleOutlined style={styles.headerIconStyle}/>
                        </Nav.Link>
                        <Nav.Link onClick={handlerLogoutClick}
                                  style={styles.headerIconsForm}
                                  className='main-btns-background'
                        >
                            <LogoutRounded style={styles.headerIconStyle}/>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}