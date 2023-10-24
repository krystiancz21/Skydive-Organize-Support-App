import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col, Card, CardGroup, Image } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi'
import { BsFillPersonFill, BsArrowRightShort, BsFillBellFill, BsFillCalendarPlusFill } from 'react-icons/bs';
import { ImCancelCircle } from 'react-icons/im';
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./style.css"


const EmployeeManageJumps = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [mail, setMail] = useState('');
    const [userRole, setUserRole] = useState('');
    const [message, setMessage] = useState('');

    //sprawdzamy autoryzacje
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3001/api/auth/employee-create-account')
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


    return (
        <>
            {isAuth ? (
                <>
                    {/* Wyświetl odpowiednią nawigację w zależności od roli */}
                    {userRole === 'pracownik' && (
                        // User zalogowany
                        <>
                            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                                <Container>
                                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                    <Navbar.Collapse id="responsive-navbar-nav">
                                        <Nav className="me-auto">
                                            <Nav.Link href="/main"><BiHomeAlt /></Nav.Link>
                                            <Nav.Link href="/employeeoffer">OFERTA</Nav.Link>
                                            <Nav.Link href="/messages">WIADOMOŚCI</Nav.Link>
                                            <Nav.Link href="/employeeuseraccounts">KONTA UŻYTKOWNIKÓW</Nav.Link>
                                        </Nav>
                                        <Nav.Link href="/userprofile"><Navbar.Brand><AiOutlineUser /> {mail}</Navbar.Brand></Nav.Link>
                                        <Button variant="danger" onClick={handleLogout}>WYLOGUJ</Button>
                                    </Navbar.Collapse>
                                </Container>
                            </Navbar>
                            <Container className={styles.content}>
                                <h1 className="text-center">ZARZĄDZANIE SKOKAMI</h1>
                                <Row >
                                    <Col className="text-center">
                                        <Link to='/employee-plan-jumps'>
                                            <Button variant="secondary" className="mt-3" id="btn-edit">
                                                <BsFillCalendarPlusFill /> Zaplanuj skoki <BsArrowRightShort />
                                            </Button>
                                        </Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="text-center">
                                        <Link to='/employee-cancel-jumps'>
                                            <Button variant="secondary" className="mt-3" id="btn-jumps">
                                                <ImCancelCircle /> Odwołaj skoki <BsArrowRightShort />
                                            </Button>
                                        </Link>
                                    </Col>
                                </Row>
                            </Container></>
                    )}
                </>
            ) : (
                // User niezalogowany
                <></>
            )}
        </>
    );
}

export default EmployeeManageJumps

