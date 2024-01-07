import React, {Component} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import logo from '../Images/logo.png'
import login from '../Images/iconPeople.jpg'
import '../styles/App.css'
import {styles} from "../styles/style";

class HomeHeader extends Component {

    render() {
        return (
            <div>
                <Navbar fixed='top' collapseOnSelect expand='md'>
                    <Container fluid>
                        <Navbar.Brand href='/'>
                            <img
                                src={logo}
                                height="30"
                                width="180"
                                className='d-inline-block align-top'
                                alt='Logo'
                            />
                        </Navbar.Brand><Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Nav className="ms-auto">
                            <Nav.Link
                                style={styles.buttonHomeHeader}
                                href="/CatalogTest"
                            >
                                <span className="text-btn-catalog-test">Каталог тестов</span>
                            </Nav.Link>
                        </Nav>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="ms-auto">
                                <Nav.Link href="/login"
                                          style={styles.loginIconPadding}
                                >
                                    <img
                                        src={login}
                                        height="30"
                                        width="30"
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

export default HomeHeader;