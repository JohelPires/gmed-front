import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Stack } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

function Perfil({ isAuth, setIsAuth }) {
    const [senhas, setSenhas] = useState({ senha: '', novasenha: '', confirmasenha: '' })
    const [edit, setEdit] = useState(false)
    const [nome, setNome] = useState(isAuth.usuario.nome)

    const navigate = useNavigate()
    useEffect(() => {
        console.log(isAuth.usuario)
    }, [])

    function deletaUsuario() {
        if (window.confirm('Tem certeza que quer deletar sua conta?')) {
            axios
                .delete(`https://gmed.onrender.com/usuario/${isAuth.usuario.id}`, {
                    headers: { Authorization: `Bearer ${isAuth.accessToken}` },
                })
                .then((data) => {
                    console.log(data)
                    setIsAuth('')
                    window.localStorage.clear()
                    navigate('/login')
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    function handleAlterarSenha(e) {
        e.preventDefault()
        if (window.confirm('Tem certeza que quer alterar sua senha?')) {
            console.log(senhas)
            axios
                .put(`https://gmed.onrender.com/usuario/pwd/${isAuth.usuario.id}`, senhas, {
                    headers: { Authorization: `Bearer ${isAuth.accessToken}` },
                })
                .then((data) => {
                    console.log(data)
                    setIsAuth('')
                    window.localStorage.clear()
                    navigate('/login')
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    function handleAlterarNome() {
        console.log(nome)
        if (window.confirm('Tem certeza que quer alterar seu nome?')) {
            axios
                .put(
                    `https://gmed.onrender.com/usuario/${isAuth.usuario.id}`,
                    { nome: nome },
                    {
                        headers: { Authorization: `Bearer ${isAuth.accessToken}` },
                    }
                )
                .then((data) => {
                    console.log(data)
                    setIsAuth('')
                    window.localStorage.clear()
                    navigate('/')
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    return (
        <Container fluid>
            <Row>
                <Col md={2}></Col>
                <Col md={8}>
                    <Link to={'/'} className='text-dark'>
                        <h6 className='m-3 mt-0'>{'< Voltar'}</h6>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col md={2}></Col>
                <Col className='bg-white round main-shadow p-5' md={8}>
                    <Link to={'/'}>Voltar</Link>
                    <h3 className='mb-3'>Perfil</h3>
                    {!edit ? (
                        <Stack direction='horizontal' gap={3} className='mb-2'>
                            <h5 className='m-0'>Nome: {isAuth.usuario.nome}</h5>
                            <Button onClick={(e) => setEdit(true)} variant='outline-secondary' size='sm'>
                                editar
                            </Button>
                        </Stack>
                    ) : (
                        <Stack direction='horizontal' gap={3} className='mb-2'>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                className='w-25'
                                type='text'
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                            <Button onClick={(e) => setEdit(false)} variant='outline-secondary' size='sm'>
                                Cancelar
                            </Button>
                            <Button onClick={(e) => handleAlterarNome(e.target.value)} variant='primary' size='sm'>
                                Confirmar
                            </Button>
                        </Stack>
                    )}
                    <h5>Matrícula: {isAuth.usuario.matricula}</h5>
                    <h5>Email: {isAuth.usuario.email}</h5>
                    <Stack className='w-50'>
                        <Form
                            onSubmit={(e) => handleAlterarSenha(e)}
                            className='border round mt-3 p-3 bg-secondary text-light'
                        >
                            <h5>Alterar senha</h5>
                            <Form.Group className='mb-3' controlId='antiga'>
                                <Form.Label>Senha antiga</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Senha antiga'
                                    value={senhas.senha}
                                    onChange={(e) => setSenhas({ ...senhas, senha: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='nova'>
                                <Form.Label>Nova senha</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Nova senha'
                                    value={senhas.novasenha}
                                    onChange={(e) => setSenhas({ ...senhas, novasenha: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='confirma'>
                                <Form.Label>Confirmar senha</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Confirma senha'
                                    value={senhas.confirmasenha}
                                    onChange={(e) => setSenhas({ ...senhas, confirmasenha: e.target.value })}
                                />
                            </Form.Group>
                            <Button variant='light' type='submit'>
                                Enviar
                            </Button>
                        </Form>
                    </Stack>
                    <Button variant='danger' className='mt-3' onClick={deletaUsuario}>
                        Excluir minha conta
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Perfil
