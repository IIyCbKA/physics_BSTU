import React, {useRef} from 'react';
import {Nav, Offcanvas} from "react-bootstrap";
import profileIcon from '../Images/profileIconDark.png';
import testsIcon from '../Images/iconTest.png';
import {styles} from "../styles/style";

function MenuOffcanvas({show, handleClose}) {
    return (
        <>
            <Offcanvas
                show={show}
                onHide={handleClose}
                style={styles.customOffcanvas}
                className="offcanvas"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className="me-auto">
                        <span className="style-title-offcanvas">Menu</span>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav>
                        <Nav.Link href="/test">
                            <img
                                className="style-img-offcanvas"
                                src={testsIcon}
                                width="24px"
                                height="24px"
                                alt="tests"
                            />
                            <span className="style-text-in-menu"> Tests</span>
                        </Nav.Link>
                        <Nav.Link href="/login">
                            <img
                                className="style-img-offcanvas"
                                src={profileIcon}
                                height="24px"
                                width="24px"
                                alt="logo"
                            />
                            <span className="style-text-in-menu"> Account</span>
                        </Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default MenuOffcanvas;
