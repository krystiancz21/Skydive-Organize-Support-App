import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col, Card, CardGroup, Image } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi'
import { BsArrowLeft, BsTrash, BsPencil } from 'react-icons/bs';
import styles from "./style.css"

const OwnerFinancialOverview = () => {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#"><BiHomeAlt /></Nav.Link>
                            <Nav.Link href="#">TERMINY SKOKÓW</Nav.Link>
                            <Nav.Link href="#">KONTA PRACOWNIKÓW</Nav.Link>
                        </Nav>
                        <Nav.Link href="#"><Navbar.Brand><AiOutlineUser />  PROFIL WŁAŚCICIELA</Navbar.Brand></Nav.Link>
                        <Button variant="danger" href="#">WYLOGUJ</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className='powrot'><BsArrowLeft /></div>
            <Container className={styles.content}>
                <h1 className="text-center">PODSUMOWANIE FINANSOWE</h1>
                <Row className="mb-2">
                    <Col>
                        <h4>Wybierz datę:</h4>
                    </Col>
                </Row>
                <Row>
                    <Form>
                        <Row>
                            <Col lg={{ span: 5  , offset: 1 }}>
                                <Form.Group as={Row} controlId="formDateFrom" className="mb-3">
                                    <Form.Label column sm={3}>
                                        Data od:
                                    </Form.Label>
                                    <Col sm={9}>
                                        <FormControl
                                            type="date"
                                            name="dateFrom"
                                            required
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={{ span: 5  , offset: 0 }}>
                            <Form.Group as={Row} controlId="formDateTo" className="mb-3">
                                    <Form.Label column sm={3}>
                                    Data do:
                                    </Form.Label>
                                    <Col sm={9}>
                                        <FormControl
                                            type="date"
                                            name="dateTo"
                                            required
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Row>
                <Row className="mb-5">
                    <Col>
                        <Button variant="success" type="submit">POKAŻ</Button>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col>
                        <h4>Wynik podsumowania:</h4>
                    </Col>
                </Row>
                <Row>
                    <Form>
                        <Row>
                            <Col lg={{ span: 5  , offset: 1 }}>
                                <Form.Group as={Row} controlId="formJumpsNumber" className="mb-3">
                                    <Form.Label column sm={3}>
                                        Liczba skoków:
                                    </Form.Label>
                                    <Col sm={9}>
                                        <FormControl
                                            type="input"
                                            placeholder="36"
                                            name="jumpsNumber"
                                            required
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col lg={{ span: 5  , offset: 0 }}>
                            <Form.Group as={Row} controlId="formAmountOfMoney" className="mb-3">
                                    <Form.Label column sm={3}>
                                        Kwota:
                                    </Form.Label>
                                    <Col sm={9}>
                                        <FormControl
                                            type="input"
                                            placeholder="12600 PLN"
                                            name="amountOfMoney"
                                            required
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Row>
            </Container></>
    )
}

export default OwnerFinancialOverview
