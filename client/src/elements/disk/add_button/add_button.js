import React, {useState} from "react";
import './styles/style_add_button.css'
import {useContextMenu} from "react-contexify";
import {styles} from './styles/style_add_button'
import {Button} from "antd"
import {PlusOutlined} from "@ant-design/icons";
import ContextMenuDisk from "../context_menus/disk_context_menu";
import {useSelector} from "react-redux";
import {MOBILE_ORIENTATION, PC_ORIENTATION} from "../../../classes/OrientationListener";

export default function AddButton(props){
    const [isModalOpen, setModalOpen] = useState(false)
    const orientation = useSelector(state => state.app.orientation)

    const { show } = useContextMenu({
        id: 'disk-context-menu',
    });

    const handleClick = (event) => {
        if (!isModalOpen){
            event.stopPropagation();
            show({
                event,
                props: {
                    key: 'value'
                }
            })
        }
    };

    const iconStyle = () => {
        if (orientation === MOBILE_ORIENTATION){
            return styles.iconMobile
        } else{
            return styles.iconPC
        }
    }

    return(
        <div className="add-button-area">
            <Button type="dashed" style={iconStyle()} onClick={handleClick}>
                <PlusOutlined/>
                {props.orientation === PC_ORIENTATION &&
                    <div
                        style={{
                            marginTop: 8,
                        }}
                    >
                        Добавить
                    </div>
                }
            </Button>
            <ContextMenuDisk
                isModalOpen={isModalOpen}
                setModalOpen={setModalOpen}
            />
        </div>
    )
}
