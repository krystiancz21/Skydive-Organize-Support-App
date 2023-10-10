import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col, Card, CardGroup, Image } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi'
import { BsArrowLeft, BsTrash, BsUnlockFill, BsLockFill, BsPencilSquare  } from 'react-icons/bs';
import styles from "./style.css"

const OwnerManageAccount = () => {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#"><BiHomeAlt /></Nav.Link>
                            <Nav.Link href="#">TERMINY SKOKÓW</Nav.Link>
                            <Nav.Link href="#">PODSUMOWANIE FINANSOWE</Nav.Link>
                        </Nav>
                        <Nav.Link href="#"><Navbar.Brand><AiOutlineUser />  PROFIL WŁAŚCICIELA</Navbar.Brand></Nav.Link>
                        <Button variant="danger" href="#">WYLOGUJ</Button>
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
                                            <input type="radio" name="myRadio" value="userAccount" />  Użytkownik
                                        </label>
                                        <label class="radio-inline">
                                            <input type="radio" name="myRadio" value="employeeAccount" />  Pracownik
                                        </label>
                                    </div>
                                </Form>
                            </Col>
                        </Form.Group>
                        <Row>
                            <Col>
                                <h5>Czynności:</h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} className="mb-3">
                                <Button variant="success" type="submit" className="full-width-button">
                                    <BsPencilSquare className="icon-small mb-1" /> EDYTUJ DANE
                                </Button>
                            </Col>
                            <Col lg={6} className="mb-3">
                                <Button variant="danger" type="submit" className="full-width-button">
                                    <BsTrash className="icon-small mb-1" /> USUŃ KONTO
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} className="mb-3">
                                <Button variant="info" type="submit" className="full-width-button">
                                    <BsUnlockFill className="icon-small mb-1" /> ODBLOKUJ KONTO
                                </Button>
                            </Col>
                            <Col lg={6} className="mb-3">
                                <Button variant="warning" type="submit" className="full-width-button">
                                    <BsLockFill className="icon-small mb-1" /> ZABLOKUJ KONTO
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </Container></>
    )
}

export default OwnerManageAccount