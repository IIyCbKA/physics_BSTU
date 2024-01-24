import React from 'react';
import {Nav, Offcanvas} from "react-bootstrap";
import {styles} from "../styles/style";
import { FirstComponent, SecondComponent } from "../elements/menu/menu_elements";

function MenuOffcanvas({show, handleClose}) {
    return (
        <>
            <Offcanvas
                show={show}
                onHide={handleClose}
                style={styles.customOffcanvas}
                scroll={true}
                backdropClassName='background-darkening'
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className="me-auto">
                        <span className="style-title-offcanvas">Menu</span>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav>
                        <FirstComponent/>
                        <SecondComponent/>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
);
}

export default MenuOffcanvas;
