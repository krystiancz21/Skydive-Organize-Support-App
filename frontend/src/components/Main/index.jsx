import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col, Card, CardGroup, Image, Carousel } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi'
import { BsArrowRightShort } from 'react-icons/bs';
import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

import styles from "./style.css"
import obraz from '../Images/obraz.jpg';
import m1 from '../Images/main1.jpg';
import m2 from '../Images/main2.jpg';
import m3 from '../Images/main3.jpg';
import logo from '../Images/logo.jpg';
import offer from '../Images/offer.jpg';
import terminy from '../Images/terminy.jpg';
import messages from '../Images/messages.jpg';


import { useEffect } from 'react';

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
            .catch(err => console.error(err));
    }, []);

    const handleLogout = () => {
        axios.get('http://localhost:3001/api/auth/logout')
            .then(res => {
                window.location.reload(true);
            }).catch(err => console.error(err));
    }

    const carouselItems = [
        { id: 1, image: { m1 }, title: "Skydiving Jump 1" },
        { id: 2, image: { m2 }, title: "Skydiving Jump 2" },
        { id: 3, image: { m3 }, title: "Skydiving Jump 3" },
    ];

    const Logo = () => (
        <div className='logo'>
            {/*https://www.vecteezy.com/vector-art/17127793-parachute-logo-icon-design-and-symbol-skydiving-vector */}
            <img src={logo} alt="Logo" />
        </div>
    );

    const FooterMenu = () => (
        <div>
            <h4>Szybkie linki</h4>
            <ul>
                <li><a href="/main">Strona główna</a></li>
                <li><a href="/offer">Oferta</a></li>
                <li><a href="/reservation">Terminy skoków</a></li>
                <li><a href="/messages">Wiadomości</a></li>
            </ul>
        </div>
    );

    const ContactInfo = () => (
        <div>
            <h4>Autorzy</h4>
            <p>Krystian Czapla</p>
            <p>Kacper Czajka</p>
            <p>Mariusz Choroś</p>
        </div>
    );

    const Nawigacja_zalogowany = () => (
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
                    <Nav.Link href="/userprofile"><Navbar.Brand><AiOutlineUser />  {mail}</Navbar.Brand></Nav.Link>
                    <Button variant="danger" onClick={handleLogout}>WYLOGUJ</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

    const Nawigacja_niezalogowany = () => (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/main"><BiHomeAlt /></Nav.Link>
                        <Nav.Link href="/offer">OFERTA</Nav.Link>
                        <Nav.Link href="/reservation">TERMINY SKOKÓW</Nav.Link>
                    </Nav>
                    <Link to="/login">
                        <Button variant="success">ZALOGUJ</Button>
                    </Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

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
    )

    // const Karty = () => (
    //     //Błędy w konsolii - powinno być className ale wtedy rozpada się Css - do poprawki
    //     <CardGroup class="karty_niezalogowany"> 
    //         <Card>
    //             <Card.Img variant="top" src={offer} alt="img-oferta" />
    //             <Card.Body>
    //                 <Card.Title><Button variant="primary" size="sm" href="/offer">OFERTA <BsArrowRightShort /></Button></Card.Title>
    //             </Card.Body>
    //         </Card>
    //         <Card>
    //             <Card.Img variant="top" src={terminy} alt="img-terminy" />
    //             <Card.Body>
    //                 <Card.Title><Button variant="primary" size="sm" href="/reservation">TERMINY SKOKÓW <BsArrowRightShort /></Button></Card.Title>
    //             </Card.Body>
    //         </Card>
    //         <Card>
    //             <Card.Img variant="top" src={messages} alt="img-wiadomosci" />
    //             <Card.Body>
    //                 <Card.Title><Button variant="primary" size="sm" href="/messages">WIADOMOŚCI <BsArrowRightShort /> </Button></Card.Title>
    //             </Card.Body>
    //         </Card>
    //     </CardGroup>
    // )


    const Karty = () => (
        <Row>
            <Col md={4}>
                <Card>
                    <Card.Img variant="top" src={offer} alt="img-oferta" />
                    <Card.Body>
                        <Card.Title><Button variant="primary" size="sm" href="/offer">OFERTA <BsArrowRightShort /></Button></Card.Title>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={4}>
                <Card>
                    <Card.Img variant="top" src={terminy} alt="img-terminy" />
                    <Card.Body>
                        <Card.Title><Button variant="primary" size="sm" href="/reservation">TERMINY SKOKÓW <BsArrowRightShort /></Button></Card.Title>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={4}>
                <Card>
                    <Card.Img variant="top" src={messages} alt="img-wiadomosci" />
                    <Card.Body>
                        <Card.Title><Button variant="primary" size="sm" href="/messages">WIADOMOŚCI <BsArrowRightShort /> </Button></Card.Title>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );

    const Karty_niezalogowany = () => (
        //Błędy w konsolii - powinno być className ale wtedy rozpada się Css - do poprawki
        <CardGroup class="karty_niezalogowany">
            <Card>
                <Card.Img variant="top" src={offer} alt="img-oferta" />
                <Card.Body>
                    <Card.Title><Button variant="primary" size="sm" href="/offer">OFERTA <BsArrowRightShort /></Button></Card.Title>
                </Card.Body>
            </Card>
            <Card>
                <Card.Img variant="top" src={terminy} alt="img-terminy" />
                <Card.Body>
                    <Card.Title><Button variant="primary" size="sm" href="/reservation">TERMINY SKOKÓW <BsArrowRightShort /></Button></Card.Title>
                </Card.Body>
            </Card>
        </CardGroup>
    )

    const Stopka = () => (
        <footer className="big-footer mt-3">
            <Container fluid>
                <Row>
                    <Col md={4} className="d-flex flex-column align-items-center text-center">
                        <Logo />
                        <p>&copy; 2023 System wspomagający organizację skoków spadochronowych</p>
                    </Col>
                    <Col md={4} className="d-flex justify-content-center">
                        <FooterMenu />
                    </Col>
                    <Col md={4} className="d-flex justify-content-center">
                        <ContactInfo />
                    </Col>
                </Row>
            </Container>
        </footer>
    )

    return (
        <>
            {isAuth ? (
                <>
                    {/* Wyświetl odpowiednią nawigację w zależności od roli */}
                    {userRole === 'klient' && (
                        // User zalogowany
                        <>
                            <Nawigacja_zalogowany />

                            <Container fluid="lt" className='px-5'>
                                <h1 className="text-center mt-2 main-title" >STRONA GŁÓWNA</h1>
                                <Karuzela />

                                <Karty />

                            </Container>
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
                                                    <Card.Title><Button variant="primary" size="sm">WIADOMOŚCI <BsArrowRightShort /></Button></Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col>
                                            <Card>
                                                <Card.Img variant="top" src={obraz} alt="img-terminy" />
                                                <Card.Body>
                                                    <Card.Title><Button variant="primary" size="sm">KONTA PRACOWNIKÓW <BsArrowRightShort /></Button></Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Card>
                                                <Card.Img variant="top" src={obraz} alt="img-wiadomosci" />
                                                <Card.Body>
                                                    <Card.Title><Button variant="primary" size="sm">OFERTA <BsArrowRightShort /> </Button></Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col>
                                            <Card>
                                                <Card.Img variant="top" src={obraz} alt="img-wiadomosci" />
                                                <Card.Body>
                                                    <Card.Title><Button variant="primary" size="sm">ZARZĄDZANIE SKOKAMI <BsArrowRightShort /> </Button></Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </CardGroup>
                            </Container>
                            <Stopka />
                        </>
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
                                            <Card.Title><Button variant="primary" size="sm">GRAFIK SKOKÓW <BsArrowRightShort /></Button></Card.Title>
                                        </Card.Body>
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src={obraz} alt="img-terminy" className="p-2" />
                                        <Card.Body>
                                            <Card.Title><Button variant="primary" size="sm">KONTA PRACOWNIKÓW <BsArrowRightShort /></Button></Card.Title>
                                        </Card.Body>
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src={obraz} alt="img-wiadomosci" className="p-2" />
                                        <Card.Body>
                                            <Card.Title><Button variant="primary" size="sm">PODSUMOWANIE FINANSOWE <BsArrowRightShort /> </Button></Card.Title>
                                        </Card.Body>
                                    </Card>
                                </CardGroup>
                            </Container></>
                    )}
                </>
            ) : (
                // User niezalogowany
                <>
                    <Nawigacja_niezalogowany />
                    <Container fluid="lt" className='px-5'>
                        <h1 className="text-center">STRONA GŁÓWNA</h1>
                        <Karuzela />

                        <Karty_niezalogowany />

                    </Container>
                    <Stopka />
                </>
            )}
        </>
    );
}

export default Main
