import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col, Card, CardGroup, Image } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi'
import { BsArrowLeft, BsArrowRightShort } from 'react-icons/bs';
import styles from "./style.css"

const Reservation = () => {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/main"><BiHomeAlt /></Nav.Link>
                            <Nav.Link href="/offer">OFERTA</Nav.Link>
                            <Nav.Link href="/messages">WIADOMOŚCI</Nav.Link>
                        </Nav>
                        <Nav.Link href="/userprofile"><Navbar.Brand><AiOutlineUser />  PROFIL UŻYTKOWNIKA</Navbar.Brand></Nav.Link>
                        <Button variant="danger" href="/logout">WYLOGUJ</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className='powrot'><BsArrowLeft /></div>
            <h1 className="text-center">REZERWACJA SKOKU</h1>
            <Container className="reservation-container">
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form.Group as={Row} controlId="formSignupName" className="mb-3">
                            <Form.Label column sm={2}>
                                Data skoku
                            </Form.Label>
                            <Col sm={10}>
                                <FormControl
                                    type="date"
                                    name="data"
                                    required
                                />
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>
                <h5 className="mt-1">Wybierz godzinę</h5>
                <Row>
                    <Col>
                        <Form>
                            <div className='przyciskiradio'>
                                <label class="radio-inline">
                                    <input type="radio" name="myRadio" value="10:00" />  10:00
                                </label>
                                <label class="radio-inline">
                                    <input type="radio" name="myRadio" value="14:00" />  14:00
                                </label>
                                <label class="radio-inline">
                                    <input type="radio" name="myRadio" value="18:00" />  18:00
                                </label>
                            </div>
                        </Form>
                    </Col>
                </Row>
                {/* <Form.Group as={Row} controlId="formSignupName" className="mb-3">
                    <Form.Label column sm={2}>
                        Data skoku
                    </Form.Label>
                    <Col sm={10}>
                        <FormControl
                            type="date"
                            name="data"
                            required
                        />
                    </Col>
                </Form.Group> */}
                <h5 className="mt-4">Uzupełnij dane</h5>
                <Row>
                    <Col md={4}>
                        <Form.Group className="mb-2">
                            <Form.Label>Liczba osób</Form.Label>
                            <FormControl
                                type="number"
                                name="peopleNumber"
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-2">
                            <Form.Label for="rodzajskoku">Rodzaj skoku</Form.Label>
                            {/* <select id="rodzajskoku">
                                <option value="Skok samodzielny">Skok samodzielny z licencją</option>
                                <option value="Skok samodzielny">Skok w tandemie</option>
                                <option value="Skok samodzielny">Skok w tandemie z kamerzystą</option>
                            </select> */}
                            <FormControl
                                type="text"
                                name="type"
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-2">
                            <Form.Label>Masa ciała</Form.Label>
                            <FormControl
                                type="number"
                                placeholder="max 110kg"
                                name="personWeight"
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Group className="mb-2">
                            <Form.Label>Sposób zapłaty</Form.Label>
                            <FormControl
                                type="text"
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-2">
                            <Form.Label>Do zapłaty</Form.Label>
                            <FormControl
                                type="number"
                                disabled
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 2, offset: 10 }}>
                        <Button variant="success" className="mt-3">POTWIERDŹ SKOK</Button>
                    </Col>
                </Row>
            </Container></>
    );
}

export default Reservation;