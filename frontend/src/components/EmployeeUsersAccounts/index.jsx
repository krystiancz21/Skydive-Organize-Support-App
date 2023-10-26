import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col, Card, CardGroup, Image } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi'
import { BsArrowLeft, BsPersonCircle, BsArrowRight } from 'react-icons/bs';
import styles from "./style.css"
import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from "axios";

const EmployeeUsersAccounts = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [mail, setMail] = useState('');
    const [userRole, setUserRole] = useState('');
    const [clientsData, setClientsData] = useState([]);
    const [employeeData, setEmployeeData] = useState([]);

    //sprawdzamy autoryzacje
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3001/api/auth/employee-users-accounts')
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
                window.location.href = "/main";
            }).catch(err => console.log(err));
    }

    // Konta klientów
    useEffect(() => {
        axios.get('http://localhost:3001/api/user/showUserAccounts')
            .then(res => {
                if (res.status === 200) {
                    setClientsData(res.data);
                    //setEmployeeData(res.data);
                } else {
                    console.error('Błąd statusu HTTP:', res.status);
                }
            })
            .catch(err => console.error('Wystąpił błąd podczas pobierania danych użytkowników:', err));
    }, [isAuth]);

    // Konta pracowników
    useEffect(() => {
        axios.get('http://localhost:3001/api/user/showEmployeeAccounts')
            .then(res => {
                if (res.status === 200) {
                    //setClientsData(res.data);
                    setEmployeeData(res.data);
                } else {
                    console.error('Błąd statusu HTTP:', res.status);
                }
            })
            .catch(err => console.error('Wystąpił błąd podczas pobierania danych pracowników:', err));
    }, [isAuth]);

    return (
        <>
            {isAuth ? (
                <>
                    {userRole === 'pracownik' && (
                        <><Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                            <Container>
                                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                <Navbar.Collapse id="responsive-navbar-nav">
                                    <Nav className="me-auto">
                                        <Nav.Link href="/main"><BiHomeAlt /></Nav.Link>
                                        <Nav.Link href="/offer">OFERTA</Nav.Link>
                                        <Nav.Link href="/messages">WIADOMOŚCI</Nav.Link>
                                        <Nav.Link href="/employeemanagejumps">ZARZĄDZANIE SKOKAMI</Nav.Link>
                                    </Nav>
                                    <Nav.Link href="/userprofile"><Navbar.Brand><AiOutlineUser /> {mail}</Navbar.Brand></Nav.Link>
                                    <Button variant="danger" onClick={handleLogout}>WYLOGUJ</Button>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                            <Container className={styles.content}>
                                <Row>
                                    <h1 className="text-center">KONTA UŻYTKOWNIKÓW</h1>
                                </Row>
                                <Row>
                                    {clientsData.length > 0 && (
                                        <>
                                            {clientsData.map((clients, index) => (
                                                <Row key={index} className="accounts-container mb-3">
                                                    <Col className='mt-2'><BsPersonCircle /></Col>
                                                    <Col className='mt-2'>{clients.imie}</Col>
                                                    <Col className='mt-2'>{clients.nazwisko}</Col>
                                                    <Col className='mt-2'>{clients.mail}</Col>
                                                    <Col>
                                                        <Link to={`/employee-edit-account/${clients.user_id}`}>
                                                            <Button variant="success">Zarządzaj kontem <BsArrowRight /></Button>
                                                        </Link>
                                                    </Col>
                                                </Row>
                                            ))}
                                        </>
                                    )}
                                </Row>
                                <Row className="mt-3">
                                    <Col className="text-center">
                                        <h3>Dodaj nowego użytkownika</h3>
                                        <Link to={`/employee-create-account`}>
                                            <Button variant="success" className="mt-3">UTWÓRZ KONTO</Button>
                                        </Link>
                                    </Col>
                                </Row>
                            </Container>
                        </>
                    )}
                    {userRole === 'admin' && (
                        <><Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                            <Container>
                                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                <Navbar.Collapse id="responsive-navbar-nav">
                                    <Nav className="me-auto">
                                        <Nav.Link href="/main"><BiHomeAlt /></Nav.Link>
                                        <Nav.Link href="/offer">OFERTA</Nav.Link>
                                        <Nav.Link href="/messages">WIADOMOŚCI</Nav.Link>
                                        <Nav.Link href="/employeemanagejumps">ZARZĄDZANIE SKOKAMI</Nav.Link>
                                        <Nav.Link href="/owner-financial-overview">PODSUMOWANIE FINANSOWE</Nav.Link>
                                    </Nav>
                                    <Nav.Link href="/userprofile"><Navbar.Brand><AiOutlineUser /> {mail}</Navbar.Brand></Nav.Link>
                                    <Button variant="danger" onClick={handleLogout}>WYLOGUJ</Button>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                            <Container className={styles.content}>
                                <Row>
                                    <h1 className="text-center">KONTA PRACOWNIKÓW</h1>
                                </Row>
                                <Row>
                                    {employeeData.length > 0 && (
                                        <>
                                            {employeeData.map((employee, index) => (
                                                <Row key={index} className="accounts-container mb-3">
                                                    <Col className='mt-2'><BsPersonCircle /></Col>
                                                    <Col className='mt-2'>{employee.imie}</Col>
                                                    <Col className='mt-2'>{employee.nazwisko}</Col>
                                                    <Col className='mt-2'>{employee.mail}</Col>
                                                    <Col>
                                                        <Link to={`/employee-edit-account/${employee.user_id}`}>
                                                            <Button variant="success">Zarządzaj kontem <BsArrowRight /></Button>
                                                        </Link>
                                                    </Col>
                                                </Row>
                                            ))}
                                        </>
                                    )}
                                </Row>
                                <Row>
                                    <h1 className="text-center">KONTA KLIENTÓW</h1>
                                </Row>
                                <Row>
                                    {clientsData.length > 0 && (
                                        <>
                                            {clientsData.map((clients, index) => (
                                                <Row key={index} className="accounts-container mb-3">
                                                    <Col className='mt-2'><BsPersonCircle /></Col>
                                                    <Col className='mt-2'>{clients.imie}</Col>
                                                    <Col className='mt-2'>{clients.nazwisko}</Col>
                                                    <Col className='mt-2'>{clients.mail}</Col>
                                                    <Col>
                                                        <Link to={`/employee-edit-account/${clients.user_id}`}>
                                                            <Button variant="success">Zarządzaj kontem <BsArrowRight /></Button>
                                                        </Link>
                                                    </Col>
                                                </Row>
                                            ))}
                                        </>
                                    )}
                                </Row>
                                <Row className="mt-3">
                                    <Col className="text-center">
                                        <h3>Dodaj nowego użytkownika</h3>
                                        <Link to={`/employee-create-account`}>
                                            <Button variant="success" className="mt-3">UTWÓRZ KONTO</Button>
                                        </Link>
                                    </Col>
                                </Row>
                            </Container>
                        </>
                    )}
                </>
            ) : (
                // User niezalogowany
                <></>
            )}
        </>
    );
}

export default EmployeeUsersAccounts;
