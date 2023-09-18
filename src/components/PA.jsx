import axios from 'axios'
import React, { useState } from 'react'
import { Button, ButtonGroup, Stack } from 'react-bootstrap'
import AddPAModal from './AddPAModal'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'

function PA({ item, isAuth, setReload, setToast, isSmallScreen }) {
    const [modalShow, setModalShow] = useState(false)

    function handleDelete() {
        if (window.confirm('Tem certeza que quer deletar esse princípio ativo?')) {
            axios
                .delete(`https://gmed.onrender.com/pa/${item.id}`, {
                    headers: { Authorization: `Bearer ${isAuth.accessToken}` },
                })
                .then((data) => {
                    console.log(data)
                    setToast({ msg: 'Princípio ativo excluído.', show: true, title: 'Notificação' })
                    setReload((prev) => prev + 1)
                    // props.onHide()
                })
                .catch((err) => {
                    console.log(err)

                    if (err.response.data.name === 'SequelizeForeignKeyConstraintError') {
                        console.log(
                            'Atenção: Não é possível deletar um princípio ativo se houver um medicamento desse princípio ativo cadastrado.'
                        )
                        window.alert(
                            'Atenção: Não é possível deletar um princípio ativo se houver um medicamento desse princípio ativo cadastrado.'
                        )
                    }
                })
        }
    }
    return (
        <Stack gap={3} className='border-bottom pb-2' direction='horizontal'>
            <Stack>
                <h6 style={{ cursor: 'pointer' }}>{item.nome}</h6>
            </Stack>
            <ButtonGroup size='sm' className='ms-auto' aria-label='Basic example'>
                <Button variant='outline-secondary' onClick={() => setModalShow(true)}>
                    <FaEdit />
                    {!isSmallScreen && ' Editar'}
                </Button>
                <Button variant='outline-danger' onClick={handleDelete}>
                    <FaTrashAlt />
                    {!isSmallScreen && ' Excluir'}
                </Button>
            </ButtonGroup>
            <AddPAModal
                editMode={true}
                pa={item}
                isAuth={isAuth}
                setReload={setReload}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            {/* <ViewModal med={item} show={viewModalShow} onHide={() => setViewModalShow(false)} /> */}
        </Stack>
    )
}

export default PA
