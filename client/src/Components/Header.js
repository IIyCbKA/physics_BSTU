import React, {Component} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import logo from '../Images/logo480.png'
import '../styles/App.css'

class Header extends Component {
    render() {
        return (
            <div>
                <Navbar fixed='top' collapseOnSelect expand='md' className="header-style">
                    <Container fluid>
                        <Navbar.Brand href='/'>
                            <img
                                src={logo}
                                height="30"
                                width="30"
                                className='d-inline-block align-top App-logo'
                                alt='Logo'
                            />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="ms-auto">
                                <Nav.Link href="/login">Войти</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default Header;