import React, { useState } from 'react'
import { Button, Form, InputGroup, Modal, Stack } from 'react-bootstrap'

import axios from 'axios'
import { useForm } from 'react-hook-form'

function UpdateModal(props) {
    const [med, setMed] = useState(props.med)
    const [erro, setErro] = useState(false)
    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            nome: med.nome,
            registro: med.registro,
            apresentacao: med.apresentacao,
            quantidade: med.quantidade,
            vencimento: med.vencimento,
        },
    })
    // props.med.quantidade && console.log(props.med.quantidade)

    function onSubmit(data) {
        // e.preventDefault()

        if (data.id_laboratorio === 'Selecione...') {
            window.alert('Informe o laboratório')
        }
        if (data.id_principio_ativo === 'Selecione...') {
            window.alert('Informe o principio ativo')
        }
        if (data.id_classe_terapeutica === 'Selecione...') {
            window.alert('Informe a classe terapeutica')
        }

        const novoMedicamento = {
            nome: data.nome,
            registro: data.registro,
            id_laboratorio: parseInt(data.id_laboratorio),
            id_principio_ativo: parseInt(data.id_principio_ativo),
            id_classe_terapeutica: parseInt(data.id_classe_terapeutica),
            apresentacao: data.apresentacao ? data.apresentacao : ' ',
            quantidade: data.quantidade,
            vencimento: data.vencimento,
        }

        console.log(novoMedicamento)
        axios
            .put(`https://gmed.onrender.com/medicamentos/${props.med.id}`, novoMedicamento, {
                headers: { Authorization: `Bearer ${props.isAuth.accessToken}` },
            })
            .then((data) => {
                console.log('Medicamento Atualizado.')
                props.setToast({ msg: 'Medicamento atualizado.', show: true, title: 'Notificação' })
                props.setReload((prev) => prev + 1)
                props.onHide()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function handleDelete() {
        if (window.confirm('Tem certeza que quer deletar esse medicamento?')) {
            axios
                .delete(`https://gmed.onrender.com/medicamentos/${props.med.id}`, {
                    headers: { Authorization: `Bearer ${props.isAuth.accessToken}` },
                })
                .then((data) => {
                    console.log(data)
                    props.setReload((prev) => prev + 1)
                    props.onHide()
                })
                .catch((err) => console.log(err))
        }
    }

    return (
        <Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered animation={false}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title id='contained-modal-title-vcenter'>Editar medicamento</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#F0F0F0' }}>
                    <Stack direction='horizontal' gap={1}>
                        <Form.Group className='mb-3 w-75'>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type='text' {...register('nome', { required: true })} />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Registro</Form.Label>
                            <Form.Control type='text' {...register('registro', { required: true })} />
                        </Form.Group>
                    </Stack>{' '}
                    <Stack direction='horizontal' gap={1}>
                        <Form.Group className='mb-3 w-50'>
                            <Form.Label>Laboratório</Form.Label>
                            <Form.Select
                                defaultValue={props.med.id_laboratorio}
                                aria-label='Default select example'
                                {...register('id_laboratorio', { required: true })}
                            >
                                <option>Selecione...</option>
                                {props.labs &&
                                    props.labs.map((item) => {
                                        return (
                                            <option key={item.id} value={item.id}>
                                                {item.nome}
                                            </option>
                                        )
                                    })}
                            </Form.Select>
                        </Form.Group>{' '}
                        <Form.Group className='mb-3 w-50'>
                            <Form.Label>Principio Ativo</Form.Label>
                            <Form.Select
                                defaultValue={props.med.id_principio_ativo}
                                aria-label='Default select example'
                                {...register('id_principio_ativo', { required: true })}
                            >
                                <option>Selecione...</option>
                                {props.pa &&
                                    props.pa.map((item) => {
                                        return (
                                            <option key={item.id} value={item.id}>
                                                {item.nome}
                                            </option>
                                        )
                                    })}
                            </Form.Select>
                        </Form.Group>
                    </Stack>
                    <Stack direction='horizontal' gap={1}>
                        <Form.Group className='mb-3 w-100'>
                            <Form.Label>Classe terapêutica</Form.Label>
                            <Form.Select
                                defaultValue={props.med.id_classe_terapeutica}
                                aria-label='Default select example'
                                {...register('id_classe_terapeutica', { required: true })}
                            >
                                <option>Selecione...</option>
                                {props.ct &&
                                    props.ct.map((item) => {
                                        return (
                                            <option key={item.id} value={item.id}>
                                                {item.codigo} - {item.nome}
                                            </option>
                                        )
                                    })}
                            </Form.Select>
                        </Form.Group>
                    </Stack>
                    <Stack direction='horizontal' gap={1}>
                        <Form.Group className='mb-3 w-75'>
                            <Form.Label>Apresentação</Form.Label>
                            <Form.Control
                                // required={false}
                                as='textarea'
                                rows={4}
                                // aria-label='Default select example'
                                {...register('apresentacao', { required: false })}
                            ></Form.Control>
                        </Form.Group>
                        <Stack>
                            <Form.Group className='mb-1'>
                                <Form.Label>Quantidade</Form.Label>
                                <Form.Control
                                    type='number'
                                    // defaultValue={props.med.quantidade}
                                    {...register('quantidade', { required: true })}
                                />
                            </Form.Group>
                            <Form.Group className='mb-1'>
                                <Form.Label>Vencimento</Form.Label>
                                <Form.Control type='date' {...register('vencimento', { required: true })} />
                            </Form.Group>
                        </Stack>
                    </Stack>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={handleDelete}>
                        Excluir medicamento
                    </Button>
                    <Button variant='secondary' onClick={props.onHide}>
                        Cancelar
                    </Button>
                    <Button type='submit'>Atualizar</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default UpdateModal
