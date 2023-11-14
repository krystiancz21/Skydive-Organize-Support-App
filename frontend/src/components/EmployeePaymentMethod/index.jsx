import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi'
import { BsFillTrashFill } from 'react-icons/bs';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./style.css";

const EmployeePaymentMethod = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [mail, setMail] = useState('');
    const [userRole, setUserRole] = useState('');
    const [payment, setPayment] = useState([]);
    const [newPayment, setNewPayment] = useState('');
    const [error, setError] = useState('');

    //sprawdzamy autoryzacje
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3001/api/auth/employee-plan-jumps')
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

        axios.get('http://localhost:3001/api/payment/showPaymentMethod')
            .then(res => {
                setPayment(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const handleLogout = () => {
        axios.get('http://localhost:3001/api/auth/logout')
            .then(res => {
                window.location.href = "/main";
            }).catch(err => console.log(err));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3001/api/payment/addNewPaymentMethod', { paymentName: newPayment })
            .then(res => {
                if (res.data.error) {
                    setError(res.data.error);
                } else {
                    window.location.reload();
                }
            })
            .catch(err => console.log(err));
    }

    const handleDeletePayment = (paymentId) => {
        axios.post(`http://localhost:3001/api/payment/deletePaymentMethod`, { paymentId: paymentId })
            .then(() => {
                window.location.reload();
            })
            .catch(err => console.log(err));
    }

    // Nawigacja dla poszczególnych ról
    const getNavbar = (role, mail, handleLogout) => {
        switch (role) {
            case 'pracownik':
                return (
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Container>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="/main"><BiHomeAlt /></Nav.Link>
                                    <Nav.Link href="/offer">OFERTA</Nav.Link>
                                    <Nav.Link href="/messages">WIADOMOŚCI</Nav.Link>
                                    <Nav.Link href="/employee-users-accounts">KONTA UŻYTKOWNIKÓW</Nav.Link>
                                </Nav>
                                <Nav.Link href="/userprofile"><Navbar.Brand><AiOutlineUser /> {mail}</Navbar.Brand></Nav.Link>
                                <Button variant="danger" onClick={handleLogout}>WYLOGUJ</Button>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                );
            case 'admin':
                return (
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Container>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto d-flex align-items-center" style={{ fontSize: '14px' }}>
                                    <Nav.Link href="/main"><BiHomeAlt /></Nav.Link>
                                    <Nav.Link href="/offer">OFERTA</Nav.Link>
                                    <Nav.Link href="/messages">WIADOMOŚCI</Nav.Link>
                                    <Nav.Link href="/employee-users-accounts">KONTA UŻYTKOWNIKÓW</Nav.Link>
                                    <Nav.Link href="/owner-financial-overview">PODSUMOWANIE FINANSOWE</Nav.Link>
                                </Nav>
                                <Nav.Link href="/userprofile"><Navbar.Brand><AiOutlineUser /> {mail}</Navbar.Brand></Nav.Link>
                                <Button variant="danger" onClick={handleLogout}>WYLOGUJ</Button>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                );
            default:
                return null;
        }
    }

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
                <>
                    {getNavbar(userRole, mail, handleLogout)}
                    <Container>
                        <h1 className="text-center">ZARZĄDZANIE METODAMI PŁATNOŚCI</h1>
                        <Row className="justify-content-center">
                            <Col xs={12} md={6}>
                                {payment.length > 0 ? (
                                    <ul className="list-unstyled">
                                        {payment.map((item, index) => (
                                            <li key={index} className="d-flex justify-content-between accounts-container">
                                                <span className="payment-name">{item.nazwa}</span>
                                                <BsFillTrashFill
                                                    className="delete-icon pointer-cursor"
                                                    onClick={() => handleDeletePayment(item.sposob_platnosci_id)}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Brak zadeklarowanych metod płatności.</p>
                                )}
                            </Col>
                        </Row>
                        <Row className='justify-content-center'>
                            <hr className="w-50 my-3" />
                        </Row>
                        <Row className="justify-content-center">
                            <Col xs={12} md={6}>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Dodaj nową metodę płatności:</Form.Label>
                                        <FormControl
                                            type="text"
                                            name="paymentName"
                                            onChange={(e) => setNewPayment(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <div className="d-flex justify-content-center mb-5">
                                        <Button variant="success" type="submit" onClick={handleSubmit}>
                                            DODAJ
                                        </Button>
                                    </div>
                                    {error && <div className="alert alert-danger mt-3">{error}</div>}
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                    <div className='pt-5 pb-5'></div>
                    <SmallFooter />
                </>
            ) : (
                // User niezalogowany
                <>
                </>
            )}
        </>
    );
}

export default EmployeePaymentMethod