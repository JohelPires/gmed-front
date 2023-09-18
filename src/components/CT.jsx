import axios from 'axios'
import React, { useState } from 'react'
import { Button, ButtonGroup, Stack } from 'react-bootstrap'
import AddPAModal from './AddPAModal'

function CT({ item, isAuth, setReload }) {
    // const [modalShow, setModalShow] = useState(false)

    return (
        <Stack gap={3} className='border-bottom pb-2' direction='horizontal'>
            <Stack>
                <h6 style={{ cursor: 'pointer' }}>
                    {item.codigo} - {item.nome}
                </h6>
            </Stack>
            {/* <ButtonGroup size='sm' className='ms-auto' aria-label='Basic example'>
                <Button variant='outline-secondary' onClick={() => setModalShow(true)}>
                    Editar
                </Button>
                <Button variant='outline-danger' onClick={handleDelete}>
                    Excluir
                </Button>
            </ButtonGroup> */}
        </Stack>
    )
}

export default CT
