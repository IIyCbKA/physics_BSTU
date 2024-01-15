import React from 'react';
import { Nav, Offcanvas } from "react-bootstrap";
import profileIcon from '../Images/profileIconDark.png';
import testsIcon from '../Images/iconTest.png';
import { styles } from "../styles/style";

function MenuOffcanvas({ show, handleClose }) {
    return (
        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Nav className="ms-auto">
                    <Nav.Link href="/login" style={styles.headerIconsPadding}>
                        <img
                            src={profileIcon}
                            height="30px"
                            width="30px"
                            alt="logo"
                        />
                        <span>Account</span>
                    </Nav.Link>
                    <Nav.Link href="/test" style={styles.headerIconsPadding}>
                        <img
                            src={testsIcon}
                            width="30px"
                            height="30px"
                            alt="tests"
                        />
                        <span>Tests</span>
                    </Nav.Link>
                </Nav>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default MenuOffcanvas;
