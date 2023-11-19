import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt, BiPencil, BiMessageRoundedDots } from 'react-icons/bi';
import { BsPersonCircle } from 'react-icons/bs';
import styles from "./style.css"
import logo from '../Images/logo.jpg';
import axios from "axios";
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

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

// Nawigacja dla poszczególnych ról
const getNavbar = (role, mail, handleLogout) => {
    switch (role) {
        case 'klient':
            return (<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/main"><BiHomeAlt /></Nav.Link>
                            <Nav.Link href="/offer">OFERTA</Nav.Link>
                            <Nav.Link href="/jump-dates">TERMINY SKOKÓW</Nav.Link>
                        </Nav>
                        <Nav.Link href="/userprofile"><Navbar.Brand><AiOutlineUser />  {mail}</Navbar.Brand></Nav.Link>
                        <Button variant="danger" onClick={handleLogout}>WYLOGUJ</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            );
        case 'pracownik':
            return (
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/main"><BiHomeAlt /></Nav.Link>
                                <Nav.Link href="/offer">OFERTA</Nav.Link>
                                <Nav.Link href="/jump-dates">TERMINY SKOKÓW</Nav.Link>
                                <Nav.Link href="/employee-users-accounts">KONTA UŻYTKOWNIKÓW</Nav.Link>
                                <Nav.Link href="/employee-manage-jumps">ZARZĄDZANIE SKOKAMI</Nav.Link>
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
                                <Nav.Link href="/jump-dates">TERMINY SKOKÓW</Nav.Link>
                                <Nav.Link href="/employee-users-accounts">KONTA UŻYTKOWNIKÓW</Nav.Link>
                                <Nav.Link href="/employee-manage-jumps">ZARZĄDZANIE SKOKAMI</Nav.Link>
                                <Nav.Link href="/owner-financial-overview">PODSUMOWANIE FINANSOWE</Nav.Link>
                            </Nav>
                            <Nav.Link href="/userprofile"><Navbar.Brand><AiOutlineUser />  {mail}</Navbar.Brand></Nav.Link>
                            <Button variant="danger" onClick={handleLogout}>WYLOGUJ</Button>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            );
        default:
            return null;
    }
};

