import React, { useState } from 'react'
import { Button, Form, Spinner, Stack } from 'react-bootstrap'
import CT from './CT'

function ClasseTerapeutica({ ct, setCt, isAuth, reload, setReload }) {
    const [loading, setLoading] = useState(true)
    const [msg, setMsg] = useState('')
    // const [paModalShow, setPaModalShow] = useState(false)

    // useEffect(() => {
    //     setLoading(true)
    //     axios
    //         .get('https://gmed.onrender.com/ct', { headers: { Authorization: `Bearer ${isAuth.accessToken}` } })
    //         .then((data) => {
    //             setCt(data.data)
    //             setLoading(false)
    //             setMsg('Sem dados.')
    //         })
    //         .catch((err) => {
    //             setMsg('Houve um erro.')
    //             console.log(err)
    //         })
    // }, [reload])

    return (
        <Stack className='p-3'>
            <Stack gap={3} direction='horizontal' className='control-bar p-3 round'>
                {/* <Button variant='outline-light' onClick={() => setPaModalShow(true)}>
                    Cadastrar Princípio Ativo
                </Button> */}

                <Form.Control
                    className='w-50'
                    placeholder='Procurar classe terapeutica'
                    aria-label='ct'
                    aria-describedby='basic-addon1'
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

            {ct.length > 0 ? (
                ct.map((item) => {
                    return <CT key={item.id} item={item} isAuth={isAuth} setReload={setReload} />
                    // return item.nome
                })
            ) : (
                <p>{msg}</p>
            )}
        </Stack>
    )
}

export default ClasseTerapeutica
