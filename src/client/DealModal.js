import React from "react";
import Modal from 'react-modal';

function DealModal(title) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    return (
        <div>
            <button onClick={() => setModalIsOpen(true)}>Open Modal</button>
            <Modal isOpen={modalIsOpen} ariaHideApp={false}>
                <h1>{ title }</h1>
                <button onClick={() => setModalIsOpen(false)}>Close</button>
            </Modal>
        </div>
    );
}
