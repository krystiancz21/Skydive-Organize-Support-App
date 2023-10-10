import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col, Card, CardGroup, Image } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi'
import { BsArrowLeft, BsFillTrashFill, BsPencilSquare } from 'react-icons/bs';
import styles from "./style.css"

const EditUserData = () => {
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
                            <Nav.Link href="/messages">WIADOMOŚCI</Nav.Link>
                        </Nav>
                        <Nav.Link href="/userprofile"><Navbar.Brand><AiOutlineUser />  PROFIL UŻYTKOWNIKA</Navbar.Brand></Nav.Link>
                        <Button variant="danger" href="/logout">WYLOGUJ</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className={styles.content}>
                <div className='powrot'><BsArrowLeft /></div>
                <h1 className="text-center">DANE OSOBOWE</h1>
                <Form className="text-center">
                    <div className='max-width-form'>
                        <Form.Group as={Row} controlId="formEditUserDataName" className="mb-3">
                            <Form.Label column sm={2}>
                                Imię
                            </Form.Label>
                            <Col sm={10}>
                                <FormControl
                                    type="name"
                                    placeholder="Jan"
                                    name="name"
                                    required
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formEditUserDataEmail" className="mb-3">
                            <Form.Label column sm={2}>
                                Nazwisko
                            </Form.Label>
                            <Col sm={10}>
                                <FormControl
                                    type="surname"
                                    placeholder="Kowalski"
                                    name="surname"
                                    required
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formEditUserDataEmail" className="mb-3">
                            <Form.Label column sm={2}>
                                E-mail
                            </Form.Label>
                            <Col sm={10}>
                                <FormControl
                                    type="email"
                                    placeholder="jankowalski@email.com"
                                    name="email"
                                    required
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formEditUserDataPassword" className="mb-3">
                            <Form.Label column sm={2}>
                                Hasło
                            </Form.Label>
                            <Col sm={10}>
                                <FormControl
                                    type="password"
                                    placeholder="********"
                                    name="password"
                                    required
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formEditUserDataPhone" className="mb-3">
                            <Form.Label column sm={2}>
                                Telefon
                            </Form.Label>
                            <Col sm={10}>
                                <FormControl
                                    type="phone"
                                    placeholder="666777888"
                                    name="phone"
                                    required
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formEditUserDataLicense" className="mb-3">
                            <Form.Label column lg={2}>
                                Licencja
                            </Form.Label>
                            <Col lg={4}>
                                <Button variant="secondary" id="btn-licence">DODAJ LICENCJĘ</Button>
                            </Col>
                        </Form.Group>
                    </div>
                    <div className='mt-5'>
                        <Button variant="success" className="mt-3" id="przycisk2"><BsPencilSquare /> EDYTUJ DANE</Button>
                        <Button variant="danger" className="mt-3" id="przycisk2"><BsFillTrashFill /> USUŃ KONTO</Button>
                    </div>
                </Form>
            </Container></>
    )
}

export default EditUserData