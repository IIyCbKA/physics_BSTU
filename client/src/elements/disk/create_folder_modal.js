import {Modal, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import {useState} from "react";
import '../../styles/style.css'

export default function CreateFolderModal(props){
    const [folderName, setFolderName] = useState('')

    const stopPropagation = (event) => {
        event.stopPropagation()
    }

    return (
        <>{
            props.show && (
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
                                placeholder="Enter folder name"

                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant='secondary'
                                    onClick={props.handleClose}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )
        }
        </>
    );
};
