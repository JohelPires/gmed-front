import React, { useEffect, useState } from 'react'
import { Button, Container, Dropdown, Form, InputGroup, Spinner, Stack, ToggleButton } from 'react-bootstrap'
// import testData from '../data/testData'
import axios from 'axios'
import { FaFilter, FaCheckSquare, FaChevronLeft, FaChevronRight, FaSquare, FaPlus } from 'react-icons/fa'
import { BsFilter } from 'react-icons/bs'
import Med from './Med'
import AddModal from './AddModal'

function Medicamentos({ ct, labs, pa, isAuth, reload, setReload, setMeds, meds, setToast, isSmallScreen }) {
    const [loading, setLoading] = useState(true)
    const [msg, setMsg] = useState('')
    const [modalShow, setModalShow] = useState(false)
    const [procurar, setProcurar] = useState('')
    const [dadoFiltrado, setDadoFiltrado] = useState([])
    const [checked, setChecked] = useState(false)
    const [filtroPorLab, setFiltroPorLab] = useState(0)
    const [filtroPorPa, setFiltroPorPa] = useState(0)
    const [filtroPorCt, setFiltroPorCt] = useState(0)
    const [filtroEstoque, setFiltroEstoque] = useState(false)
    const [filtroVencimento, setFiltroVencimento] = useState(false)
    const [filtroAnoVencimento, setFiltroAnoVencimento] = useState(0)
    const uniqueLaboratoryIds = new Set()
    const uniquePA = new Set()
    const uniqueCT = new Set()
    const uniqueAno = new Set()

    useEffect(() => {
        setLoading(true)
        axios
            .get('https://gmed.onrender.com/medicamentos', {
                headers: { Authorization: `Bearer ${isAuth.accessToken}` },
            })
            .then((data) => {
                setMeds(data.data)
                setDadoFiltrado(data.data)
                // setDadoFiltrado(data.data.filter((item) => item.nome.toLowerCase().startsWith('outro')))
                // console.log(dadoFiltrado)
                // console.log(data.data)
                setLoading(false)
                setMsg('Sem dados.')
            })
            .catch((err) => {
                setMsg('Houve um erro.')
                console.log(err)
            })
    }, [reload])

    // function handleProcurar(e) {
    //     const filtra = meds.filter((item) => item.nome.toLowerCase().startsWith(e.target.value.toLowerCase()))
    //     setDadoFiltrado(filtra)
    // }

    // function handleFiltrarPorLab(e) {
    //     console.log(e.target.value)
    //     setDadoFiltrado((prev) => prev.filter((item) => item.id_laboratorio == e.target.value))
    // }

    useEffect(() => {
        setDadoFiltrado(meds)
        // console.log(filtroPorLab)
        filtroPorLab > 0 && setDadoFiltrado((prev) => prev.filter((item) => item.id_laboratorio == filtroPorLab))
        filtroPorPa > 0 && setDadoFiltrado((prev) => prev.filter((item) => item.id_principio_ativo == filtroPorPa))
        filtroPorCt > 0 && setDadoFiltrado((prev) => prev.filter((item) => item.id_classe_terapeutica == filtroPorCt))
        filtroAnoVencimento > 0 &&
            setDadoFiltrado((prev) =>
                prev.filter((item) => parseInt(item.vencimento.slice(0, 4)) === parseInt(filtroAnoVencimento))
            )
        filtroEstoque && setDadoFiltrado((prev) => prev.filter((item) => item.quantidade < 1000))
        // console.log(meds[0].vencimento.slice(0, 4))
        filtroVencimento &&
            setDadoFiltrado((prev) => prev.filter((item) => parseInt(item.vencimento.slice(0, 4)) === 2023))
        procurar &&
            setDadoFiltrado((prev) => prev.filter((item) => item.nome.toLowerCase().startsWith(procurar.toLowerCase())))
    }, [filtroPorLab, filtroPorPa, filtroPorCt, filtroEstoque, filtroVencimento, filtroAnoVencimento, procurar])

    useEffect(() => {
        if (!checked) {
            setFiltroPorLab(0)
            setFiltroPorPa(0)
            setFiltroPorCt(0)
            setFiltroEstoque(false)
            setFiltroVencimento(false)
        }
    }, [checked])

    return (
        <Stack className='p-3'>
            <Stack gap={3} className='control-bar p-3 round'>
                <Stack gap={3} direction='horizontal'>
                    <Button variant='light' onClick={() => setModalShow(true)}>
                        Cadastrar medicamento
                    </Button>

                    <Form.Control
                        className='w-50'
                        placeholder='Procurar medicamento'
                        aria-label='medicamento'
                        aria-describedby='basic-addon1'
                        value={procurar}
                        onChange={(e) => setProcurar(e.target.value)}
                    />

                    <ToggleButton
                        className='ms-auto'
                        id='toggle-check'
                        type='checkbox'
                        variant='outline-light'
                        checked={checked}
                        value='1'
                        onChange={(e) => setChecked(e.currentTarget.checked)}
                    >
                        <FaFilter /> Filtrar
                    </ToggleButton>
                </Stack>
                {checked && (
                    <Stack gap={2}>
                        <Form.Select
                            defaultValue={0}
                            aria-label='Default select example'
                            onChange={(e) => setFiltroPorLab(e.target.value)}
                        >
                            <option value={0}>Filtrar por laboratório...</option>
                            {/* {labs &&
                                labs.map((item) => {
                                    return <option value={item.id}>{item.nome}</option>
                                })} */}
                            {meds &&
                                meds.map((item) => {
                                    if (!uniqueLaboratoryIds.has(item.id_laboratorio)) {
                                        // Check if the ID is unique
                                        uniqueLaboratoryIds.add(item.id_laboratorio) // Add the ID to the Set if it's unique
                                        return (
                                            <option key={item.id} value={item.id_laboratorio}>
                                                {item.laboratorio}
                                            </option>
                                        )
                                    }
                                    return null // Return null for repeated IDs to skip rendering duplicate options
                                })}
                        </Form.Select>
                        <Form.Select
                            defaultValue={0}
                            aria-label='Default select example'
                            onChange={(e) => setFiltroPorPa(e.target.value)}
                        >
                            <option value={0}>Filtrar por princípio ativo...</option>
                            {/* {pa &&
                                pa.map((item) => {
                                    return <option value={item.id}>{item.nome}</option>
                                })} */}
                            {meds &&
                                meds.map((item) => {
                                    if (!uniquePA.has(item.id_principio_ativo)) {
                                        // Check if the ID is unique
                                        uniquePA.add(item.id_principio_ativo) // Add the ID to the Set if it's unique
                                        return (
                                            <option key={item.id} value={item.id_principio_ativo}>
                                                {item.principioativo}
                                            </option>
                                        )
                                    }
                                    return null // Return null for repeated IDs to skip rendering duplicate options
                                })}
                        </Form.Select>
                        <Form.Select
                            defaultValue={0}
                            aria-label='Default select example'
                            onChange={(e) => setFiltroPorCt(e.target.value)}
                        >
                            <option>Filtrar por classe terapeutica...</option>
                            {/* {ct &&
                                ct.map((item) => {
                                    return (
                                        <option value={item.id}>
                                            {item.codigo} - {item.nome}
                                        </option>
                                    )
                                })} */}
                            {meds &&
                                meds.map((item) => {
                                    if (!uniqueCT.has(item.id_classe_terapeutica)) {
                                        // Check if the ID is unique
                                        uniqueCT.add(item.id_classe_terapeutica) // Add the ID to the Set if it's unique
                                        return (
                                            <option key={item.id} value={item.id_classe_terapeutica}>
                                                {item.classeterapeutica}
                                            </option>
                                        )
                                    }
                                    return null // Return null for repeated IDs to skip rendering duplicate options
                                })}
                        </Form.Select>
                        <Stack gap={4} direction='horizontal'>
                            <Form.Check
                                className='text-white'
                                type='checkbox'
                                label='estoque baixo'
                                id='estoque'
                                onChange={(e) => setFiltroEstoque(e.target.checked)}
                            />
                            <Form.Check
                                className='text-white'
                                type='checkbox'
                                label='vencimento próximo'
                                id='vencimento'
                                onChange={(e) => setFiltroVencimento(e.target.checked)}
                            />
                            <Form.Select
                                className='w-50 ms-auto'
                                // defaultValue={0}
                                aria-label='Default select example'
                                onChange={(e) => setFiltroAnoVencimento(e.target.value)}
                            >
                                <option>Filtrar por ano de vencimento...</option>
                                {/* {ct &&
                                ct.map((item) => {
                                    return (
                                        <option value={item.id}>
                                            {item.codigo} - {item.nome}
                                        </option>
                                    )
                                })} */}

                                {meds &&
                                    meds.map((item) => {
                                        if (!uniqueAno.has(item.vencimento.slice(0, 4))) {
                                            // Check if the ID is unique
                                            uniqueAno.add(item.vencimento.slice(0, 4)) // Add the ID to the Set if it's unique
                                            return (
                                                <option key={item.id} value={item.vencimento.slice(0, 4)}>
                                                    {item.vencimento.slice(0, 4)}
                                                </option>
                                            )
                                        }
                                        return null // Return null for repeated IDs to skip rendering duplicate options
                                    })}
                            </Form.Select>
                        </Stack>
                    </Stack>
                )}
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
            {/* <Stack style={{ overflow: 'auto', height: '600px' }}> */}
            <Stack>
                <Stack gap={3} direction='horizontal' className='border-bottom mb-3'>
                    <h5 className='w-25'>Nome</h5>
                    {!isSmallScreen && <h5>Princípio Ativo</h5>}
                </Stack>
                {loading ? (
                    <Spinner animation='border' variant='primary' />
                ) : dadoFiltrado.length > 0 ? (
                    dadoFiltrado.map((item) => {
                        return (
                            <Med
                                key={item.id}
                                item={item}
                                ct={ct}
                                labs={labs}
                                pa={pa}
                                isAuth={isAuth}
                                setReload={setReload}
                                setToast={setToast}
                                isSmallScreen={isSmallScreen}
                            />
                        )
                    })
                ) : (
                    <p>{msg}</p>
                )}
            </Stack>

            <AddModal
                ct={ct}
                labs={labs}
                pa={pa}
                setReload={setReload}
                isAuth={isAuth}
                show={modalShow}
                onHide={() => setModalShow(false)}
                setToast={setToast}
            />
        </Stack>
    )
}

export default Medicamentos
