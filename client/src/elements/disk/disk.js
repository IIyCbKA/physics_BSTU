import File from "./file";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import './styles/style_disk.css'
import {useContextMenu} from "react-contexify";
import ContextMenuDisk from "./disk_context_menu";

export default function Disk() {
    const files = useSelector(state => state.file.files)
    const [isModalOpen, setModalOpen] = useState(false)

    const { show } = useContextMenu({
        id: 'disk-context-menu',
    });

    function handleDiskContextMenu(event){
        if (!isModalOpen){
            show({
                event,
                props: {
                    key: 'value'
                }
            })
        }
    }

    return (
        <div className='storage-main'
            onContextMenu={handleDiskContextMenu}
        >
            <div className="root-content-inner">
                <div className="root-content-container">
                    <div className="client-listing">
                        <div className="listing-items">
                            {files.map(file => (
                                <File name={file.name}
                                      type={file.type}
                                      id={file.id}
                                      key={file.id}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <ContextMenuDisk isModalOpen={isModalOpen} setModalOpen={setModalOpen}/>
        </div>
    )
}