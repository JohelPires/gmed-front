import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Sobre() {
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
                    <h3 className='mb-3'>Sobre o GMed</h3>
                    <p>
                        Meu nome é Johel Pires e essa aplicação é o GMed, um Sistema de Gestão de Medicamentos, sistema
                        desenvolvido como trabalho de conclusão do curso FIC-DEV de Programador de Sistemas, utilizando
                        as tecnologias PostgreSQL para banco de dados, Express.js como framework de aplicação web, React
                        como biblioteca de interface de usuário e Node.js como ambiente de execução do lado do servidor.
                    </p>
                </Col>
            </Row>
        </Container>
    )
}

export default Sobre
