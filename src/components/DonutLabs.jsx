import React, { useEffect, useState } from 'react'
import { Container, Form, Stack } from 'react-bootstrap'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'left',
        },
    },
}

function DonutLabs({ meds }) {
    const [totMedsPerLab, setTotMedsPerLab] = useState({})
    const [top, setTop] = useState(5)

    useEffect(() => {
        const result = {}

        meds.forEach((med) => {
            const { laboratorio, quantidade } = med
            if (!result[laboratorio]) {
                result[laboratorio] = quantidade
            } else {
                result[laboratorio] += quantidade
            }
        })

        // Convert the original object to an array of key-value pairs
        const keyValueArray = Object.entries(result)

        // Sort the array in descending order based on quantity values
        keyValueArray.sort((a, b) => b[1] - a[1])

        // Slice the first 9 elements from the sorted array
        const top9Labs = keyValueArray.slice(0, top)

        // Convert the sliced array back into an object
        const resultObject = Object.fromEntries(top9Labs)

        // console.log(resultObject)

        setTotMedsPerLab(resultObject)
    }, [meds, top])

    const data = {
        labels: Object.keys(totMedsPerLab),
        datasets: [
            {
                label: 'Quantidade por laboratório',
                data: Object.values(totMedsPerLab),
                backgroundColor: [
                    'rgb(4, 191, 191)',
                    'rgb(52, 152, 219)',
                    'rgb(121, 154, 224)',
                    'rgb(54, 95, 183)',
                    'rgb(173, 213, 247)',
                    'rgb(14, 234, 255)',
                    'rgb(0, 48, 90)',
                    'rgb(41, 98, 255)',
                    'rgb(53, 71, 140)',
                    'rgb(0, 146, 178)',
                    'rgb(28, 63, 253)',
                    'rgb(2, 8, 115)',
                    'rgb(0, 75, 141)',
                    'rgb(4, 102, 140)',
                    'rgb(2, 136, 209)',
                ],
                borderColor: 'rgba(255, 255, 255, 0.9)',
                borderWidth: 2,
            },
        ],
    }
    return (
        <Container className='bg-white round sec-shadow'>
            <Stack className='p-3'>
                <div className='transaction_month'>
                    <Stack gap={2} direction='horizontal'>
                        <h5>Quantidades por laboratório</h5>
                        <h6 className='ms-auto'>Máximo de</h6>
                        <Form.Control
                            style={{ width: '80px' }}
                            type='number'
                            value={top}
                            onChange={(e) => setTop(e.target.value)}
                        />
                        <h6>Laboratórios</h6>
                    </Stack>
                </div>
                <div className='donut'>
                    {meds.length > 0 ? (
                        <Doughnut style={{ maxHeight: '400px' }} data={data} options={options} />
                    ) : (
                        'Sem dados.'
                    )}
                </div>
            </Stack>
        </Container>
    )
}

export default DonutLabs
