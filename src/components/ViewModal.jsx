import React from 'react'
import { Button, Modal, Stack } from 'react-bootstrap'

function ViewModal(props) {
    return (
        <Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered animation={false}>
            <Modal.Header closeButton>
                <Modal.Title id='contained-modal-title-vcenter'>Visualizar medicamento</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-3' style={{ background: '#F0F0F0' }}>
                <Stack direction='horizontal' gap={1}>
                    <Stack className='mb-3 w-75'>
                        <div>Nome</div>
                        <h6>{props.med.nome}</h6>
                    </Stack>
                    <Stack className='mb-3'>
                        <div>Registro</div>
                        <h6>{props.med.registro}</h6>
                    </Stack>
                </Stack>{' '}
                <Stack direction='horizontal' gap={1}>
                    <Stack className='mb-3 w-50'>
                        <div>Laboratório</div>
                        <h6>{props.med.laboratorio}</h6>
                    </Stack>{' '}
                    <Stack className='mb-3 w-50'>
                        <div>Principio Ativo</div>
                        <h6>{props.med.principioativo}</h6>
                    </Stack>
                </Stack>
                <Stack direction='horizontal' gap={1}>
                    <Stack className='mb-3 w-100'>
                        <div>Classe terapêutica</div>
                        <h6>{props.med.classeterapeutica}</h6>
                    </Stack>
                </Stack>
                <Stack direction='horizontal' gap={1}>
                    <Stack className='mb-3 w-75'>
                        <div>Apresentação</div>
                        <h6>{props.med.apresentacao}</h6>
                    </Stack>
                    <Stack>
                        <Stack className='mb-1'>
                            <div>Quantidade</div>
                            <h6>{props.med.quantidade}</h6>
                        </Stack>
                        <Stack className='mb-1'>
                            <div>Vencimento</div>
                            <h6>{props.med.vencimento}</h6>
                        </Stack>
                    </Stack>
                </Stack>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Voltar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ViewModal
