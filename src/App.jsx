import './App.css'
import Navbar from './components/Navbar'

import { Col, Container, Row } from 'react-bootstrap'
import Main from './telas/Main'
import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './telas/Login'
import Registrar from './telas/Registrar'
import Sobre from './telas/Sobre'
import Perfil from './telas/Perfil'

function App() {
    const [isAuth, setIsAuth] = useState('')
    const [reload, setReload] = useState(0)

    const [isSmallScreen, setIsSmallScreen] = useState(false)

    // Function to check the screen size and update state
    function checkScreenSize() {
        if (window.innerWidth < 768) {
            setIsSmallScreen(true)
        } else {
            setIsSmallScreen(false)
        }
    }

    // Add event listener on component mount to track screen size changes
    useEffect(() => {
        checkScreenSize()
        window.addEventListener('resize', checkScreenSize)

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', checkScreenSize)
        }
    }, [])
    // const [contextValue, setContextValue] = useState('Valor inicial do contexto');

    // useEffect(() => {
    //   // Atualizar o valor do contexto quando a variável triggerUpdate mudar
    //   if (triggerUpdate) {
    //     setContextValue('Novo valor do contexto após a mudança');
    //   }
    // }, [triggerUpdate]);

    return (
        <div className='App'>
            <Container fluid>
                <Row className='navbar main-shadow mb-5'>
                    <Col>
                        <Navbar isAuth={isAuth} setIsAuth={setIsAuth} isSmallScreen={isSmallScreen} />
                        {/* {isAuth && <ControlBar isAuth={isAuth} reload={reload} setReload={setReload} />} */}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Routes>
                            <Route
                                path='/'
                                element={
                                    isAuth ? (
                                        <Main
                                            isAuth={isAuth}
                                            setReload={setReload}
                                            reload={reload}
                                            isSmallScreen={isSmallScreen}
                                        />
                                    ) : (
                                        <Navigate to={'/login'} />
                                    )
                                }
                            />
                            <Route path='gmed-front' element={<Navigate to={'/login'} />} />
                            <Route path='login' element={<Login isAuth={isAuth} setIsAuth={setIsAuth} />} />
                            <Route path='registrar' element={<Registrar isAuth={isAuth} setIsAuth={setIsAuth} />} />
                            <Route path='sobre' element={<Sobre />} />
                            <Route path='perfil' element={<Perfil isAuth={isAuth} setIsAuth={setIsAuth} />} />
                        </Routes>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default App
