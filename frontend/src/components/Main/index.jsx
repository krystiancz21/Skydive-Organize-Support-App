import { Container, Nav, Navbar, Button, Row, Col, Card, CardGroup, Carousel } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi'
import { BsArrowRightShort } from 'react-icons/bs';
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";

import styles from "./style.css"
import m1 from '../Images/main1.jpg';
import m2 from '../Images/main2.jpg';
import m3 from '../Images/main3.jpg';
import logo from '../Images/logo.jpg';
import offer from '../Images/offer.jpg';
import terminy from '../Images/terminy.jpg';
import messages from '../Images/messages.jpg';
import usericon from '../Images/usericon.png';
import podsumowanie from '../Images/podsumowanie.jpg';

const Karuzela = () => (
    <Carousel className="custom-carousel">
        <Carousel.Item>
            <img
                className="d-block w-100"
                src={m1}
                alt="First slide"
                title="Skydiving jump 1"
            />
        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block w-100"
                src={m2}
                alt="Second slide"
            />
        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block w-100"
                src={m3}
                alt="Third slide"
            />
        </Carousel.Item>
    </Carousel>
);

const Stopka = () => (
    <footer className="big-footer mt-5">
        <Container fluid>
            <Row>
                <Col md={4} className="d-flex flex-column align-items-center text-center">
                    <div className='logo'>
                        {/*https://www.vecteezy.com/vector-art/17127793-parachute-logo-icon-design-and-symbol-skydiving-vector */}
                        <img src={logo} alt="Logo" />
                    </div>
                    <p>&copy; 2023 System wspomagający organizację skoków spadochronowych</p>
                </Col>
                <Col md={4} className="d-flex justify-content-center">
                    <div>
                        <h4>Szybkie linki</h4>
                        <ul className="list-unstyled">
                            <li><a href="/main">Strona główna</a></li>
                            <li><a href="/offer">Oferta</a></li>
                            <li><a href="/jump-dates">Terminy skoków</a></li>
                            <li><a href="/messages">Wiadomości</a></li>
                        </ul>
                    </div>
                </Col>
                <Col md={4} className="d-flex justify-content-center">
                    <div>
                        <h4>Autorzy</h4>
                        <p>Krystian Czapla</p>
                        <p>Kacper Czajka</p>
                        <p>Mariusz Choroś</p>
                    </div>
                </Col>
            </Row>
        </Container>
    </footer>
);

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
                                            <Nav.Link href="/offer">OFERTA</Nav.Link>
                                            <Nav.Link href="/jump-dates">TERMINY SKOKÓW</Nav.Link>
                                            <Nav.Link href="/messages">WIADOMOŚCI</Nav.Link>
                                        </Nav>
                                        <Nav.Link href="/userprofile"><Navbar.Brand><AiOutlineUser />  {mail}</Navbar.Brand></Nav.Link>
                                        <Button variant="danger" onClick={handleLogout}>WYLOGUJ</Button>
                                    </Navbar.Collapse>
                                </Container>
                            </Navbar>
                            <div className="d-flex justify-content-center">
                                <Container>
                                    <h1 className="text-center my-4">STRONA GŁÓWNA</h1>
                                    <Karuzela />

                                    <Row className="justify-content-center">
                                        <Col lg={3} className="mb-4">
                                            <Card className='w-100 mx-auto'>
                                                <Card.Img variant="top" src={offer} alt="img-oferta" />
                                                <Card.Body>
                                                    <Card.Title>
                                                        <Link to='/offer'>
                                                            <Button variant="primary" size="sm">OFERTA <BsArrowRightShort /></Button>
                                                        </Link>
                                                    </Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </Col>

                                        <Col lg={3} className="mb-4">
                                            <Card className='w-100 mx-auto'>
                                                <Card.Img variant="top" src={terminy} alt="img-terminy" />
                                                <Card.Body>
                                                    <Card.Title>
                                                        <Link to='/jump-dates'>
                                                            <Button variant="primary" size="sm">TERMINY SKOKÓW <BsArrowRightShort /></Button>
                                                        </Link>
                                                    </Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </Col>

                                        <Col lg={3} className="mb-4">
                                            <Card className='w-100 mx-auto'>
                                                <Card.Img variant="top" src={messages} alt="img-wiadomosci" />
                                                <Card.Body>
                                                    <Card.Title>
                                                        <Link to='/messages'>
                                                            <Button variant="primary" size="sm">WIADOMOŚCI<BsArrowRightShort /></Button>
                                                        </Link>
                                                    </Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>

                                </Container>
                            </div>
                            <Stopka />
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
                                            <Nav.Link href="/offer">OFERTA</Nav.Link>
                                            <Nav.Link href="/jump-dates">TERMINY SKOKÓW</Nav.Link>
                                            <Nav.Link href="/messages">WIADOMOŚCI</Nav.Link>
                                            <Nav.Link href="/employee-users-accounts">KONTA UŻYTKOWNIKÓW</Nav.Link>
                                            <Nav.Link href="/employee-manage-jumps">ZARZĄDZANIE SKOKAMI</Nav.Link>
                                        </Nav>
                                        <Nav.Link href="/userprofile"><Navbar.Brand><AiOutlineUser /> {mail}</Navbar.Brand></Nav.Link>
                                        <Button variant="danger" onClick={handleLogout}>WYLOGUJ</Button>
                                    </Navbar.Collapse>
                                </Container>
                            </Navbar>
                            <div className="d-flex justify-content-center">
                                <Container>
                                    <h1 className="text-center">STRONA GŁÓWNA</h1>

                                    <Row>
                                        <Col md={6} className="mb-2">
                                            <Card className='w-50 mx-auto'>
                                                <Card.Img variant="top" src={messages} alt="img-wiadomosci" className='img-fluid' id="mess-card-img" />
                                                <Card.Body>
                                                    <Card.Title>
                                                        <Link to='/messages'>
                                                            <Button variant="primary" size="sm">WIADOMOŚCI <BsArrowRightShort /></Button>
                                                        </Link>
                                                    </Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={6} className="mb-2">
                                            <Card className='w-50 mx-auto'>
                                                <Card.Img variant="top" src={terminy} alt="img-skoki" className='img-fluid' />
                                                <Card.Body>
                                                    <Card.Title>
                                                        <Link to='/employee-manage-jumps'>
                                                            <Button variant="primary" size="sm">ZARZĄDZANIE SKOKAMI <BsArrowRightShort /></Button>
                                                        </Link>
                                                    </Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6} className="mb-2">
                                            <Card className='w-50 mx-auto'>
                                                <Card.Img variant="top" src={offer} alt="img-oferta" className='img-fluid' />
                                                <Card.Body>
                                                    <Card.Title>
                                                        <Link to='/offer'>
                                                            <Button variant="primary" size="sm">OFERTA <BsArrowRightShort /></Button>
                                                        </Link>
                                                    </Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={6} className="mb-2">
                                            <Card className='w-50 mx-auto'>
                                                <Card.Img variant="top" src={usericon} alt="img-konta" className='img-fluid' />
                                                <Card.Body>
                                                    <Card.Title>
                                                        <Link to='/employee-users-accounts'>
                                                            <Button variant="primary" size="sm">KONTA KLIENTÓW <BsArrowRightShort /></Button>
                                                        </Link>
                                                    </Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                            <Stopka />
                        </>
                    )}
                    {userRole === 'admin' && (
                        <>
                            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                                <Container>
                                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                    <Navbar.Collapse id="responsive-navbar-nav">
                                        <Nav className="me-auto d-flex align-items-center" style={{ fontSize: '14px' }}>
                                            <Nav.Link href="/main"><BiHomeAlt /></Nav.Link>
                                            <Nav.Link href="/offer">OFERTA</Nav.Link>
                                            <Nav.Link href="/jump-dates">TERMINY SKOKÓW</Nav.Link>
                                            <Nav.Link href="/messages">WIADOMOŚCI</Nav.Link>
                                            <Nav.Link href="/employee-users-accounts">KONTA UŻYTKOWNIKÓW</Nav.Link>
                                            <Nav.Link href="/employee-manage-jumps">ZARZĄDZANIE SKOKAMI</Nav.Link>
                                            <Nav.Link href="/owner-financial-overview">PODSUMOWANIE FINANSOWE</Nav.Link>
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
                                        <Col md={6} className="mb-2">
                                            <Card className='w-50 mx-auto'>
                                                <Card.Img variant="top" src={messages} alt="img-wiadomosci" className='img-fluid' id="mess-card-img" />
                                                <Card.Body>
                                                    <Card.Title>
                                                        <Link to='/messages'>
                                                            <Button variant="primary" size="sm">WIADOMOŚCI <BsArrowRightShort /></Button>
                                                        </Link>
                                                    </Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={6} className="mb-2">
                                            <Card className='w-50 mx-auto'>
                                                <Card.Img variant="top" src={offer} alt="img-oferta" className='img-fluid' />
                                                <Card.Body>
                                                    <Card.Title>
                                                        <Link to='/offer'>
                                                            <Button variant="primary" size="sm">OFERTA <BsArrowRightShort /></Button>
                                                        </Link>
                                                    </Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6} className="mb-2">
                                            <Card className='w-50 mx-auto'>
                                                <Card.Img variant="top" src={usericon} alt="img-konta" className='img-fluid' />
                                                <Card.Body>
                                                    <Card.Title>
                                                        <Link to='/employee-users-accounts'>
                                                            <Button variant="primary" size="sm">KONTA UŻYTKOWNIKÓW <BsArrowRightShort /></Button>
                                                        </Link>
                                                    </Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={6} className="mb-2">
                                            <Card className='w-50 mx-auto'>
                                                <Card.Img variant="top" src={podsumowanie} alt="img-skoki" className='img-fluid' />
                                                <Card.Body>
                                                    <Card.Title>
                                                        <Link to='/owner-financial-overview'>
                                                            <Button variant="primary" size="sm">PODSUMOWANIE FINANSOWE <BsArrowRightShort /></Button>
                                                        </Link>
                                                    </Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6} className="mb-2">
                                            <Card className='w-50 mx-auto'>
                                                <Card.Img variant="top" src={terminy} alt="img-skoki" className='img-fluid' />
                                                <Card.Body>
                                                    <Card.Title>
                                                        <Link to='/employee-manage-jumps'>
                                                            <Button variant="primary" size="sm">ZARZĄDZANIE SKOKAMI <BsArrowRightShort /></Button>
                                                        </Link>
                                                    </Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </CardGroup>
                            </Container>
                            <Stopka />
                        </>
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
                    <Container className='text-center'>
                        <h1 className="text-center">STRONA GŁÓWNA</h1>
                        <Karuzela />
                        <Row>
                            <Col lg={6} className="justify-content-center">
                                <Card className='w-50 mx-auto'>
                                    <Card.Img variant="top" src={offer} alt="img-oferta" />
                                    <Card.Body>
                                        <Card.Title>
                                            <Link to='/offer'>
                                                <Button variant="primary" size="sm">OFERTA <BsArrowRightShort /></Button>
                                            </Link>
                                        </Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={6} className="justify-content-center">
                                <Card className='w-50 mx-auto'>
                                    <Card.Img variant="top" src={terminy} alt="img-terminy" />
                                    <Card.Body>
                                        <Card.Title>
                                            <Link to='/jump-dates'>
                                                <Button variant="primary" size="sm">TERMINY SKOKÓW <BsArrowRightShort /></Button>
                                            </Link>
                                        </Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                    <Stopka />
                </>
            )}
        </>
    );
}

export default Main

// // User niezalogowany
// <>
// <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
//     <Container>
//         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//         <Navbar.Collapse id="responsive-navbar-nav">
//             <Nav className="me-auto">
//                 <Nav.Link href="/main"><BiHomeAlt /></Nav.Link>
//             </Nav>
//             <Link to="/login">
//                 <Button variant="success">ZALOGUJ</Button>
//             </Link>
//         </Navbar.Collapse>
//     </Container>
// </Navbar>
// <Container className={styles.content}>
//     <h1 className="text-center">STRONA GŁÓWNA</h1>
//     <h2>{message}</h2>
//     <CardGroup>
//         <Card>
//             <Card.Img variant="top" src={obraz} alt="img-oferta" style={{ width: '200px', height: '200px' }} />
//             <Card.Body>
//                 <Card.Title><Link to="/offer"><Button variant="primary" size="sm"> OFERTA <BsArrowRightShort /></Button></Link></Card.Title>
//             </Card.Body>
//         </Card>
//     </CardGroup>
// </Container>
// </>