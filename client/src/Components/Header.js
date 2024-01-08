import React, {Component} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import logo from '../Images/logo.png'
import profileIcon from '../Images/profileIconDark.png'
import '../styles/App.css'
import {styles} from "../styles/style";
import copybook from "../Images/copybook.png"

class Header extends Component {
    render() {
        return (
            <div>
                <Navbar fixed='top' collapseOnSelect expand='md'>
                    <Container fluid>
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
                                <Nav.Link href="/CatalogTest"
                                          style={styles.btnCatalogTestPadding}
                                >
                                    <img
                                        src={copybook}
                                        height="22px"
                                        alt="Copybook"
                                    />
                                </Nav.Link>
                                <Nav.Link href="/login"
                                          style={styles.profileIconPadding}
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