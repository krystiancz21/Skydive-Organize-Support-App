import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col, Card, CardGroup, Image } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi'
import { BsArrowRightShort } from 'react-icons/bs';
import styles from "./style.css"
import obraz from '../Images/obraz.jpg';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Offer = () => {
    const [error, setError] = useState("")
    const [isAuth, setIsAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [mail, setMail] = useState('');
    const [userRole, setUserRole] = useState('');

    const navigate = useNavigate();

    //sprawdzamy autoryzacje
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3001/api/auth/userprofile')
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
            .then(err => console.log(err));
    }, []);

    const handleDelete = () => {
        axios.get('http://localhost:3001/api/auth/logout')
            .then(res => {
                // Przekierowanie na stronę główną po wylogowaniu
                window.location.href = "http://localhost:3000/main";
                //window.location.reload(true);
            }).catch(err => console.log(err));
    }

    const handleReserveClick = (type) => {
        navigate(`/calendar?type=${type}`);
    }

    return (
        <>
            {isAuth ? (
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
                            <Button variant="danger" onClick={handleDelete}>WYLOGUJ</Button>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                    <Container className={styles.content}>
                        <h1 className="text-center">OFERTA</h1>
                        <CardGroup>
                            <Card>
                                <Card.Img variant="top" src={obraz} alt="img-oferta" />
                                <Card.Body>
                                    <Card.Title>Skok samodzielny z licencją<p>Cena: 600zł</p></Card.Title>
                                    <Button variant="primary" className='przyciskButton' onClick={() => handleReserveClick('skok_samodzielny')}>
                                        ZAREZERWUJ SKOK <BsArrowRightShort />
                                    </Button>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Img variant="top" src={obraz} alt="img-terminy" />
                                <Card.Body>
                                    <Card.Title>Skok w tandemie<p>Cena: 900zł</p></Card.Title>
                                    <div className="mb-2">
                                        <Button variant="primary" className='przyciskButton' onClick={() => handleReserveClick('skok_w_tandemie')}>
                                        ZAREZERWUJ SKOK <BsArrowRightShort />
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Img variant="top" src={obraz} alt="img-wiadomosci" />
                                <Card.Body>
                                    <Card.Title>Skok w tandemie z kamerzystą<p>Cena: 1100zł</p></Card.Title>
                                    <Button variant="primary" className='przyciskButton' onClick={() => handleReserveClick('skok_w_tandemie_z_kamerzysta')}>
                                    ZAREZERWUJ SKOK <BsArrowRightShort />
                                    </Button>
                                </Card.Body>
                            </Card>
                        </CardGroup>
                    </Container></>
            ) : (
                // User niezalogowany
                <>
                </>
            )}
        </>
    )
}

export default Offer

/* 767pix do 576pix */ 