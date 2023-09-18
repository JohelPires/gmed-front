import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Tab, Tabs, Toast, ToastContainer } from 'react-bootstrap'
import BarStats from '../components/BarStats'
import Medicamentos from '../components/Medicamentos'
import axios from 'axios'
import Laboratorios from '../components/Laboratorios'
import PrincipioAtivo from '../components/PrincipioAtivo'
import ClasseTerapeutica from '../components/ClasseTerapeutica'
import Info from '../components/Info'
import BarStatsMedPorLab from '../components/BarStatsMedPorLab'
import DonutLabs from '../components/DonutLabs'

function Main({ isAuth, reload, setReload, isSmallScreen }) {
    const [meds, setMeds] = useState([])
    const [ct, setCt] = useState([]) // CLASSES TERAPEUTICAS
    const [labs, setLabs] = useState([]) // LABORATORIOS
    const [pa, setPa] = useState([]) // PRINCIPIOS ATIVOS
    const [toast, setToast] = useState({ show: false, msg: '', title: '' })

    useEffect(() => {
        axios
            .get('https://gmed.onrender.com/ct', { headers: { Authorization: `Bearer ${isAuth.accessToken}` } })
            .then((data) => {
                setCt(data.data)
            })
            .catch((err) => {
                console.log(err)
            })
        axios
            .get('https://gmed.onrender.com/laboratorios', {
                headers: { Authorization: `Bearer ${isAuth.accessToken}` },
            })
            .then((data) => {
                setLabs(data.data)
            })
            .catch((err) => {
                console.log(err)
            })
        axios
            .get('https://gmed.onrender.com/pa', { headers: { Authorization: `Bearer ${isAuth.accessToken}` } })
            .then((data) => {
                setPa(data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [reload])

    return (
        <Row className={isSmallScreen ? 'p-0' : 'p-5 pt-0 pb-0'}>
            <Col className='bg-white round main-shadow'>
                <Tabs defaultActiveKey='med' id='fill-tab-example' className='mb-3 mt-3 fs-5' fill>
                    <Tab eventKey='med' title='Medicamentos'>
                        <Medicamentos
                            ct={ct}
                            labs={labs}
                            pa={pa}
                            setMeds={setMeds}
                            meds={meds}
                            isAuth={isAuth}
                            reload={reload}
                            setReload={setReload}
                            setToast={setToast}
                            isSmallScreen={isSmallScreen}
                        />
                    </Tab>
                    <Tab eventKey='labs' title='Laboratórios'>
                        <Laboratorios
                            labs={labs}
                            setLabs={setLabs}
                            isAuth={isAuth}
                            reload={reload}
                            setReload={setReload}
                            setToast={setToast}
                            isSmallScreen={isSmallScreen}
                        />
                    </Tab>
                    <Tab eventKey='pa' title='Princípio Ativo'>
                        <PrincipioAtivo
                            setPa={setPa}
                            pa={pa}
                            isAuth={isAuth}
                            reload={reload}
                            setReload={setReload}
                            setToast={setToast}
                            isSmallScreen={isSmallScreen}
                        />
                    </Tab>
                    <Tab eventKey='dash' title='Dashboard'>
                        <Container fluid>
                            <Row className='mt-5'>
                                <Col sm={12} md={4}>
                                    <Info meds={meds} labs={labs} pa={pa} reload={reload} />
                                    <BarStats meds={meds} />
                                </Col>
                                <Col sm={12} md={8}>
                                    <BarStatsMedPorLab meds={meds} />
                                    <DonutLabs meds={meds} />
                                </Col>
                            </Row>
                            {/* <Row>
                                <Col sm={12} md={8}>
                                </Col>
                            </Row> */}
                        </Container>
                    </Tab>
                    {/* <Tab eventKey='ct' title='Classes Terapêuticas'>
                        <ClasseTerapeutica
                            // setCt={setCt}
                            ct={ct}
                            isAuth={isAuth}
                            reload={reload}
                            setReload={setReload}
                        />
                    </Tab> */}
                </Tabs>
            </Col>
            {/* <Col lg={4}>
                <Info meds={meds} labs={labs} pa={pa} reload={reload} />
                <BarStats meds={meds} />
                <BarStatsMedPorLab meds={meds} />
                <DonutLabs meds={meds} />
            </Col> */}

            <ToastContainer style={{ position: 'fixed', bottom: '10px', left: '10px' }}>
                <Toast
                    bg='dark'
                    onClose={() => setToast({ ...toast, show: false })}
                    show={toast.show}
                    delay={5000}
                    autohide
                >
                    <Toast.Header>
                        <strong className='me-auto'>{toast.title}</strong>
                        <small>agora</small>
                    </Toast.Header>
                    <Toast.Body className='text-white'>{toast.msg}</Toast.Body>
                </Toast>
            </ToastContainer>
        </Row>
    )
}

export default Main