const Messages = () => {

    const [isAuth, setIsAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [mail, setMail] = useState('');
    const [userRole, setUserRole] = useState('');

    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('1');
    const [myMsg, setMyMsg] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);

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
        if (mail) {
            axios.post('http://localhost:3001/api/messages/showMessages', { senderMail: mail })
                .then(res => {
                    setMyMsg(res.data);
                })
                .catch(err => console.log(err.message));
        }
    }, [mail]);

    const markAsRead = (messageId) => {
        axios.post('http://localhost:3001/api/messages/markAsRead', { messageId: messageId })
            .then(res => {
                window.location.reload();
                // Aktualizuj wybraną wiadomość jako odczytaną
                // setSelectedMessage(prevMessage => ({ ...prevMessage, odczytane: true }));
            })
            .catch(err => console.log(err.message));
    }

    return (
        <>
            {isAuth ? (
                <>
                    {getNavbar(userRole, mail, handleLogout)}
                    <Container>
                        <h1 className="text-center">WIADOMOŚCI</h1>
                        <div className="d-flex justify-content-center pb-4">
                            <ButtonGroup>
                                <ToggleButton
                                    key="1"
                                    id="radio-1"
                                    type="radio"
                                    variant='outline-secondary'
                                    name="radio"
                                    value="1"
                                    checked="1"
                                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                                >
                                    Odczytane
                                </ToggleButton>
                                <ToggleButton
                                    key="2"
                                    id="radio-2"
                                    type="radio"
                                    variant='outline-secondary'
                                    name="radio"
                                    value="2"
                                    checked="2"
                                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                                >
                                    Nieodczytane
                                </ToggleButton>
                                <ToggleButton
                                    key="3"
                                    id="radio-3"
                                    type="radio"
                                    variant='outline-secondary'
                                    name="radio"
                                    value="3"
                                    checked="3"
                                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                                >
                                    Moje wiadomości
                                </ToggleButton>
                            </ButtonGroup>
                        </div>
                        <div className="d-flex justify-content-center pb-4">
                            <Link to="/new-message">
                                <Button variant="success" className="mt-2">Napisz nową wiadomość</Button>
                            </Link>
                        </div>

                        <Row>
                            <Col md={4}>
                                <div>
                                    {myMsg.map((item, index) => (
                                        <Row key={index} className={'msg-container text-center mb-2 clickable'} onClick={() => setSelectedMessage(item)}>
                                            <Col sm={2} className="d-flex align-items-center">
                                                <BiMessageRoundedDots />
                                            </Col>
                                            <Col sm={10}>
                                                <Row>
                                                    <Col>
                                                        <h5>{item.tytul}</h5>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>{item.imie} {item.nazwisko}</Col>
                                                    <Col>{moment(item.data_czas).format('DD.MM.YYYY HH:mm')}</Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    ))}
                                </div>
                            </Col>
                            <Col md={8}>
                                {selectedMessage && (
                                    <div className="msg-container">
                                        <h2>{selectedMessage.tytul}</h2>
                                        <p>
                                            <strong>Nadawca:</strong> {selectedMessage.imie} {selectedMessage.nazwisko}
                                        </p>
                                        <p>
                                            <strong>Data:</strong> {moment(selectedMessage.data_czas).format('DD.MM.YYYY HH:mm')}
                                        </p>
                                        <p>{selectedMessage.tresc}</p>
                                        {!selectedMessage.odczytane && (
                                            <Button variant="success" onClick={() => markAsRead(selectedMessage.wiadomosci_id)}>Oznacz jako odczytane</Button>
                                        )}
                                    </div>
                                )}
                            </Col>

                            {/* <div>
                                {myMsg.map((item, index) => (
                                    <Row key={index} className='msg-container text-center d-flex align-items-center mb-2'>
                                        <Col><BiMessageRoundedDots /></Col>
                                        <Col>{item.tytul}</Col>
                                        <Col>{item.imie} {item.nazwisko}</Col>
                                        <Col>{moment(item.data_czas).format('DD.MM.YYYY HH:mm')}</Col>
                                    </Row>
                                ))}
                            </div> */}

                            {/* <Col md={4}>
                                <Row className={'msg-container text-center mb-2'}>
                                    <Col sm={2} className="d-flex align-items-center">
                                        <BiMessageRoundedDots />
                                    </Col>
                                    <Col sm={10}>
                                        <Row>
                                            <Col>
                                                <h5>Zapytanie o skok w tandemie z kamerzystą</h5>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>Marek Kowalski</Col>
                                            <Col>21.11.2023</Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className={'msg-container text-center mb-2'}>
                                    <Col sm={2} className="d-flex align-items-center">
                                        <BiMessageRoundedDots />
                                    </Col>
                                    <Col sm={10}>
                                        <Row>
                                            <Col>
                                                <h5>Zapytanie o skok bez spadochronu</h5>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>Janina Mostowiak</Col>
                                            <Col>23.10.2023</Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={8}>
                                <div className="msg-container">
                                    <h2>Tytuł</h2>
                                    <p>
                                        <strong>Nadawca:</strong> Marek Kowalski
                                    </p>
                                    <p>
                                        <strong>Data:</strong> 21.11.2023
                                    </p>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                    <Button variant="success">Oznacz jako odczytane</Button>
                                </div>
                            </Col> */}
                        </Row>
                    </Container>
                    <Stopka />
                </>
            ) : (
                // User niezalogowany
                <></>
            )
            }
        </>
    )
}

export default Messages


