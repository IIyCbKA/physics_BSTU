import React, {Component} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import logo from '../Images/logo.png'
import profileIcon from '../Images/profileIconDark.png'
import '../styles/App.css'
import {styles} from "../styles/style";
import iconTests from "../Images/iconTests.png"
class Header extends Component {
    render() {
        return (
            <div>
                <Navbar fixed='top' collapseOnSelect expand='md'>
                    <Container fluid className="style-container">
                        <Navbar.Brand href='/'
                                      style={styles.logotypePadding}
                        >
                            <img
                                src={logo}
                                height="24"
                                width="144"
                                className='d-inline-block align-top'
                                alt='Logo'
                            />
                        </Navbar.Brand>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="ms-auto">
                                <Nav.Link href="/tests"
                                          style={styles.hederIconsPadding}
                                >
                                    <img
                                        src={iconTests}
                                        height="22px"
                                        width="24px"
                                        alt="Tests"
                                    />
                                </Nav.Link>
                                <Nav.Link href="/login"
                                          style={styles.hederIconsPadding}
                                >
                                    <img
                                        src={profileIcon}
                                        height="24"
                                        width="24"
                                        alt="Login"
                                    />
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default Header;