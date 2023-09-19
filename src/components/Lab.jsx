import axios from 'axios'
import React, { useState } from 'react'
import { Button, ButtonGroup, Stack } from 'react-bootstrap'
import AddLabModal from './AddLabModal'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import DeleteModal from './DeleteModal'

function Lab({ item, isAuth, setReload, setToast, isSmallScreen }) {
    const [updateModalShow, setUpdateModalShow] = useState(false)
    const [deleteShow, setDeleteShow] = useState(false)

    function handleDelete() {
        setDeleteShow(true)
    }

    // function handleDelete() {
    //     if (window.confirm('Tem certeza que quer deletar esse laboratório?')) {
    //         axios
    //             .delete(`https://gmed.onrender.com/laboratorios/${item.id}`, {
    //                 headers: { Authorization: `Bearer ${isAuth.accessToken}` },
    //             })
    //             .then((data) => {
    //                 console.log(data)
    //                 setToast({ msg: 'Laboratório excluído.', show: true, title: 'Notificação' })
    //                 setReload((prev) => prev + 1)
    //                 // props.onHide()
    //             })
    //             .catch((err) => {
    //                 console.log(err)
    //                 if (err.response.data.name === 'SequelizeForeignKeyConstraintError') {
    //                     console.log(
    //                         'Atenção: Não é possível deletar um laboratório se houver um medicamento desse laboratório cadastrado.'
    //                     )
    //                     window.alert(
    //                         'Atenção: Não é possível deletar um laboratório se houver um medicamento desse laboratório cadastrado.'
    //                     )
    //                 }
    //             })
    //     }
    // }
    return (
        <Stack gap={3} className='border-bottom pb-2' direction='horizontal'>
            <Stack>
                <h6 style={{ cursor: 'pointer' }}>{item.nome}</h6>
                <small>CNPJ: {item.cnpj}</small>
            </Stack>
            <ButtonGroup size='sm' className='ms-auto' aria-label='Basic example'>
                <Button variant='outline-secondary' onClick={() => setUpdateModalShow(true)}>
                    <FaEdit />
                    {!isSmallScreen && ' Editar'}
                </Button>
                <Button variant='outline-danger' onClick={handleDelete}>
                    <FaTrashAlt />
                    {!isSmallScreen && '  Excluir'}
                </Button>
            </ButtonGroup>
            <AddLabModal
                editMode={true}
                lab={item}
                isAuth={isAuth}
                setReload={setReload}
                show={updateModalShow}
                onHide={() => setUpdateModalShow(false)}
            />
            {/* <ViewModal med={item} show={viewModalShow} onHide={() => setViewModalShow(false)} /> */}

            <DeleteModal
                show={deleteShow}
                setShow={setDeleteShow}
                item={item}
                isAuth={isAuth}
                setToast={setToast}
                setReload={setReload}
                what={'laboratorios'}
            />
        </Stack>
    )
}

export default Lab
