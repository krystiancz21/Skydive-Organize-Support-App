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
    const [userID, setUserID] = useState('');

    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('1');
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [myMsg, setMyMsg] = useState([]);
    const [readMsg, setReadMsg] = useState([]);
    const [unreadMsg, setUnreadMsg] = useState([]);

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
            axios.post('http://localhost:3001/api/user/getUserIdByMail', { userMail: mail })
                .then(res => {
                    setUserID(res.data[0].user_id);
                    // console.log(res.data[0].user_id)
                })
                .catch(err => console.log(err.message));

        }
    }, [mail]);

    useEffect(() => {
        if (userID) {
            axios.post('http://localhost:3001/api/messages/showMyMessages', { userID: userID })
                .then(res => {
                    setMyMsg(res.data);
                })
                .catch(err => console.log(err.message));

            axios.post('http://localhost:3001/api/messages/showReadMessages', { userID: userID })
                .then(res => {
                    setReadMsg(res.data);
                })
                .catch(err => console.log(err.message));

            axios.post('http://localhost:3001/api/messages/showUnreadMessages', { userID: userID })
                .then(res => {
                    setUnreadMsg(res.data);
                })
                .catch(err => console.log(err.message));
        }
    }, [userID]);

    const markAsRead = (messageId) => {
        axios.post('http://localhost:3001/api/messages/markAsRead', { messageId: messageId })
            .then(res => {
                window.location.reload();
                // Aktualizuj wybraną wiadomość jako odczytaną
                // setSelectedMessage(prevMessage => ({ ...prevMessage, odczytane: true }));
            })
            .catch(err => console.log(err.message));
    }

    useEffect(() => {
        setSelectedMessage(null);
    }, [radioValue]);
    
    const getMessages = () => {
        switch (radioValue) {
            case '1':
                return readMsg;
            case '2':
                return unreadMsg;
            case '3':
                return myMsg;
            default:
                return [];
        }
    };

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
                                    checked={radioValue === '1'}
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
                                    checked={radioValue === '2'}
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
                                    checked={radioValue === '3'}
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
                                    {getMessages().map((item, index) => (
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
                                        {radioValue === '2' && !selectedMessage.odczytane && (
                                            <Button variant="success" onClick={() => markAsRead(selectedMessage.wiadomosci_id)}>Oznacz jako odczytane</Button>
                                        )}
                                    </div>
                                )}
                            </Col>
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
