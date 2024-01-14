import React, {Component} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import logo from '../Images/logo.png'
import profileIcon from '../Images/profileIconDark.png'
import testsIcon from '../Images/testsIcon.png'
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
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="/tests"
                                      style={styles.headerIconsPadding}
                            >
                                <img
                                    src={testsIcon}
                                    height="32"
                                    width="32"
                                    alt="Tests"
                                />
                            </Nav.Link>
                            <Nav.Link href="/login" style={styles.headerIconsPadding}>
                                <img
                                    src={profileIcon}
                                    height="32"
                                    width="32"
                                    alt="Login"
                                />
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default Header;