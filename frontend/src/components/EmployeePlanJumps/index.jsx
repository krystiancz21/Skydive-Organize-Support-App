import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col, Card, CardGroup, Image } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi'
import { BsArrowLeft, BsPersonCircle, BsArrowRight } from 'react-icons/bs';
import styles from "./style.css"

const EmployeePlanJumps = () => {
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
                            <Nav.Link href="/employeeusersaccounts">KONTA UŻYTKOWNIKÓW</Nav.Link>
                        </Nav>
                        <Nav.Link href="/userprofile"><Navbar.Brand><AiOutlineUser />  PROFIL PRACOWNIKA</Navbar.Brand></Nav.Link>
                        <Button variant="danger" href="/logout">WYLOGUJ</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className='powrot'><BsArrowLeft /></div>
            <Container className={styles.content}>
                <h1 className="text-center">ZAPLANUJ SKOKI</h1>
                <Form className="text-center">
                    <div className='max-width-form'>
                        <Form.Group as={Row} controlId="formOwnerCreateAccountName" className="mb-3">
                            <Form.Label column sm={2}>
                                Wybierz date
                            </Form.Label>
                            <Col sm={10}>
                                <FormControl
                                    type="date"
                                    name="data"
                                    required
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formOwnerCreateAccountEmail" className="mb-3">
                            <Form.Label column sm={2}>
                                Wybierz godzine
                            </Form.Label>
                            <Col sm={10}>
                                <FormControl
                                    type="text"
                                    placeholder="11:00"
                                    name="godzina"
                                    required
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formOwnerCreateAccountEmail" className="mb-3">
                            <Form.Label column sm={2}>
                                Liczba miejsc
                            </Form.Label>
                            <Col sm={10}>
                                <FormControl
                                    type="number"
                                    placeholder="5"
                                    name="miejsca"
                                    required
                                />
                            </Col>
                        </Form.Group>
                    </div>
                    <Button variant="success" type="submit">UTWÓRZ KONTO</Button>
                </Form>
            </Container></>
    )
}

export default EmployeePlanJumps