import React, {useState} from "react";
import './styles/style_add_button.css'
import {useContextMenu} from "react-contexify";
import {styles} from './styles/style_add_button'
import {Button} from "antd"
import {PlusOutlined} from "@ant-design/icons";
import ContextMenuDisk from "../context_menus/disk_context_menu";

export default function AddButton(){
    const [isModalOpen, setModalOpen] = useState(false)

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

    return(
        <div className="add-button-area">
            <Button type="dashed" style={styles.frameBtn} onClick={handleClick}>
                <PlusOutlined/>
                <div
                    style={{
                        marginTop: 8,
                    }}
                >
                    Добавить
                </div>
            </Button>
            <ContextMenuDisk
                isModalOpen={isModalOpen}
                setModalOpen={setModalOpen}
            />
        </div>
    )
}
