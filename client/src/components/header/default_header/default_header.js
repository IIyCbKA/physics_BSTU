import { Container, Nav, Navbar } from "react-bootstrap";
import { styles } from "./styles/style_header";
import Logotype from "./icons/logotype";
import MenuOffcanvas from "../../menu/menu";
import React, { useState } from "react";
import { cleanUserInfo } from "../../../actions/user";
import { useDispatch, useSelector } from "react-redux";
import "./styles/style_header.css";
import {
  LogoutRounded,
  AccountCircleOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import "bootstrap/dist/css/bootstrap.min.css";
import { PORTRAIT_ORIENTATION } from "../../../constants";

const MENU_BTN_TEXT = "Меню";

export default function DefaultHeader() {
  const dispatch = useDispatch();
  const orientation = useSelector((state) => state.app.orientation);
  const [offcanvasShow, setOffcanvasShow] = useState(false);

  const handleOffcanvasToggle = () => {
    setOffcanvasShow(!offcanvasShow);
  };

  const handlerLogoutClick = () => {
    dispatch(cleanUserInfo());
  };

  const containerStyle = () => {
    if (orientation === PORTRAIT_ORIENTATION) {
      return styles.containerHeaderMobile;
    } else {
      return styles.containerHeaderPC;
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" style={styles.styleNavbar}>
      <Container fluid style={containerStyle()}>
        <Navbar.Brand href="/disk/" style={styles.logotypePadding}>
          <SettingsOutlined
            style={{ fontSize: "30px", marginRight: "5px" }}
            className="icon-spin"
          />
          <Logotype width={"125px"} height={"30px"} />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={handleOffcanvasToggle}
          style={styles.customToggle}
        >
          <span className="btn-menu-text none-select">{MENU_BTN_TEXT}</span>
        </Navbar.Toggle>
        <MenuOffcanvas
          show={offcanvasShow}
          handleClose={handleOffcanvasToggle}
        />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="d-none d-lg-block"
        >
          <Nav className="ms-auto">
            <Nav.Link
              href="/account"
              style={styles.headerIconsForm}
              className="main-btns-background"
            >
              <AccountCircleOutlined style={styles.headerIconStyle} />
            </Nav.Link>
            <Nav.Link
              onClick={handlerLogoutClick}
              style={styles.headerIconsForm}
              className="main-btns-background"
            >
              <LogoutRounded style={styles.headerIconStyle} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
