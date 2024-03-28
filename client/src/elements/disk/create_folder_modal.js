import {Modal, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

export default function CreateFolderModal(props){
    const stopPropagation = (event) => {
        event.stopPropagation()
    }

    return (
        <Modal show={props.show}
               onHide={props.handleClose}
               onClick={stopPropagation}
        >
            <Modal.Header closeButton>
                <Modal.Title>Modal Title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Hello, word
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={props.handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};
