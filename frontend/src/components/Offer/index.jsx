import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col, Card, CardGroup, Image } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi'
import { BsArrowRightShort } from 'react-icons/bs';
import styles from "./style.css"
import axios from "axios";
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import logo from '../Images/logo.jpg';

const Offer = () => {
    const [error, setError] = useState("")
    const [isAuth, setIsAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [mail, setMail] = useState('');
    const [userRole, setUserRole] = useState('');
    const [jumpData, setJumpData] = useState([]);

    //sprawdzamy autoryzacje
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3001/api/auth/offer')
            .then(res => {
                if (res.data.Status === "Success") {
                    setIsAuth(true);
                    setMail(res.data.mail); //email
                    setUserRole(res.data.userRole); // rola użytkownika

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
            }).catch(err => console.log(err));
    }

    useEffect(() => {
        axios.get('http://localhost:3001/api/offer/showAllOffers')
            .then(res => {
                if (res.data.Status === 'Success') {
                    setJumpData(res.data.offers);
                } else {
                    console.error(res.data.Error);
                }
            })
            .catch(err => console.error(err));
    }, []);

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
                                <li><a href="/jump-calendar">Terminy skoków</a></li>
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
                    {userRole === 'klient' && (
                        // User zalogowany
                        <><Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                            <Container>
                                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                <Navbar.Collapse id="responsive-navbar-nav">
                                    <Nav className="me-auto">
                                        <Nav.Link href="/main"><BiHomeAlt /></Nav.Link>
                                        <Nav.Link href="/jump-dates">TERMINY SKOKÓW</Nav.Link>
                                        <Nav.Link href="/messages">WIADOMOŚCI</Nav.Link>
                                    </Nav>
                                    <Nav.Link href="/userprofile"><Navbar.Brand><AiOutlineUser /> {mail}</Navbar.Brand></Nav.Link>
                                    <Button variant="danger" onClick={handleLogout}>WYLOGUJ</Button>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                            {/* <Container fluid className="d-flex flex-column align-items-center text-center"> */}
                            <Container>
                                <h1 className="text-center">OFERTA</h1>
                                <Row className="justify-content-center">
                                    {jumpData.map((offer, index) => (
                                        <Col lg={4} key={offer.skok_id} className="mb-4">
                                            <Card className='w-100 mx-auto'>
                                                <Card.Img variant="top" src={`http://localhost:3001/images/${offer.sciezka_do_grafiki.split('\\').pop()}`} alt={`img-oferta-${index + 1}`} />
                                                <Card.Body>
                                                    <Card.Title>{offer.nazwa}</Card.Title>
                                                    <Card.Text>Cena: {offer.cena} zł</Card.Text>
                                                    <Link to={`/jump-calendar/${offer.skok_id}`}>
                                                        <Button variant="primary">ZAREZERWUJ SKOK</Button>
                                                    </Link>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </Container>
                            <Stopka /></>
                    )}
                    {userRole === 'pracownik' && (
                        <><Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                            <Container>
                                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                <Navbar.Collapse id="responsive-navbar-nav">
                                    <Nav className="me-auto">
                                        <Nav.Link href="/main"><BiHomeAlt /></Nav.Link>
                                        <Nav.Link href="/messages">WIADOMOŚCI</Nav.Link>
                                        <Nav.Link href="/employee-users-accounts">KONTA UŻYTKOWNIKÓW</Nav.Link>
                                        <Nav.Link href="/employee-manage-jumps">ZARZĄDZANIE SKOKAMI</Nav.Link>
                                    </Nav>
                                    <Nav.Link href="/userprofile"><Navbar.Brand><AiOutlineUser /> {mail}</Navbar.Brand></Nav.Link>
                                    <Button variant="danger" onClick={handleLogout}>WYLOGUJ</Button>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                            <Container>
                                <h1 className="text-center">OFERTA</h1>
                                <Row className="justify-content-center">
                                    {jumpData.map((offer, index) => (
                                        <Col lg={4} key={offer.skok_id} className="mb-4">
                                            <Card className='w-100 mx-auto'>
                                                {/* <Card.Img variant="top" src={index === 0 ? o1 : index === 1 ? o2 : o3} alt={`img-oferta-${index + 1}`} /> */}
                                                <Card.Img variant="top" src={`http://localhost:3001/images/${offer.sciezka_do_grafiki.split('\\').pop()}`} alt={`img-oferta-${index + 1}`} />
                                                <Card.Body>
                                                    <Card.Title>{offer.nazwa}</Card.Title>
                                                    <Card.Text>Cena: {offer.cena} zł</Card.Text>
                                                    <Link to={`/jump-calendar/${offer.skok_id}`}>
                                                        <Button variant="primary">ZAREZERWUJ SKOK</Button>
                                                    </Link><p></p>
                                                    <Link to={`/offer-edit/${offer.skok_id}`}>
                                                        <Button variant="success">EDYTUJ SKOK</Button>
                                                    </Link>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </Container>
                            <Stopka />
                        </>
                    )}
                    {userRole === 'admin' && (
                        <><Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                            <Container>
                                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                <Navbar.Collapse id="responsive-navbar-nav">
                                    <Nav className="me-auto">
                                        <Nav.Link href="/main"><BiHomeAlt /></Nav.Link>
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
                                <h1 className="text-center">OFERTA</h1>
                                <CardGroup>
                                    {jumpData.map((offer, index) => (
                                        <Card key={offer.skok_id}>
                                            <Card.Img variant="top" src={`http://localhost:3001/images/${offer.sciezka_do_grafiki.split('\\').pop()}`} alt={`img-oferta-${index + 1}`} />
                                            <Card.Body>
                                                <Card.Title>{offer.nazwa}</Card.Title>
                                                <Card.Text>Cena: {offer.cena} zł</Card.Text>
                                                <Link to={`/jump-calendar/${offer.skok_id}`}>
                                                    <Button variant="primary">ZAREZERWUJ SKOK</Button>
                                                </Link><p></p>
                                                <Link to={`/offer-edit/${offer.skok_id}`}>
                                                    <Button variant="success">EDYTUJ SKOK</Button>
                                                </Link>
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </CardGroup>
                            </Container></>
                    )}
                </>
            ) : (
                // User niezalogowany
                <><Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
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
                    <Container>
                        <h1 className="text-center">OFERTA</h1>
                        <Row>
                            {jumpData.map((offer, index) => (
                                <Col lg={4} key={offer.skok_id}>
                                    <Card className='w-100 mx-auto mb-3'>
                                        <Card.Img variant="top" src={`http://localhost:3001/images/${offer.sciezka_do_grafiki.split('\\').pop()}`} alt={`img-oferta-${index + 1}`} />
                                        <Card.Body>
                                            <Card.Title>{offer.nazwa}</Card.Title>
                                            <Card.Text>Cena: {offer.cena} zł</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                    <SmallFooter /></>
            )}
        </>
    )
}

export default Offer
