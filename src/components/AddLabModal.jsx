import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Stack } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

function AddLabModal(props) {
    const [lab, setLab] = useState({
        nome: props.editMode ? props.lab.nome : '',
        cnpj: props.editMode ? props.lab.cnpj : '',
    })
    const [labErro, setLabErro] = useState(null)
    const [cnpjErro, setCnpjErro] = useState(null)

    function formatCNPJ(value) {
        // Remove todos os caracteres não numéricos 00.000.000/0000-00
        return value
            .replace(/\D/g, '') // Remove qualquer caractere que não seja um número
            .replace(/(\d{2})(\d)/, '$1.$2') // Adiciona um ponto após os primeiros 2 números
            .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona um ponto após os próximos 3 números
            .replace(/(\d{3})(\d)/, '$1/$2') // Adiciona uma barra após os próximos 3 números
            .replace(/(\d{4})(\d{1,2})/, '$1-$2') // Adiciona um hífen após os próximos 4 números
            .replace(/(-\d{2})\d+?$/, '$1') // Não permite que sejam digitados mais números após os últimos 2 dígitos do CNPJ
    }

    function handleSubmit(e) {
        e.preventDefault()
        // const novoLaboratorio = {
        //     nome: data.nome,
        //     cnpj: data.cnpj,
        // }
        console.log(lab)
        if (!lab.nome) {
            setLabErro('Campo obrigatório')
        } else {
            if (props.editMode) {
                axios
                    .put(`https://gmed.onrender.com/aboratorios/${props.lab.id}`, lab, {
                        headers: { Authorization: `Bearer ${props.isAuth.accessToken}` },
                    })
                    .then((data) => {
                        console.log('Laboratorio atualizado.')
                        props.setToast({ msg: 'Laboratório atualizado.', show: true, title: 'Notificação' })
                        props.setReload((prev) => prev + 1)
                        props.onHide()
                    })
                    .catch((err) => {
                        console.log(err)
                        props.setReload((prev) => prev + 1)
                    })
            } else {
                axios
                    .post('https://gmed.onrender.com/laboratorios', lab, {
                        headers: { Authorization: `Bearer ${props.isAuth.accessToken}` },
                    })
                    .then((data) => {
                        console.log('Laboratorio adicionado.')
                        props.setToast({ msg: 'Laboratório adicionado.', show: true, title: 'Notificação' })
                        props.setReload((prev) => prev + 1)
                        setLab({})
                        props.onHide()
                    })
                    .catch((err) => {
                        console.log(err)
                        props.setReload((prev) => prev + 1)
                    })
            }
        }
    }

    return (
        <Modal {...props} size='md' aria-labelledby='contained-modal-title-vcenter' centered animation={false}>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Modal.Header closeButton>
                    <Modal.Title id='contained-modal-title-vcenter'>Cadastrar laboratório</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#F0F0F0' }}>
                    {/* {errors.valor && <span style={{ color: 'red' }}>Digite um valor diferente de zero</span>} */}
                    <Stack gap={1}>
                        <Form.Group className='mb-3'>
                            <Form.Label>Nome</Form.Label>

                            <Form.Control
                                type='text'
                                value={lab.nome}
                                placeholder='Nome do laboratório'
                                required
                                onChange={(e) => setLab({ ...lab, nome: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Cnpj</Form.Label>
                            <Form.Control
                                type='text'
                                id='cnpj'
                                value={lab.cnpj}
                                placeholder='00.000.000/0000-00'
                                required
                                minLength={18}
                                // maxLength={18}
                                onChange={(e) => {
                                    const formattedCNPJ = formatCNPJ(e.target.value)
                                    setLab({ ...lab, cnpj: formattedCNPJ })
                                }}
                            />
                        </Form.Group>
                    </Stack>{' '}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} variant='secondary'>
                        Cancelar
                    </Button>
                    <Button type='submit'>{props.editMode ? 'Salvar' : 'Adicionar'}</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddLabModal
