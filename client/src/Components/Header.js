import React, {Component} from 'react';
import {Container, Nav, Navbar, Offcanvas} from "react-bootstrap";
import logo from '../Images/logo.png'
import profileIcon from '../Images/profileIconDark.png'
import testsIcon from '../Images/iconTest.png'
import '../styles/App.css'
import {styles} from "../styles/style";


class Header extends Component {
    render() {
        return (
            <Navbar fixed='top' collapseOnSelect expand='sm'>
                <Container fluid>
                    <Navbar.Brand href='/' style={styles.logotypePadding}>
                        <img
                            src={logo}
                            height="32"
                            width="240"
                            className='d-inline-block align-top'
                            alt='Logo'
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"
                                   style={styles.customToggle}
                    >
                        <span className="menu-text">Menu</span>
                    </Navbar.Toggle>
                    <Navbar.Offcanvas
                        aria-controls='basic-navbar-nav'
                        style={styles.customOffcanvas}
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Menu</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="ms-auto">
                                    <Nav.Link href="/test"
                                              style={styles.headerIconsPadding}
                                    >
                                        <img
                                            src={testsIcon}
                                            height="30"
                                            width="30"
                                            alt="test"
                                        />
                                    </Nav.Link>
                                    <Nav.Link href="/login"
                                              style={styles.headerIconsPadding}
                                    >
                                        <img
                                            src={profileIcon}
                                            height="30"
                                            width="30"
                                            alt="Login"
                                        />
                                    </Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        );
    }
}

export default Header;