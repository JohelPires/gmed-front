import React, { useEffect, useState } from 'react'
import { Container, Form, Stack } from 'react-bootstrap'
import { Bar } from 'react-chartjs-2'

function Info({ meds, reload, labs, pa }) {
    const [total, setTotal] = useState(0)
    // const [filtroPorLab, setFiltroPorLab] = useState(0)
    // const uniqueLaboratoryIds = new Set()
    useEffect(() => {
        setTotal(0)
        meds.map((item) => {
            // console.log(item.quantidade)
            setTotal((prev) => prev + item.quantidade)
        })
    }, [reload, meds])

    // useEffect(() => {
    //     setDadoFiltrado(meds)
    //     // console.log(filtroPorLab)
    //     filtroPorLab > 0 && setDadoFiltrado((prev) => prev.filter((item) => item.id_laboratorio == filtroPorLab))
    //     filtroPorPa > 0 && setDadoFiltrado((prev) => prev.filter((item) => item.id_principio_ativo == filtroPorPa))
    //     filtroPorCt > 0 && setDadoFiltrado((prev) => prev.filter((item) => item.id_classe_terapeutica == filtroPorCt))
    //     filtroAnoVencimento > 0 &&
    //         setDadoFiltrado((prev) =>
    //             prev.filter((item) => parseInt(item.vencimento.slice(0, 4)) === parseInt(filtroAnoVencimento))
    //         )
    //     filtroEstoque && setDadoFiltrado((prev) => prev.filter((item) => item.quantidade < 1000))
    //     // console.log(meds[0].vencimento.slice(0, 4))
    //     filtroVencimento &&
    //         setDadoFiltrado((prev) => prev.filter((item) => parseInt(item.vencimento.slice(0, 4)) === 2023))
    //     procurar &&
    //         setDadoFiltrado((prev) => prev.filter((item) => item.nome.toLowerCase().startsWith(procurar.toLowerCase())))
    // }, [filtroPorLab, filtroPorPa, filtroPorCt, filtroEstoque, filtroVencimento, filtroAnoVencimento, procurar])

    return (
        <Container className='p-4 bg-white round sec-shadow'>
            <div className='transaction_month '>
                <h5>Informações</h5>
            </div>

            <Stack className='p-3'>
                <Stack direction='horizontal'>
                    <h6>Medicamentos Cadastrados: </h6>
                    <h5 className='ms-auto'>{meds && meds.length}</h5>
                </Stack>
                <Stack direction='horizontal'>
                    <h6>Quantidade total de medicamentos: </h6>
                    <h5 className='ms-auto'>{total}</h5>
                </Stack>
                <Stack direction='horizontal'>
                    <h6>Laboratórios cadastrados: </h6>
                    <h5 className='ms-auto'>{labs && labs.length}</h5>
                </Stack>
                <Stack direction='horizontal'>
                    <h6>Princípios ativos registrados: </h6>
                    <h5 className='ms-auto'>{pa && pa.length}</h5>
                </Stack>
            </Stack>
        </Container>
    )
}

export default Info
