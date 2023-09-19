import axios from 'axios'
import React, { useState } from 'react'
import { Button, Form, Modal, Stack } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

function AddPAModal(props) {
    const [erro, setErro] = useState(null)
    const {
        register,
        handleSubmit,

        // watch,
        formState: { errors },
    } = useForm({
        shouldUnregister: true,
        defaultValues: {
            nome: props.editmode ? props.pa.nome : '',
        },
    })

    function onSubmit(data) {
        // e.preventDefault()
        const novoPA = {
            nome: data.nome,
        }

        if (props.editmode) {
            axios
                .put(`https://gmed.onrender.com/pa/${props.pa.id}`, novoPA, {
                    headers: { Authorization: `Bearer ${props.isauth.accessToken}` },
                })
                .then((data) => {
                    console.log('Princípio ativo atualizado.')
                    console.log(props.pa.id)
                    console.log(data)
                    props.setreload((prev) => prev + 1)
                    props.settoast({ msg: 'Princípio ativo atualizado.', show: true, title: 'Notificação' })
                    props.onHide()
                })
                .catch((err) => {
                    setErro(err)
                    // props.setreload((prev) => prev + 1)
                })
        } else {
            axios
                .post('https://gmed.onrender.com/pa', novoPA, {
                    headers: { Authorization: `Bearer ${props.isauth.accessToken}` },
                })
                .then((data) => {
                    console.log('Princípio ativo adicionado.')
                    props.settoast({ msg: 'Princípio ativo adicionado.', show: true, title: 'Notificação' })
                    props.setreload((prev) => prev + 1)
                    props.onHide()
                })
                .catch((err) => {
                    setErro(err.response.data.errors)
                    // props.setreload((prev) => prev + 1)
                })
        }
    }
    return (
        <Modal {...props} size='md' aria-labelledby='contained-modal-title-vcenter' centered animation={false}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header closeButton>
                    <Modal.Title id='contained-modal-title-vcenter'>
                        {props.editmode ? 'Editar' : 'Cadastrar'} princípio ativo
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#F0F0F0' }}>
                    {/* {errors.valor && <span style={{ color: 'red' }}>Digite um valor diferente de zero</span>} */}
                    {/* {erro &&
                        erro.map((item) => {
                            return (
                                <p key={item} style={{ color: 'red' }}>
                                    <small variant='danger'>{item.message}</small>
                                </p>
                            )
                        })} */}
                    <Stack gap={1}>
                        <Form.Group className='mb-3'>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control required type='text' {...register('nome', { required: true })} />
                        </Form.Group>
                    </Stack>{' '}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} variant='secondary'>
                        Cancelar
                    </Button>
                    <Button type='submit'>{props.editmode ? 'Salvar' : 'Adicionar'}</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddPAModal
