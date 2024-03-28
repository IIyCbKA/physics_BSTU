import {Modal, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import {useState} from "react";
import '../../styles/style.css'
import {createFolder} from "../../actions/files";
import {useSelector} from "react-redux";

export default function CreateFolderModal(props){
    const [folderName, setFolderName] = useState('')

    const path = useSelector(state => state.file.path)

    const stopPropagation = (event) => {
        event.stopPropagation()
    }

    const onClick = async (e) => {
        await createFolder(folderName, path)
        props.handleClose()
    }

    return (
        <div className="modal-overlay" onClick={stopPropagation}>
            <Modal show={props.show}
                   onHide={props.handleClose}
                   backdrop="static"
                   keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal Title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                        placeholder="Введите имя папки"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary'
                            onClick={onClick}>Создать</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
};
