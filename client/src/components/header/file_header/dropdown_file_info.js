import {useSelector} from "react-redux";
import {styles} from "./styles/style_file_header";
import {InfoOutlined} from "@mui/icons-material";
import {Nav} from "react-bootstrap";
import {Dropdown} from "antd";
import './styles/style_file_header.css'
import {FILE_TYPE_FOLDER} from "../../../constants";

const DROPDOWN_NAME_TITLE = 'Имя:'
const DROPDOWN_SIZE_TITLE = 'Размер:'

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Байт';

    const sizes = ['Байт', 'КБ', 'МБ', 'ГБ', 'ТБ'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));

    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

export default function DropdownFileInfo(){
    const selected_name = useSelector(state => state.file.selected_name)
    const selected_type = useSelector(state => state.file.selected_type)
    const selected_size = useSelector(state => state.file.selected_size)

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
            {selected_type !== FILE_TYPE_FOLDER &&
                <div className='dropdown-text-line'>
                    <div className='dropdown-text-line-title'>
                        {DROPDOWN_SIZE_TITLE}
                    </div>
                    <div className='dropdown-text-line-main'>
                        {formatFileSize(selected_size)}
                    </div>
                </div>
            }
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