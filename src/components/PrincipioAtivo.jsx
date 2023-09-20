import React, { useEffect, useState } from 'react'
import PA from './PA'
import AddPAModal from './AddPAModal'
import { Button, Form, Pagination, Spinner, Stack } from 'react-bootstrap'
import axios from 'axios'
import { FaPlus } from 'react-icons/fa'

function PrincipioAtivo({ pa, setPa, isAuth, reload, setReload, setToast, isSmallScreen }) {
    const [loading, setLoading] = useState(true)
    const [msg, setMsg] = useState('')
    const [paModalShow, setPaModalShow] = useState(false)
    const [dadoFiltrado, setDadoFiltrado] = useState([])
    const [procurar, setProcurar] = useState('')

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 50 // Adjust this to change how many items to display per page

    let indexOfLastItem = currentPage * itemsPerPage
    let indexOfFirstItem = indexOfLastItem - itemsPerPage

    useEffect(() => {
        indexOfLastItem = currentPage * itemsPerPage
        indexOfFirstItem = indexOfLastItem - itemsPerPage
        setDadoFiltrado(pa.slice(indexOfFirstItem, indexOfLastItem))
    }, [currentPage])

    useEffect(() => {
        setLoading(true)
        axios
            .get('https://gmed.onrender.com/pa', { headers: { Authorization: `Bearer ${isAuth.accessToken}` } })
            .then((data) => {
                setPa(data.data)
                setDadoFiltrado(data.data.slice(indexOfFirstItem, indexOfLastItem))
                setLoading(false)
                setMsg('Sem dados.')
            })
            .catch((err) => {
                setMsg('Houve um erro.')
                console.log(err)
            })
    }, [reload])

    useEffect(() => {
        setDadoFiltrado(pa)
        // console.log(filtroPorLab)
        // filtroPorLab > 0 && setDadoFiltrado((prev) => prev.filter((item) => item.id_laboratorio == filtroPorLab))
        // filtroPorPa > 0 && setDadoFiltrado((prev) => prev.filter((item) => item.id_principio_ativo == filtroPorPa))
        // filtroPorCt > 0 && setDadoFiltrado((prev) => prev.filter((item) => item.id_classe_terapeutica == filtroPorCt))
        procurar &&
            setDadoFiltrado((prev) => prev.filter((item) => item.nome.toLowerCase().startsWith(procurar.toLowerCase())))
    }, [procurar])

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <Stack className='p-3'>
            <Stack gap={3} direction='horizontal' className='control-bar p-3 round shadow'>
                <Button className='shadow border' variant='warning' onClick={() => setPaModalShow(true)}>
                    <FaPlus /> Princípio Ativo
                </Button>

                <Form.Control
                    className='w-50'
                    placeholder='Procurar princípio ativo'
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
                        <PA
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

            <Pagination className='mt-2'>
                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                {[...Array(Math.ceil(pa.length / itemsPerPage)).keys()].map((number) => (
                    <Pagination.Item
                        key={number}
                        active={number + 1 === currentPage}
                        onClick={() => handlePageChange(number + 1)}
                    >
                        {number + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === Math.ceil(pa.length / itemsPerPage)}
                />
            </Pagination>

            <AddPAModal
                editMode={false}
                isAuth={isAuth}
                show={paModalShow}
                setReload={setReload}
                onHide={() => setPaModalShow(false)}
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

export default PrincipioAtivo
