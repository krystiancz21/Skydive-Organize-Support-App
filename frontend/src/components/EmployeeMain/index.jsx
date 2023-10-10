import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col, Card, CardGroup, Image } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi'
import { BsArrowRightShort } from 'react-icons/bs';
import styles from "./style.css"
import obraz from '../Images/obraz.jpg';

const EmployeeMain = () => {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#"><BiHomeAlt /></Nav.Link>
                        </Nav>
                        <Nav.Link href="/userprofile"><Navbar.Brand><AiOutlineUser />  PROFIL PRACOWNIKA</Navbar.Brand></Nav.Link>
                        <Button variant="danger" href="/logout">WYLOGUJ</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className={styles.content}>
                <h1 className="text-center">STRONA GŁÓWNA</h1>
                <CardGroup>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Img variant="top" src={obraz} alt="img-oferta" />
                                <Card.Body>
                                    <Card.Title><Button variant="primary" size="sm">WIADOMOŚCI <BsArrowRightShort /></Button></Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Img variant="top" src={obraz} alt="img-terminy" />
                                <Card.Body>
                                    <Card.Title><Button variant="primary" size="sm">KONTA PRACOWNIKÓW <BsArrowRightShort /></Button></Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                    <Card>
                        <Card.Img variant="top" src={obraz} alt="img-wiadomosci" />
                        <Card.Body>
                            <Card.Title><Button variant="primary" size="sm">OFERTA <BsArrowRightShort /> </Button></Card.Title>
                        </Card.Body>
                    </Card>
                    </Col>
                    <Col>
                    <Card>
                        <Card.Img variant="top" src={obraz} alt="img-wiadomosci" />
                        <Card.Body>
                            <Card.Title><Button variant="primary" size="sm">ZARZĄDZANIE SKOKAMI <BsArrowRightShort /> </Button></Card.Title>
                        </Card.Body>
                    </Card>
                    </Col>
                    </Row>
                </CardGroup>
            </Container></>
    )
}

export default EmployeeMain