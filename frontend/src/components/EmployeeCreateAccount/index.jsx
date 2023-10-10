import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col, Card, CardGroup, Image } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi'
import { BsArrowLeft, BsPersonCircle, BsArrowRight } from 'react-icons/bs';
import styles from "./style.css"

const EmployeeCreateAccount = () => {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/main"><BiHomeAlt /></Nav.Link>
                            <Nav.Link href="/employeeoffer">OFERTA</Nav.Link>
                            <Nav.Link href="/messages">WIADOMOŚCI</Nav.Link>
                            <Nav.Link href="/employeemanagejumps">ZARZĄDZANIE SKOKAMI</Nav.Link>
                        </Nav>
                        <Nav.Link href="/userprofile"><Navbar.Brand><AiOutlineUser />  PROFIL PRACOWNIKA</Navbar.Brand></Nav.Link>
                        <Button variant="danger" href="/logout">WYLOGUJ</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className='powrot'><BsArrowLeft /></div>
            <Container className={styles.content}>
                <h1 className="text-center">TWORZENIE KONTA</h1>
                <Form className="text-center">
                    <div className='max-width-form'>
                        <Form.Group as={Row} controlId="formOwnerCreateAccountName" className="mb-3">
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
                        <Form.Group as={Row} controlId="formOwnerCreateAccountEmail" className="mb-3">
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
                        <Form.Group as={Row} controlId="formOwnerCreateAccountEmail" className="mb-3">
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
                        <Form.Group as={Row} controlId="formOwnerCreateAccountPassword" className="mb-3">
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
                        <Form.Group as={Row} controlId="formOwnerCreateAccountPhone" className="mb-3">
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
                        <Form.Group as={Row} controlId="formOwnerCreateAccountRole" className="mb-3">
                            <Form.Label column sm={2}>
                                Rola
                            </Form.Label>
                            <Col md={10} className="form-col">
                                <Form>
                                    <div className='przyciskiradio'>
                                        <label class="radio-inline">
                                            <input type="radio" name="myRadio" value="userAccount" checked disabled/>  Użytkownik
                                        </label>
                                    </div>
                                </Form>
                            </Col>
                        </Form.Group>
                    </div>
                    <Button variant="success" type="submit">UTWÓRZ KONTO</Button>
                </Form>
            </Container></>
    )
}

export default EmployeeCreateAccount