import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi'
import { BsArrowLeft, BsPersonCircle } from 'react-icons/bs';
import styles from "./style.css"
import logo from '../Images/logo.jpg';

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

const Stopka = () => (
    <footer className="big-footer">
        <Container>
            <Row>
                <Col md={4}>
                    <Logo />
                    <p>&copy; 2023 System wspomagający organizację skoków spadochronowych</p>
                </Col>
                <Col md={4}>
                    <FooterMenu />
                </Col>
                <Col md={4}>
                    <ContactInfo />
                </Col>
            </Row>
        </Container>
    </footer>
)

const Messages = () => {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/main"><BiHomeAlt /></Nav.Link>
                            <Nav.Link href="/offer">OFERTA</Nav.Link>
                            <Nav.Link href="/reservation">TERMINY SKOKÓW</Nav.Link>
                        </Nav>
                        <Nav.Link href="/userprofile"><Navbar.Brand><AiOutlineUser />  PROFIL UŻYTKOWNIKA</Navbar.Brand></Nav.Link>
                        <Button variant="danger" href="/logout">WYLOGUJ</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className='powrot'><BsArrowLeft /></div>
            <Container className={styles.content}>
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
            <Stopka />
        </>
    )
}

export default Messages