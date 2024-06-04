import {useSelector} from "react-redux";
import {styles} from "./styles/style_file_header";
import {InfoOutlined} from "@mui/icons-material";
import {Nav} from "react-bootstrap";
import {Dropdown} from "antd";
import './styles/style_file_header.css'

const DROPDOWN_NAME_TITLE = 'Имя:'

export default function DropdownFileInfo(){
    const selected_name = useSelector(state => state.file.selected_name)

    const customDropdown = () => (
        <div className='dropdown-wrap'>
            <div className='dropdown-text-line'>
                <div className='dropdown-text-line-title'>
                    {DROPDOWN_NAME_TITLE}
                </div>
                <div className='dropdown-text-line-main'>
                    {selected_name}
                </div>
            </div>
        </div>
    );

    return (
        <Dropdown
            dropdownRender={customDropdown}
            trigger={['click']}
        >
            <Nav.Item style={styles.navItemStyle}>
                <InfoOutlined style={styles.iconsStyle}/>
            </Nav.Item>
        </Dropdown>
    )
}