import React, { useEffect, useState } from 'react'
import { Container, Form, Stack } from 'react-bootstrap'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        // title: {
        //     display: true,
        //     text: 'Chart.js Bar Chart',
        // },
    },
}

function BarStats({ meds }) {
    const [labels, setLabels] = useState([])
    const [quant, setQuant] = useState([])

    const [ini, setIni] = useState('2023')
    const [fin, setFin] = useState('2028')

    useEffect(() => {
        const medsVencimento = {}
        for (const obj of meds) {
            // console.log(obj)
            const valor = obj.vencimento.slice(0, 4)
            // console.log(valor)
            medsVencimento[valor] = (medsVencimento[valor] || 0) + 1
        }
        console.log(medsVencimento)

        setLabels(Object.keys(medsVencimento))
        setIni('2023')
        setFin('2028')
        setQuant(Object.values(medsVencimento))
    }, [meds])

    console.log(labels, quant)
    console.log(ini, fin)

    // console.log(labels.indexOf(ini), labels.indexOf(fin))
    // console.log(quant[labels.indexOf(ini)], quant[labels.indexOf(fin)])

    // console.log(labels.slice(labels.indexOf(ini), labels.indexOf(fin) + 1))
    // console.log(quant.slice(labels.indexOf(ini), labels.indexOf(fin) + 1))

    const data = {
        labels: labels.slice(labels.indexOf(ini), labels.indexOf(fin) + 1),
        datasets: [
            // {
            //     label: 'Despesas',
            //     data: [4, 5, 6],
            //     backgroundColor: '#E2B13D',
            // },
            {
                label: 'Medicamentos cadastrados',
                data: quant.slice(labels.indexOf(ini), labels.indexOf(fin) + 1),
                backgroundColor: '#3dcabc',

                // backgroundColor: [
                //     '#00d4ff',
                //     '#17d0e6',
                //     '#29cdd2',
                //     '#3dcabc',
                //     '#4dc7aa',
                //     '#5fc496',
                //     '#73c07f',
                //     '#83bd6d',
                //     '#9ab954',
                //     '#acb640',
                //     '#beb32c',
                //     '#c9b120',
                // ],
            },
        ],
    }
    return (
        <Container className='bg-white round sec-shadow'>
            <Stack className='p-3'>
                <div className='transaction_month'>
                    {/* <h5>Quantidades por laboratório</h5> */}
                    <h5>Ano de vencimento</h5>
                    <Stack gap={2} direction='horizontal'>
                        <h6>De</h6>
                        <Form.Select
                            aria-label='Default select example'
                            value={ini}
                            // defaultValue={ini}
                            onChange={(e) => {
                                // console.log(e.target.value)
                                setIni(e.target.value)
                            }}
                        >
                            {/* <option value={ini}>{ini}</option> */}
                            {labels.map((item) => {
                                return (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                )
                            })}
                        </Form.Select>
                        <h6>a</h6>
                        <Form.Select
                            aria-label='Default select example2'
                            value={fin}
                            // defaultValue={fin}
                            onChange={(e) => setFin(e.target.value)}
                        >
                            <option value={fin}>{fin}</option>
                            {labels.map((item, idx) => {
                                return (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                )
                            })}
                        </Form.Select>
                    </Stack>
                </div>
                <Bar options={options} data={data} />
            </Stack>
        </Container>
    )
}

export default BarStats
