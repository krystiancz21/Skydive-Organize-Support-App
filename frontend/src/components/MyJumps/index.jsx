import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col, Card, CardGroup, Image } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi'
import { BsArrowLeft, BsFillTrashFill, BsPencilSquare } from 'react-icons/bs';
import styles from "./style.css";
import axios from "axios";
import { useEffect, useState } from 'react';

const MyJumps = () => {
    const [error, setError] = useState("")
    const [isAuth, setIsAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [mail, setMail] = useState('');
    const [userRole, setUserRole] = useState('');

    //sprawdzamy autoryzacje
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3001/api/auth/userprofile')
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
        axios.post('http://localhost:3001/api/jumps/showAllMyJumps')
            .then(res => {
                
            })
            .catch(err => console.log(err));
    }, []);

    return (
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
            <h1 className="text-center">MOJE SKOKI</h1>
            <Container className="form-container">
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
                            {/* <select id="rodzajskoku">
                                <option value="Skok samodzielny">Skok samodzielny z licencją</option>
                                <option value="Skok samodzielny">Skok w tandemie</option>
                                <option value="Skok samodzielny">Skok w tandemie z kamerzystą</option>
                            </select> */}
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
            </Container></>
    )
}

export default MyJumps