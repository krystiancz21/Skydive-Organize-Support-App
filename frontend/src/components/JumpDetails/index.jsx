import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col, Card, CardGroup, Image } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi';
import axios from "axios";
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const JumpDetails = () => {
    const [error, setError] = useState("")
    const [isAuth, setIsAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [mail, setMail] = useState('');
    const [userRole, setUserRole] = useState('');

    const [jumpData, setJumpData] = useState([]);
    const { jumpId } = useParams();

    //sprawdzamy autoryzacje
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3001/api/auth/myjumps')
            .then(res => {
                if (res.data.Status === "Success") {
                    setIsAuth(true);
                    setMail(res.data.mail); //email
                    setUserRole(res.data.userRole); // Ustaw rolę użytkownika
                } else {
                    setIsAuth(false);
                    setMessage(res.data.Error);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleLogout = () => {
        axios.get('http://localhost:3001/api/auth/logout')
            .then(res => {
                // Przekierowanie na stronę główną po wylogowaniu
                window.location.href = "/main";
                //window.location.reload(true);
            }).catch(err => console.log(err));
    }

    useEffect(() => {
        axios.post('http://localhost:3001/api/jumps/showJumpsById', { jumpId: jumpId })
            .then(res => {
                setJumpData(res.data[0]);
                console.log(res.data[0]);
            })
            .catch(err => console.log(err));
    }, [jumpId]);

    const handleResign = () => {
        const rezerwacjaId = jumpData.rezerwacje_id;
    
        // Wywołanie zapytania do usunięcia rezerwacji
        axios.post('http://localhost:3001/api/jumps/resignJump', { rezerwacjaId: rezerwacjaId })
            .then(res => {
                // komunikat czy na prewno usunąć?
                console.log(res.data); // KOMUNIKAT NA FONT ZE POPRAWNIE ZREZYGNOWANO I PRZEKIEROWANIE
                window.location.href = "/myjumps";
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            {isAuth ? (
                // User zalogowany
                <>
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Container>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="/main"><BiHomeAlt /></Nav.Link>
                                    <Nav.Link href="/offer">OFERTA</Nav.Link>
                                    <Nav.Link href="/reservation">TERMINY SKOKÓW</Nav.Link>
                                    <Nav.Link href="/messages">WIADOMOŚCI</Nav.Link>
                                </Nav>
                                <Nav.Link href="#"><Navbar.Brand><AiOutlineUser /> {mail}</Navbar.Brand></Nav.Link>
                                <Button variant="danger" onClick={handleLogout}>WYLOGUJ</Button>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <h1 className="text-center">SZCZEGÓŁY SKOKU</h1>
                    <Container className="form-container">
                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-2">
                                    <Form.Label>Imię</Form.Label>
                                    <FormControl
                                        type="text"
                                        name="imie"
                                        value={jumpData.imie}
                                        disabled
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-2">
                                    <Form.Label>Nazwisko</Form.Label>
                                    <FormControl
                                        type="text"
                                        name="nazwisko"
                                        value={jumpData.nazwisko}
                                        disabled
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-2">
                                    <Form.Label>Rodzaj skoku</Form.Label>
                                    <FormControl
                                        type="text"
                                        name="nazwa"
                                        value={jumpData.nazwa}
                                        disabled
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-2">
                                    <Form.Label>Data skoku</Form.Label>
                                    <FormControl
                                        type="text"
                                        name="data"
                                        value={moment(jumpData.data_czas).format('DD.MM.YYYY')}
                                        disabled

                                    />
                                </Form.Group>
                            </Col>

                            <Col md={4}>
                                <Form.Group className="mb-2">
                                    <Form.Label>Godzina</Form.Label>
                                    <FormControl
                                        type="text"
                                        name="godzina"
                                        value={moment(jumpData.data_czas).format('HH:mm')}
                                        disabled

                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-2">
                                    <Form.Label>Miejsce skoku</Form.Label>
                                    <FormControl
                                        type="text"
                                        name="miejsce_startu"
                                        value={jumpData.miejsce_startu}
                                        disabled
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-2">
                                    <Form.Label>Liczba osób w samolocie</Form.Label>
                                    <FormControl
                                        type="number"
                                        value={jumpData.liczba_miejsc_w_samolocie}
                                        disabled
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-2">
                                    <Form.Label>Sposób zapłaty</Form.Label>
                                    <FormControl
                                        type="text"
                                        value={jumpData.nazwa}
                                        disabled
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{ span: 3, offset: 9 }}>
                                <Form.Group className="mb-2">
                                    <Row>
                                        <Col className="align-self-center text-end">
                                            <span className="do-zaplaty-label">DO ZAPŁATY</span>
                                        </Col>
                                        <Col>
                                            <FormControl
                                                type="text"
                                                name="cena"
                                                value={`${jumpData.cena} PLN`}
                                                disabled
                                            />
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                {jumpData.status_skoku_id === 1 ? (
                                    <>
                                        <Button variant="danger" className="mt-3" id="przycisk" onClick={handleResign}>
                                            REZYGNUJE
                                        </Button>
                                        <Button variant="warning" className='mt-3' id="przycisk">EDYTUJ</Button>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </Col>
                        </Row>
                    </Container></>
            ) : (
                <></> // User niezalogowany
            )}
        </>
    );
}

export default JumpDetails
