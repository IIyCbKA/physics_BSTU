import {Navbar} from "react-bootstrap";
import {styles} from "./default_header/styles/style_header";
import 'bootstrap/dist/css/bootstrap.min.css'
import DefaultHeader from "./default_header/default_header";
import FileHeader from "./file_header/file_header";

function Header() {
    return (
        <Navbar
            collapseOnSelect
            expand='lg'
            style={styles.styleNavbar}
        >
            <DefaultHeader/>
            <FileHeader/>
        </Navbar>
    )
}

export default Header;
