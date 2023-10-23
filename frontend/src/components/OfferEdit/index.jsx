import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col, Card, CardGroup, Image } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi'
import { BsFillPersonFill, BsArrowRightShort, BsFillBellFill, BsPencilSquare } from 'react-icons/bs';
import obraz from '../Images/obraz.jpg';
import styles from "./style.css"
import axios from "axios";
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const OfferEdit = () => {
    const [error, setError] = useState("")
    const [isAuth, setIsAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [mail, setMail] = useState('');
    const [userRole, setUserRole] = useState('');

    //sprawdzamy autoryzacje
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3001/api/auth/offer-edit')
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
                //window.location.reload(true);
            }).catch(err => console.log(err));
    }


    return (
        <>
            {isAuth ? (
                <>
                    {/* Wyświetl odpowiednią nawigację w zależności od roli */}
                    {userRole === 'pracownik' && (
                        // User zalogowany
                        <><Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                            <Container>
                                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                <Navbar.Collapse id="responsive-navbar-nav">
                                    <Nav className="me-auto">
                                        <Nav.Link href="/main"><BiHomeAlt /></Nav.Link>
                                        <Nav.Link href="/messages">WIADOMOŚCI</Nav.Link>
                                        <Nav.Link href="/employeeusersaccounts">KONTA UŻYTKOWNIKÓW</Nav.Link>
                                        <Nav.Link href="/employeemanagejumps">ZARZĄDZANIE SKOKAMI</Nav.Link>
                                    </Nav>
                                    <Nav.Link href="/userprofile"><Navbar.Brand><AiOutlineUser /> {mail}</Navbar.Brand></Nav.Link>
                                    <Button variant="danger" onClick={handleLogout}>WYLOGUJ</Button>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                            <Container className={styles.content}>
                                <h1 className="text-center">EDYCJA OFERTY SKOKU</h1>
                                <Form className="text-center">
                                    <div className='max-width-form'>
                                        <Form.Group as={Row} controlId="formEditOfferName" className="mb-3">
                                            <Form.Label column sm={2}>
                                                Nazwa
                                            </Form.Label>
                                            <Col sm={10}>
                                                <FormControl
                                                    type="text"
                                                    name="jumpName"
                                                //value={userData.firstName}
                                                //onChange={handleChange}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formEditOfferPrice" className="mb-3">
                                            <Form.Label column sm={2}>
                                                Cena
                                            </Form.Label>
                                            <Col sm={10}>
                                                <FormControl
                                                    type="text"
                                                    name="jumpPrice"
                                                //value={userData.lastName}
                                                //onChange={handleChange}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </div>
                                    <div className='mt-4'>
                                        <Button variant="success" className="mt-3" id="przycisk2" /*onClick={handleEditUserData}*/>
                                            <BsPencilSquare /> EDYTUJ SKOK
                                        </Button>
                                    </div>
                                </Form>
                            </Container></>
                        /*{ <CardGroup>
                            <Card>
                                <Card.Img variant="top" src={obraz} alt="img-oferta" />
                                <Card.Body>
                                    <Card.Title>Skok samodzielny z licencją<p>Cena: 600zł</p></Card.Title>
                                    <Button variant="primary" className='przyciskButton' onClick={() => handleReserveClick('skok_samodzielny')}>
                                        ZAREZERWUJ SKOK <BsArrowRightShort />
                                    </Button>
                                    <Button variant="success" className='przyciskButton' onClick={() => handleOfferEditClick('skok_samodzielny')} >EDYTUJ OFERTĘ</Button>
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
                                        <Button variant="success" className='przyciskButton' onClick={() => handleOfferEditClick('skok_w_tandemie')}>EDYTUJ OFERTĘ</Button>
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
                                    <Button variant="success" className='przyciskButton' onClick={() => handleOfferEditClick('skok_samodzielny')}  >EDYTUJ OFERTĘ</Button>
                                </Card.Body>
                            </Card>
                        </CardGroup> }*/
                    )
                    }
                    {
                        userRole === 'admin' && (
                            <><Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                                <Container>
                                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                    <Navbar.Collapse id="responsive-navbar-nav">
                                        <Nav className="me-auto">
                                            <Nav.Link href="/main"><BiHomeAlt /></Nav.Link>
                                            <Nav.Link href="/messages">WIADOMOŚCI</Nav.Link>
                                            <Nav.Link href="/employeeusersaccounts">KONTA UŻYTKOWNIKÓW</Nav.Link>
                                            <Nav.Link href="/employeemanagejumps">ZARZĄDZANIE SKOKAMI</Nav.Link>
                                        </Nav>
                                        <Nav.Link href="/userprofile"><Navbar.Brand><AiOutlineUser /> {mail}</Navbar.Brand></Nav.Link>
                                        <Button variant="danger" onClick={handleLogout}>WYLOGUJ</Button>
                                    </Navbar.Collapse>
                                </Container>
                            </Navbar>
                                <Container className={styles.content}>
                                    <h1 className="text-center">EDYCJA OFERTY SKOKU</h1>
                                    {/* <CardGroup>
                                    <Card>
                                        <Card.Img variant="top" src={obraz} alt="img-oferta" />
                                        <Card.Body>
                                            <Card.Title>Skok samodzielny z licencją<p>Cena: 600zł</p></Card.Title>
                                            <Button variant="success" className='przyciskButton'  >EDYTUJ OFERTĘ</Button>
                                        </Card.Body>
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src={obraz} alt="img-terminy" />
                                        <Card.Body>
                                            <Card.Title>Skok w tandemie<p>Cena: 900zł</p></Card.Title>
                                            <div className="mb-2">
                                                <Button variant="success" className='przyciskButton' >EDYTUJ OFERTĘ</Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src={obraz} alt="img-wiadomosci" />
                                        <Card.Body>
                                            <Card.Title>Skok w tandemie z kamerzystą<p>Cena: 1100zł</p></Card.Title>
                                            <Button variant="success" className='przyciskButton'  >EDYTUJ OFERTĘ</Button>
                                        </Card.Body>
                                    </Card>
                                </CardGroup> */}
                                </Container></>
                        )
                    }
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
                        <h1 className="text-center">OFERTA</h1>
                        <h2>{message}</h2>
                        <CardGroup>
                            <Card>
                                <Card.Img variant="top" src={obraz} alt="img-oferta" />
                                <Card.Body>
                                    <Card.Title>Skok samodzielny z licencją<p>Cena: 600zł</p></Card.Title>
                                    <Button variant="primary" className='przyciskButton' >
                                        ZAREZERWUJ SKOK <BsArrowRightShort />
                                    </Button>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Img variant="top" src={obraz} alt="img-terminy" />
                                <Card.Body>
                                    <Card.Title>Skok w tandemie<p>Cena: 900zł</p></Card.Title>
                                    <div className="mb-2">
                                        <Button variant="primary" className='przyciskButton' >
                                            ZAREZERWUJ SKOK <BsArrowRightShort />
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Img variant="top" src={obraz} alt="img-wiadomosci" />
                                <Card.Body>
                                    <Card.Title>Skok w tandemie z kamerzystą<p>Cena: 1100zł</p></Card.Title>
                                    <Button variant="primary" className='przyciskButton' >
                                        ZAREZERWUJ SKOK <BsArrowRightShort />
                                    </Button>
                                </Card.Body>
                            </Card>
                        </CardGroup>
                    </Container>
                </>
            )}
        </>
    )
}

export default OfferEdit