import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt, BiPencil, BiMessageRoundedDots } from 'react-icons/bi';
import { BsPersonCircle } from 'react-icons/bs';
// import styles from "./style.css"
import logo from '../Images/logo.jpg';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

const SmallFooter = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="text-center footer fixed-bottom">
            <p className="m-0 stopa">System wspomagający organizację skoków spadochronowych | Autorzy: Krystian Czapla, Kacper Czajka, Mariusz Choroś | &copy; {year}</p>
        </footer>
    );
};

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
                            <Nav.Link href="/messages">WIADOMOŚCI</Nav.Link>
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
                                <Nav.Link href="/messages">WIADOMOŚCI</Nav.Link>
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
                                <Nav.Link href="/messages">WIADOMOŚCI</Nav.Link>
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
}

const NewMessage = () => {

    const [isAuth, setIsAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [mail, setMail] = useState('');
    const [userRole, setUserRole] = useState('');

    const [sendMsgSuccess, setSendMsgSuccess] = useState(false);
    const [error, setError] = useState("");
    const [receivers, setReceivers] = useState([]);
    const [newMessage, setNewMessage] = useState({
        senderMail: "",
        reciverID: "",
        msgTitle: "",
        msgContent: "",
    });

    //sprawdzamy autoryzacje
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3001/api/auth/offer')
            .then(res => {
                if (res.data.Status === "Success") {
                    setIsAuth(true);
                    setMail(res.data.mail); //email
                    setUserRole(res.data.userRole); // rola użytkownika
                    setNewMessage({ ...newMessage, senderMail: res.data.mail });
                } else {
                    setIsAuth(false);
                    setMessage(res.data.Error);
                }
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3001/api/messages/getReceivers')
            .then(res => {
                setReceivers(res.data);
            })
            .catch(err => console.log(err));
    }, [userRole]);

    const handleLogout = () => {
        axios.get('http://localhost:3001/api/auth/logout')
            .then(res => {
                // Przekierowanie na stronę główną po wylogowaniu
                window.location.href = "/main";
            }).catch(err => console.log(err));
    }

    const handleChange = ({ currentTarget: input }) => {
        setNewMessage({ ...newMessage, [input.name]: input.value })
        // console.log(newMessage);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        axios.post('http://localhost:3001/api/messages/sendMessage', newMessage)
            .then(res => {
                setError('');
                setSendMsgSuccess(true);
            }).catch(err => {
                if (err.response && err.response.status === 400) {
                    setError(err.response.data.error);
                    setSendMsgSuccess(false);

                } else {
                    setError('Wystąpił błąd podczas wysyłania wiadomości.');
                    setSendMsgSuccess(false);
                }
            });
    }

    return (
        <>
            {isAuth ? (
                <>
                    {getNavbar(userRole, mail, handleLogout)}
                    <Container>
                        <h1 className="text-center">WYŚLIJ WIADOMOŚĆ</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formReceiver">
                                <Form.Label>Odbiorca</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    onChange={handleChange}
                                    name="reciverID"
                                    value={newMessage.reciverID}
                                    required
                                >
                                    <option>Wybierz odbiorcę</option>
                                    {receivers.map((item) => (
                                        <option key={item.user_id} value={item.user_id}>
                                            {item.imie} {item.nazwisko}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formTitle">
                                <Form.Label>Tytuł</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="msgTitle"
                                    placeholder="Wprowadź tytuł"
                                    value={newMessage.msgTitle}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formContent">
                                <Form.Label>Treść wiadomości</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="msgContent"
                                    value={newMessage.msgContent}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            {sendMsgSuccess && <div className="alert text-center alert-success">Wiadomość została wysłana!</div>}
                            {error && <div className="alert text-center alert-danger">{error}</div>}

                            <Button variant="success" type="submit">WYŚLIJ</Button>
                        </Form>
                    </Container>
                    <div className='pt-5 pb-5'></div>
                    <SmallFooter />
                </>
            ) : (
                // User niezalogowany
                <></>
            )
            }
        </>
    )
}

export default NewMessage
