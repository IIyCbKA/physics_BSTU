import React, {useState} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import logo from './icons/logo.png';
import './styles/style_header.css';
import {styles} from "./styles/style_header";
import MenuOffcanvas from "../menu/menu";
import 'bootstrap/dist/css/bootstrap.min.css'
import {FormOutlined, LogoutOutlined, UserOutlined} from '@ant-design/icons'
import {useDispatch} from "react-redux";
import {cleanUserInfo} from "../../actions/user";

function Header() {
    const dispatch = useDispatch()
    const [offcanvasShow, setOffcanvasShow] = useState(false);

    const handleOffcanvasToggle = () => {
        setOffcanvasShow(!offcanvasShow);
    };

    const handlerLogoutClick = () => {
        dispatch(cleanUserInfo())
    }

    return (
        <Navbar
            collapseOnSelect
            expand='lg'
            style={styles.styleNavbar}
        >
            <Container fluid style={styles.styleContainerHeader}>
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
                    <span className="btn-menu-text">Меню</span>
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
                        <Nav.Link href="/test"
                                  style={styles.headerIconsForm}
                        >
                            <FormOutlined style={styles.headerIconStyle}/>
                        </Nav.Link>
                        <Nav.Link href="/account"
                                  style={styles.headerIconsForm}
                        >
                            <UserOutlined style={styles.headerIconStyle}/>
                        </Nav.Link>
                        <Nav.Link onClick={handlerLogoutClick}
                                  style={styles.headerIconsForm}
                        >
                            <LogoutOutlined style={styles.headerIconStyle}/>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;
