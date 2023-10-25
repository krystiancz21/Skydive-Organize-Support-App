import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col, Card, CardGroup, Image } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi'
import { BsArrowRightShort } from 'react-icons/bs';
import styles from "./style.css"
import obraz from '../Images/obraz.jpg';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const Offer = () => {
    const [error, setError] = useState("")
    const [isAuth, setIsAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [mail, setMail] = useState('');
    const [userRole, setUserRole] = useState('');
    const [jumpData, setJumpData] = useState([]);

    const { offerId } = useParams();
    const navigate = useNavigate();

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

    // const handleReserveClick = (type) => {
    //     navigate(`/jump-calendar/${type}`);
    // }

    // const handleOfferEditClick = (skokId) => {
    //     navigate(`/offer-edit/${skokId}`);
    // }

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
                                        <Nav.Link href="/reservation">TERMINY SKOKÓW</Nav.Link>
                                        <Nav.Link href="/messages">WIADOMOŚCI</Nav.Link>
                                    </Nav>
                                    <Nav.Link href="/userprofile"><Navbar.Brand><AiOutlineUser /> {mail}</Navbar.Brand></Nav.Link>
                                    <Button variant="danger" onClick={handleLogout}>WYLOGUJ</Button>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                            <Container className={styles.content}>
                                <h1 className="text-center">OFERTA</h1>
                                <CardGroup>
                                    {jumpData.map((offer) => (
                                        <Card key={offer.skok_id}>
                                            <Card.Img variant="top" src={obraz} alt="img-oferta" />
                                            <Card.Body>
                                                <Card.Title>{offer.nazwa}</Card.Title>
                                                <Card.Text>Cena: {offer.cena} zł</Card.Text>
                                                <Link to={`/jump-calendar/${offer.skok_id}`}>
                                                    <Button variant="primary">ZAREZERWUJ SKOK</Button>
                                                </Link>
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </CardGroup>
                            </Container></>
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
                                        <Nav.Link href="/employeemanagejumps">ZARZĄDZANIE SKOKAMI</Nav.Link>
                                    </Nav>
                                    <Nav.Link href="/userprofile"><Navbar.Brand><AiOutlineUser /> {mail}</Navbar.Brand></Nav.Link>
                                    <Button variant="danger" onClick={handleLogout}>WYLOGUJ</Button>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                            <Container className={styles.content}>
                                <h1 className="text-center">OFERTA</h1>
                                <CardGroup>
                                    {jumpData.map((offer) => (
                                        <Card key={offer.skok_id}>
                                            <Card.Img variant="top" src={obraz} alt="img-oferta" />
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
                    {userRole === 'admin' && (
                        <><Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                            <Container>
                                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                <Navbar.Collapse id="responsive-navbar-nav">
                                    <Nav className="me-auto">
                                        <Nav.Link href="/main"><BiHomeAlt /></Nav.Link>
                                        <Nav.Link href="/messages">WIADOMOŚCI</Nav.Link>
                                        <Nav.Link href="/employee-users-accounts">KONTA UŻYTKOWNIKÓW</Nav.Link>
                                        <Nav.Link href="/employeemanagejumps">ZARZĄDZANIE SKOKAMI</Nav.Link>
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
                                    {jumpData.map((offer) => (
                                        <Card key={offer.skok_id}>
                                            <Card.Img variant="top" src={obraz} alt="img-oferta" />
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
                    <Container className={styles.content}>
                        <h1 className="text-center">OFERTA</h1>
                        <CardGroup>
                            {jumpData.map((offer) => (
                                <Card key={offer.skok_id}>
                                    <Card.Img variant="top" src={obraz} alt="img-oferta" />
                                    <Card.Body>
                                        <Card.Title>{offer.nazwa}</Card.Title>
                                        <Card.Text>Cena: {offer.cena} zł</Card.Text>
                                        {/* <Link to={`/jump-calendar/${offer.skok_id}`}>
                                            <Button variant="primary">ZAREZERWUJ SKOK</Button>
                                        </Link> */}
                                    </Card.Body>
                                </Card>
                            ))}
                        </CardGroup>
                    </Container></>
            )}
        </>
    )
}

export default Offer
