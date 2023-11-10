import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col, Card, CardGroup, Image } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi'
import styles from "./style.css";
import axios from "axios";
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const MyJumps = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [mail, setMail] = useState('');
    const [userRole, setUserRole] = useState('');

    // const [myJumps, setMyJumps] = useState([]);
    const [currentJumps, setCurrentJumps] = useState([]);
    const [archivalJumps, setArchivalJumps] = useState([]);
    const [isChecked, setIsChecked] = useState(true);

    const handleSwitchChange = () => {
        setIsChecked(!isChecked);
    };

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
        axios.post('http://localhost:3001/api/jumps/showCurrentMyJumpsByMail', { mail: mail })
            .then(res => {
                setCurrentJumps(res.data);
            })
            .catch(err => console.log(err));

        axios.post('http://localhost:3001/api/jumps/showArchivalMyJumpsByMail', { mail: mail })
            .then(res => {
                setArchivalJumps(res.data);
            })
            .catch(err => console.log(err));
    }, [mail]);

    const SmallFooter = () => {
        const year = new Date().getFullYear();

        return (
            <footer className="text-center footer fixed-bottom">
                <p className="m-0 stopa">System wspomagający organizację skoków spadochronowych | Autorzy: Krystian Czapla, Kacper Czajka, Mariusz Choroś | &copy; {year}</p>
            </footer>
        );
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
                                    <Nav.Link href="/jump-dates">TERMINY SKOKÓW</Nav.Link>
                                    <Nav.Link href="/messages">WIADOMOŚCI</Nav.Link>
                                </Nav>
                                <Nav.Link href="#"><Navbar.Brand><AiOutlineUser /> {mail}</Navbar.Brand></Nav.Link>
                                <Button variant="danger" onClick={handleLogout}>WYLOGUJ</Button>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <h1 className="text-center">MOJE SKOKI</h1>
                    <Container>
                        <Row className='mb-3'>
                            <Col className="d-flex justify-content-center align-items-center">
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label={isChecked ? 'Aktualne' : 'Archiwalne'}
                                    checked={isChecked}
                                    onChange={handleSwitchChange}
                                />
                            </Col>
                        </Row>
                        {/* {myJumps.length > 0 ? (
                            <>
                                {myJumps.map((item, index) => (
                                    <Row key={index} className="accounts-container mx-auto text-center mb-3">
                                        <Col md={4} className='mt-2'>{item.nazwa}</Col>
                                        <Col md={4} className='mt-2'>{moment(item.data_czas).format('DD.MM.YYYY HH:mm')}</Col>
                                        <Col md={4}>
                                            <Link to={`/jump-details/${item.rezerwacje_id}`}>
                                                <Button variant="success">Szczegóły</Button>
                                            </Link>
                                        </Col>
                                    </Row>
                                ))}
                            </>
                        ) : (
                            <>
                                <p className="text-center">
                                    Tutaj nic nie ma...
                                </p>
                            </>
                        )} */}
                        {isChecked ? (
                            currentJumps.length > 0 ? (
                                <>
                                    {currentJumps.map((item, index) => (
                                        // Mapowanie skoków aktualnych
                                        <Row key={index} className="accounts-container mx-auto text-center mb-3">
                                            <Col md={4} className='mt-2'>{item.nazwa}</Col>
                                            <Col md={4} className='mt-2'>{moment(item.data_czas).format('DD.MM.YYYY HH:mm')}</Col>
                                            <Col md={4}>
                                                <Link to={`/jump-details/${item.rezerwacje_id}`}>
                                                    <Button variant="success">Szczegóły</Button>
                                                </Link>
                                            </Col>
                                        </Row>
                                    ))}
                                </>
                            ) : (
                                <p className="text-center">Tutaj nic nie ma...</p>
                            )
                        ) : (
                            archivalJumps.length > 0 ? (
                                <>
                                    {archivalJumps.map((item, index) => (
                                        // Mapowanie skoków archiwalnych
                                        <Row key={index} className="accounts-container mx-auto text-center mb-3">
                                            <Col md={4} className='mt-2'>{item.nazwa}</Col>
                                            <Col md={4} className='mt-2'>{moment(item.data_czas).format('DD.MM.YYYY HH:mm')}</Col>
                                            <Col md={4}>
                                                <Link to={`/jump-details/${item.rezerwacje_id}`}>
                                                    <Button variant="success">Szczegóły</Button>
                                                </Link>
                                            </Col>
                                        </Row>
                                    ))}
                                </>
                            ) : (
                                <p className="text-center">Tutaj nic nie ma...</p>
                            )
                        )}
                    </Container>
                    <SmallFooter />

                    {/* <Container className="form-container">
                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-2">
                                    <Form.Label>Imię</Form.Label>
                                    <FormControl
                                        type="text"
                                        name="name"
                                        disabled
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-2">
                                    <Form.Label>Nazwisko</Form.Label>
                                    <FormControl
                                        type="text"
                                        name="surname"
                                        disabled
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-2">
                                    <Form.Label for="rodzajskoku">Rodzaj skoku</Form.Label>
                                    <FormControl
                                        type="text"
                                        name="type"
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
                                        type="date"
                                        name="date"
                                        disabled

                                    />
                                </Form.Group>
                            </Col>

                            <Col md={4}>
                                <Form.Group className="mb-2">
                                    <Form.Label>Godzina</Form.Label>
                                    <FormControl
                                        type="text"
                                        disabled

                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-2">
                                    <Form.Label>Miejsce skoku</Form.Label>
                                    <FormControl
                                        type="text"
                                        placeholder="Lublin"
                                        disabled
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-2">
                                    <Form.Label>Liczba osób w samolocie</Form.Label>
                                    <FormControl
                                        type="number"
                                        disabled
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-2">
                                    <Form.Label>Sposób zapłaty</Form.Label>
                                    <FormControl
                                        type="text"
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
                                                disabled
                                            />
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Button variant="danger" className="mt-3" id="przycisk">REZYGNUJE</Button>
                                <Button variant="warning" className='mt-3' id="przycisk">EDYTUJ</Button>
                                <Button variant="success" className="mt-3" id="przycisk">POTWIERDŹ SKOK</Button>
                            </Col>
                        </Row>
                    </Container>*/}
                </>
            ) : (
                <></> // User niezalogowany
            )}
        </>
    );
}

export default MyJumps
