import axios from 'axios'
import React, { useState } from 'react'
import { Alert, Button, Col, Container, FloatingLabel, Form, Row, Stack } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

function Registrar({ setIsAuth }) {
    const [novousuario, setNovousuario] = useState({})
    const [senha, setSenha] = useState('')
    const navigate = useNavigate()
    const [erro, setErro] = useState('')

    function handleRegistrar(e) {
        e.preventDefault()
        if (novousuario.senha === senha) {
            axios
                .post('https://gmed.onrender.com/usuario/registrar', novousuario)
                .then((data) => {
                    console.log(data)
                    navigate('/login')
                })
                .catch((err) => {
                    console.log(err)
                    setErro('Houve um erro.')
                })
        }
    }

    return (
        <Container>
            <Row className='p-3'>
                <Col md={7}></Col>
                <Col className='bg-white round main-shadow'>
                    <Form className=' p-4' onSubmit={handleRegistrar}>
                        <div className='transaction_month'>
                            <h3>Registrar</h3>
                        </div>
                        <FloatingLabel controlId='floatingNome' label='Seu nome' className='mb-3 mt-4'>
                            <Form.Control
                                size='sm'
                                type='text'
                                placeholder='Nome'
                                required
                                onChange={(e) => setNovousuario({ ...novousuario, nome: e.target.value })}
                            />
                        </FloatingLabel>
                        <FloatingLabel controlId='floatingMatricula' label='Matrícula' className='mb-3 mt-4'>
                            <Form.Control
                                size='sm'
                                type='text'
                                placeholder='Matrícula'
                                required
                                onChange={(e) => setNovousuario({ ...novousuario, matricula: e.target.value })}
                            />
                        </FloatingLabel>
                        <FloatingLabel controlId='floatingEmail' label='E-mail' className='mb-3 mt-4'>
                            <Form.Control
                                size='sm'
                                type='email'
                                placeholder='nome@exemplo.com'
                                required
                                onChange={(e) => setNovousuario({ ...novousuario, email: e.target.value })}
                            />
                        </FloatingLabel>
                        <FloatingLabel controlId='floatingPassword' label='Senha' className='mb-3 mt-4'>
                            <Form.Control
                                size='sm'
                                type='password'
                                placeholder='senha'
                                onChange={(e) => setNovousuario({ ...novousuario, senha: e.target.value })}
                            />
                        </FloatingLabel>
                        <FloatingLabel className='mb-3 mt-4' controlId='floatingPassword2' label='Confirmar Senha'>
                            <Form.Control
                                size='sm'
                                type='password'
                                placeholder='senha'
                                onChange={(e) => {
                                    setSenha(e.target.value)
                                    if (e.target.value !== novousuario.senha) {
                                        setErro('Senhas não conferem.')
                                    } else {
                                        setErro('')
                                    }
                                }}
                            />
                        </FloatingLabel>
                        {erro && <Alert variant='danger'>{erro}</Alert>}
                        <Stack gap={2}>
                            <Button className='mt-4' type='submit'>
                                Registrar
                            </Button>
                            <Link to={'/login'}>Já é usuário? Faça login</Link>
                        </Stack>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Registrar
