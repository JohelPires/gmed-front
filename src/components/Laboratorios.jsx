import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form, Spinner, Stack } from 'react-bootstrap'
import Lab from './Lab'
import AddLabModal from './AddLabModal'
import { FaPlus } from 'react-icons/fa'

function Laboratorios({ labs, setLabs, isAuth, reload, setReload, setToast, isSmallScreen }) {
    const [loading, setLoading] = useState(true)
    const [msg, setMsg] = useState('')
    const [labModalShow, setLabModalShow] = useState(false)
    const [dadoFiltrado, setDadoFiltrado] = useState([])
    const [procurar, setProcurar] = useState('')

    useEffect(() => {
        setLoading(true)
        axios
            .get('https://gmed.onrender.com/laboratorios', {
                headers: { Authorization: `Bearer ${isAuth.accessToken}` },
            })
            .then((data) => {
                setLabs(data.data)
                setDadoFiltrado(data.data)
                setLoading(false)
                setMsg('Sem dados.')
            })
            .catch((err) => {
                setMsg('Houve um erro.')
                console.log(err)
            })
    }, [reload])

    useEffect(() => {
        setDadoFiltrado(labs)
        // console.log(filtroPorLab)
        // filtroPorLab > 0 && setDadoFiltrado((prev) => prev.filter((item) => item.id_laboratorio == filtroPorLab))
        // filtroPorPa > 0 && setDadoFiltrado((prev) => prev.filter((item) => item.id_principio_ativo == filtroPorPa))
        // filtroPorCt > 0 && setDadoFiltrado((prev) => prev.filter((item) => item.id_classe_terapeutica == filtroPorCt))
        procurar &&
            setDadoFiltrado((prev) => prev.filter((item) => item.nome.toLowerCase().startsWith(procurar.toLowerCase())))
    }, [procurar])

    return (
        <Stack className='p-3'>
            <Stack gap={3} direction='horizontal' className='control-bar p-3 round shadow'>
                <Button className='shadow border' variant='success' onClick={() => setLabModalShow(true)}>
                    <FaPlus /> Laboratório
                </Button>

                <Form.Control
                    className='w-50'
                    placeholder='Procurar laboratorio'
                    aria-label='medicamento'
                    aria-describedby='basic-addon1'
                    value={procurar}
                    onChange={(e) => setProcurar(e.target.value)}
                />
            </Stack>
            <Stack direction='horizontal' className='transaction_month'>
                <Button
                    // onClick={() => stepMes(0)}
                    variant='link'
                    style={{ color: '#5b5b5b', textDecoration: 'none' }}
                >
                    {/* <h4>Nome:</h4> */}
                </Button>
            </Stack>

            {loading ? (
                <Spinner animation='border' variant='primary' />
            ) : dadoFiltrado.length > 0 ? (
                dadoFiltrado.map((item) => {
                    return (
                        <Lab
                            key={item.id}
                            item={item}
                            isAuth={isAuth}
                            setReload={setReload}
                            setToast={setToast}
                            isSmallScreen={isSmallScreen}
                        />
                    )
                    // return item.nome
                })
            ) : (
                <p>{msg}</p>
            )}

            <AddLabModal
                editMode={false}
                isAuth={isAuth}
                show={labModalShow}
                setReload={setReload}
                onHide={() => setLabModalShow(false)}
                setToast={setToast}
            />
            {/* <AddModal
                ct={ct}
                labs={labs}
                pa={pa}
                setReload={setReload}
                isAuth={isAuth}
                show={modalShow}
                onHide={() => setModalShow(false)}
            /> */}
        </Stack>
    )
}

export default Laboratorios
