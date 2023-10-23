import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col, Card, CardGroup, Image } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi'
import { BsArrowRightShort } from 'react-icons/bs';
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";

import styles from "./style.css"
import obraz from '../Images/obraz.jpg';


const Main = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [mail, setMail] = useState('');
    const [userRole, setUserRole] = useState('');

    //sprawdzamy autoryzacje
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3001/api/auth/main')
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
                    {userRole === 'klient' && (
                        // User zalogowany
                        <>
                            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                                <Container>
                                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                    <Navbar.Collapse id="responsive-navbar-nav">
                                        <Nav className="me-auto">
                                            <Nav.Link href="/main"><BiHomeAlt /></Nav.Link>
                                        </Nav>
                                        <Nav.Link href="/userprofile"><Navbar.Brand><AiOutlineUser />  {mail}</Navbar.Brand></Nav.Link>
                                        <Button variant="danger" onClick={handleLogout}>WYLOGUJ</Button>
                                    </Navbar.Collapse>
                                </Container>
                            </Navbar>
                            <Container className={styles.content}>
                                <h1 className="text-center my-4">STRONA GŁÓWNA</h1>
                                <CardGroup>
                                    <Card>
                                        <Card.Img variant="top" src={obraz} alt="img-oferta" />
                                        <Card.Body>
                                            <Card.Title><Button variant="primary" size="sm" href="/offer">OFERTA <BsArrowRightShort /></Button></Card.Title>
                                        </Card.Body>
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src={obraz} alt="img-terminy" />
                                        <Card.Body>
                                            <Card.Title><Button variant="primary" size="sm" href="/reservation">TERMINY SKOKÓW <BsArrowRightShort /></Button></Card.Title>
                                        </Card.Body>
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src={obraz} alt="img-wiadomosci" />
                                        <Card.Body>
                                            <Card.Title><Button variant="primary" size="sm" href="/messages">WIADOMOŚCI <BsArrowRightShort /> </Button></Card.Title>
                                        </Card.Body>
                                    </Card>
                                </CardGroup>
                            </Container>
                        </>
                    )}
                    {userRole === 'pracownik' && (
                        <>
                            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                                <Container>
                                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                    <Navbar.Collapse id="responsive-navbar-nav">
                                        <Nav className="me-auto">
                                            <Nav.Link href="/main"><BiHomeAlt /></Nav.Link>
                                        </Nav>
                                        <Nav.Link href="/userprofile"><Navbar.Brand><AiOutlineUser /> {mail}</Navbar.Brand></Nav.Link>
                                        <Button variant="danger" onClick={handleLogout}>WYLOGUJ</Button>
                                    </Navbar.Collapse>
                                </Container>
                            </Navbar>
                            <Container className={styles.content}>
                                <h1 className="text-center">STRONA GŁÓWNA</h1>
                                <CardGroup>
                                    <Row>
                                        <Col>
                                            <Card>
                                                <Card.Img variant="top" src={obraz} alt="img-oferta" />
                                                <Card.Body>
                                                    <Card.Title><Button variant="primary" size="sm" href="/messages">WIADOMOŚCI <BsArrowRightShort /></Button></Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col>
                                            <Card>
                                                <Card.Img variant="top" src={obraz} alt="img-terminy" />
                                                <Card.Body>
                                                    <Card.Title><Button variant="primary" size="sm" href="/employee-users-accounts">KONTA KLIENTÓW <BsArrowRightShort /></Button></Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Card>
                                                <Card.Img variant="top" src={obraz} alt="img-wiadomosci" />
                                                <Card.Body>
                                                    <Card.Title><Button variant="primary" size="sm" href="/offer">OFERTA <BsArrowRightShort /> </Button></Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col>
                                            <Card>
                                                <Card.Img variant="top" src={obraz} alt="img-wiadomosci" />
                                                <Card.Body>
                                                    <Card.Title><Button variant="primary" size="sm" href="/employee-manage-jumps">ZARZĄDZANIE SKOKAMI <BsArrowRightShort /> </Button></Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </CardGroup>
                            </Container></>
                    )}
                    {userRole === 'admin' && (
                        <>
                            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                                <Container>
                                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                    <Navbar.Collapse id="responsive-navbar-nav">
                                        <Nav className="me-auto">
                                            <Nav.Link href="/main"><BiHomeAlt /></Nav.Link>
                                        </Nav>
                                        <Nav.Link href="/userprofile"><Navbar.Brand><AiOutlineUser /> {mail}</Navbar.Brand></Nav.Link>
                                        <Button variant="danger" onClick={handleLogout}>WYLOGUJ</Button>
                                    </Navbar.Collapse>
                                </Container>
                            </Navbar>
                            <Container className={styles.content}>
                                <h1 className="text-center">STRONA GŁÓWNA</h1>
                                <CardGroup>
                                    <Card>
                                        <Card.Img variant="top" src={obraz} alt="img-oferta" className="p-2" />
                                        <Card.Body>
                                            <Card.Title><Button variant="primary" size="sm" href='#'>GRAFIK SKOKÓW <BsArrowRightShort /></Button></Card.Title>
                                        </Card.Body>
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src={obraz} alt="img-terminy" className="p-2" />
                                        <Card.Body>
                                            <Card.Title><Button variant="primary" size="sm" href='/owner-create-account'>KONTA PRACOWNIKÓW <BsArrowRightShort /></Button></Card.Title>
                                        </Card.Body>
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src={obraz} alt="img-wiadomosci" className="p-2" />
                                        <Card.Body>
                                            <Card.Title><Button variant="primary" size="sm" href='/owner-financial-overview'>PODSUMOWANIE FINANSOWE <BsArrowRightShort /> </Button></Card.Title>
                                        </Card.Body>
                                    </Card>
                                </CardGroup>
                            </Container></>
                    )}
                </>
            ) : (
                // User niezalogowany
                <>
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Container>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="/main"><BiHomeAlt /></Nav.Link>
                                </Nav>
                                <Link to="/login">
                                    <Button variant="success">ZALOGUJ</Button>
                                </Link>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <Container className={styles.content}>
                        <h1 className="text-center">STRONA GŁÓWNA</h1>
                        <h2>{message}</h2>
                        <CardGroup>
                            <Card>
                                <Card.Img variant="top" src={obraz} alt="img-oferta" style={{ width: '200px', height: '200px' }} />
                                <Card.Body>
                                    <Card.Title><Link to="/offer"><Button variant="primary" size="sm"> OFERTA <BsArrowRightShort /></Button></Link></Card.Title>
                                </Card.Body>
                            </Card>
                        </CardGroup>
                    </Container>
                </>
            )}
        </>
    );
}

export default Main