{/* <Container className={styles.content}>
                        <h1 className="text-center">WIADOMOŚCI</h1>
                        <div className="d-flex justify-content-center pb-4">
                            <ButtonGroup>
                                <ToggleButton
                                    key="1"
                                    id="radio-1"
                                    type="radio"
                                    variant='outline-primary'
                                    name="radio"
                                    value="1"
                                    checked="1"
                                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                                >
                                    Odczytane
                                </ToggleButton>
                                <ToggleButton
                                    key="2"
                                    id="radio-2"
                                    type="radio"
                                    variant='outline-primary'
                                    name="radio"
                                    value="2"
                                    checked="2"
                                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                                >
                                    Nieodczytane
                                </ToggleButton>
                            </ButtonGroup>
                        </div>

                        <Row>
                            <Col>
                                <Row className="msg-container mb-2">
                                    <Row className='align-items-center justify-content-center'>
                                        <Col>
                                            <BiMessageRoundedDots />
                                        </Col>
                                        <Col>
                                            <span className="msg-title">Tytuł:</span> Zapytanie o skok
                                        </Col>
                                        <Col>
                                            Nadawca: Jan Kowalski
                                        </Col>
                                        <Col>
                                            Data: 21.11.2000
                                        </Col>
                                        <Col>
                                            <Button variant="success">
                                                Odczytaj
                                            </Button>
                                        </Col>
                                    </Row>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                    <Stopka /> */}

{/* <Container className={styles.content}>
    <h1 className="text-center">WIADOMOŚCI</h1>
    <Row>
        <Col>
            <h3>Lista wiadomości</h3>
            <Row className="msg-container">
                <Row className="mb-3">
                    <Col>
                        <span className="msg-title">Tytuł:</span> Zapytanie o skok
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <BsPersonCircle />
                    </Col>
                    <Col>
                        Nadawca: Jan
                    </Col>
                </Row>
            </Row>
        </Col>
        
        <Col>
            <h3>Wyślij wiadomość do pracownika</h3>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Tytuł</Form.Label>
                    <Form.Control type="text" placeholder="Tytuł" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Treść</Form.Label>
                    <textarea name="wiadomosc" cols="85" rows="10"></textarea>
                </Form.Group>
                <Button variant="success" type="submit" size="lg">WYŚLIJ</Button>
            </Form>
        </Col>
    </Row>
</Container>
<Stopka /> */}


//     return (
//         <>
//             <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
//                 <Container>
//                     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//                     <Navbar.Collapse id="responsive-navbar-nav">
//                         <Nav className="me-auto">
//                             <Nav.Link href="/main"><BiHomeAlt /></Nav.Link>
//                             <Nav.Link href="/offer">OFERTA</Nav.Link>
//                             <Nav.Link href="/jump-dates">TERMINY SKOKÓW</Nav.Link>
//                         </Nav>
//                         <Nav.Link href="/userprofile"><Navbar.Brand><AiOutlineUser /> {mail}</Navbar.Brand></Nav.Link>
//                         <Button variant="danger" onClick={handleLogout}>WYLOGUJ</Button>
//                     </Navbar.Collapse>
//                 </Container>
//             </Navbar>
//             <Container className={styles.content}>
//                 <h1 className="text-center">WIADOMOŚCI</h1>
//                 <Row>
//                     <Col>
//                         <h3>Lista wiadomości</h3>
//                         <Row className="msg-container">
//                             <Row className="mb-3">
//                                 <Col>
//                                     <span className="msg-title">Tytuł:</span> Zapytanie o skok
//                                 </Col>
//                             </Row>
//                             <Row>
//                                 <Col>
//                                     <BsPersonCircle />
//                                 </Col>
//                                 <Col>
//                                     Nadawca: Jan
//                                 </Col>
//                             </Row>
//                         </Row>
//                     </Col>
//                     <Col>
//                         <h3>Wyślij wiadomość do pracownika</h3>
//                         <Form>
//                             <Form.Group className="mb-3" controlId="formBasicEmail">
//                                 <Form.Label>Tytuł</Form.Label>
//                                 <Form.Control type="text" placeholder="Tytuł" />
//                             </Form.Group>
//                             <Form.Group className="mb-3" controlId="formBasicPassword">
//                                 <Form.Label>Treść</Form.Label>
//                                 <textarea name="wiadomosc" cols="85" rows="10"></textarea>
//                             </Form.Group>
//                             <Button variant="success" type="submit" size="lg">WYŚLIJ</Button>
//                         </Form>
//                     </Col>
//                 </Row>
//             </Container>
//             <Stopka />
//         </>
//     )
// }