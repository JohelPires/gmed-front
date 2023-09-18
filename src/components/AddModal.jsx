import React, { useState } from 'react'
import { Button, Form, Modal, Stack } from 'react-bootstrap'
import axios from 'axios'
import { useForm } from 'react-hook-form'

function AddModal(props) {
    // const [novoMedicamento, setNovoMedicamento] = useState({
    //     nome: 'data.nome',
    //     registro: 'ata.registro',

    //     apresentacao: null,
    //     quantidade: null,
    //     vencimento: null,
    // })
    const [erro, setErro] = useState(null)
    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
    } = useForm({ shouldUnregister: true })

    function onSubmit(data) {
        // e.preventDefault()
        const novoMedicamento = {
            nome: data.nome,
            registro: data.registro,
            id_laboratorio: parseInt(data.id_laboratorio),
            id_principio_ativo: parseInt(data.id_principio_ativo),
            id_classe_terapeutica: parseInt(data.id_classe_terapeutica),
            apresentacao: data.apresentacao,
            quantidade: data.quantidade,
            vencimento: data.vencimento,
        }

        axios
            .post('https://gmed.onrender.com/medicamentos', novoMedicamento, {
                headers: { Authorization: `Bearer ${props.isAuth.accessToken}` },
            })
            .then((data) => {
                console.log('Medicamento adicionado.')
                props.setToast({ msg: 'Medicamento adicionado.', show: true, title: 'Notificação' })
                props.setReload((prev) => prev + 1)
                props.onHide()
            })
            .catch((err) => setErro(err.response.data))
    }

    // O ENDPOINT PEDE ESSE FORMATO:
    // {
    //     "nome": "outro teste2",
    //     "id_principio_ativo": 2,
    //     "id_laboratorio": 2,
    //     "registro": "12345",
    //     "ean": "123",
    //     "apresentacao": "teste",
    //     "id_classe_terapeutica": 15,
    //     "quantidade": 10000,
    //     "vencimento": "2026-05-31"
    //   }

    // console.log(props.ct)
    // props.ct.map((item) => console.log(item.nome))

    return (
        <Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered animation={false}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title id='contained-modal-title-vcenter'>Cadastrar medicamento</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#F0F0F0' }}>
                    {/* {errors.valor && <span style={{ color: 'red' }}>Digite um valor diferente de zero</span>} */}
                    {erro &&
                        erro.map((item) => {
                            return (
                                <p key={item} style={{ color: 'red' }}>
                                    <small variant='danger'>{item}</small>
                                </p>
                            )
                        })}
                    <Stack direction='horizontal' gap={1}>
                        <Form.Group className='mb-3 w-75'>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                required
                                type='text'
                                {...register('nome', { required: true })}
                                defaultValue={''}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Registro</Form.Label>
                            <Form.Control required type='text' {...register('registro', { required: true })} />
                        </Form.Group>
                    </Stack>{' '}
                    <Stack direction='horizontal' gap={1}>
                        <Form.Group className='mb-3 w-50'>
                            <Form.Label>Laboratório</Form.Label>
                            <Form.Select
                                defaultValue={0}
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
                                aria-label='Default select example'
                                required
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
                                as='textarea'
                                rows={4}
                                aria-label='Default select example'
                                {...register('apresentacao')}
                            ></Form.Control>
                        </Form.Group>
                        <Stack>
                            <Form.Group className='mb-1'>
                                <Form.Label>Quantidade</Form.Label>
                                <Form.Control type='number' {...register('quantidade', { required: true })} />
                            </Form.Group>
                            <Form.Group className='mb-1'>
                                <Form.Label>Vencimento</Form.Label>
                                <Form.Control type='date' {...register('vencimento', { required: true })} />
                            </Form.Group>
                        </Stack>
                    </Stack>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} variant='secondary'>
                        Cancelar
                    </Button>
                    <Button type='submit'>Adicionar</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddModal
