import File from "./file";
import React from "react";
import {useSelector} from "react-redux";
import './styles/style_disk.css'
import AddButton from "./add_button/add_button";
import GoBackButton from "./go_back_button/go_back_button";
import {getLastDirectory} from "../../actions/strings";

export default function Disk() {
    const files = useSelector(state => state.file.files)
    const path = useSelector(state => state.file.path)
    const backPath = getLastDirectory(path)
    return (
        <div className='storage-main'>
            <div className="root-content-inner">
                <div className="root-content-container">
                    <div className="client-listing">
                        <div className="listing-items">
                            {backPath !== '' &&
                                <GoBackButton backPath={backPath} />}
                            {files.map(file => (
                                <File name={file.name}
                                      type={file.type}
                                      id={file.id}
                                      key={file.id}
                                />
                            ))}
                            <AddButton />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}