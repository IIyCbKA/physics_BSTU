import React, {useState} from 'react';
import {Nav, Offcanvas} from "react-bootstrap";
import {styles} from "./styles/style_menu";
import { TestsElement, ProfileElement } from "../../elements/menu/menu_elements";
import './styles/style_menu.css'

function MenuOffcanvas({show, handleClose}) {
    const [hidden, setHide] = useState(false);
    const closeMenu = () => {
        setHide(true);
        setTimeout(() => {
            handleClose();
            setTimeout(() => {
                setHide(false);
            }, 1000);
        }, 1200);
    }

    return (
        <Offcanvas
            show={show}
            onHide={closeMenu}
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
                    <TestsElement isHidden={hidden}/>
                    <ProfileElement isHidden={hidden}/>
                </Nav>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default MenuOffcanvas;
