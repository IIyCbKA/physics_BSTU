import {useSelector} from "react-redux";
import {styles} from "./styles/style_file_header";
import {InfoOutlined} from "@mui/icons-material";
import {Nav} from "react-bootstrap";

export default function DropdownFileInfo(){
    const selected_name = useSelector(state => state.file.selected_name)

    const handleInfoClick = () => {
        // тут переписать
    };

    return (
        <Nav.Item style={styles.navItemStyle} onClick={handleInfoClick}>
            <InfoOutlined style={styles.iconsStyle}/>
        </Nav.Item>
    )
}