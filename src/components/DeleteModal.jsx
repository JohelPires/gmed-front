import axios from 'axios'
import React from 'react'
import { Button, Modal } from 'react-bootstrap'

function DeleteModal({ show, setShow, item, isAuth, setToast, setReload, what }) {
    function handleClose() {
        setShow(false)
    }

    function handleDelete() {
        axios
            .delete(`https://gmed.onrender.com/${what}/${item.id}`, {
                headers: { Authorization: `Bearer ${isAuth.accessToken}` },
            })
            .then((data) => {
                console.log(data)
                setToast({ msg: 'Item excluído com sucesso.', show: true, title: 'Notificação' })
                setReload((prev) => prev + 1)
                setShow(false)
            })
            .catch((err) => console.log(err))
    }
    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Exclusão</Modal.Title>
            </Modal.Header>
            <Modal.Body>Tem certeza que quer deletar?</Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant='primary' onClick={handleDelete}>
                    Confirmar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteModal
