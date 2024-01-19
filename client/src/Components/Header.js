import React, {useState} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import logo from '../Images/logo.png';
import profileIcon from '../Images/profileIconDark.png';
import testsIcon from '../Images/iconTest.png';
import '../styles/App.css';
import {styles} from "../styles/style";
import MenuOffcanvas from "../Components/Menu";

function Header() {
    const [offcanvasShow, setOffcanvasShow] = useState(false);

    const handleOffcanvasToggle = () => {
        setOffcanvasShow(!offcanvasShow);
    };

    return (
        <Navbar
            collapseOnSelect
            expand='sm'
            style={styles.styleNavbar}
        >
            <Container fluid>
                <Navbar.Brand href='/' style={styles.logotypePadding}>
                    <img
                        src={logo}
                        height="30"
                        width="200"
                        className='d-inline-block align-top'
                        alt='Logo'
                    />
                </Navbar.Brand>
                <Navbar.Toggle
                    aria-controls="responsive-navbar-nav"
                    onClick={handleOffcanvasToggle}
                    style={styles.customToggle}
                >
                    <span className="menu-text">Menu</span>
                </Navbar.Toggle>
                <MenuOffcanvas show={offcanvasShow} handleClose={handleOffcanvasToggle}/>
                <Navbar.Collapse id="responsive-navbar-nav" className="d-none d-sm-block">
                    <Nav className="ms-auto">
                        <Nav.Link href="/test" style={styles.headerIconsPadding}>
                            <img
                                src={testsIcon}
                                height="30"
                                width="30"
                                alt="test"
                            />
                        </Nav.Link>
                        <Nav.Link href="/login" style={styles.headerIconsPadding}>
                            <img
                                src={profileIcon}
                                height="30"
                                width="30"
                                alt="Login"
                            />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;
