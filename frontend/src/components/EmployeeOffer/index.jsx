import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col, Card, CardGroup, Image } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi'
import { BsArrowRightShort } from 'react-icons/bs';
import styles from "./style.css"
import obraz from '../Images/obraz.jpg';

const EmployeeOffer = () => {
    return (
        <><Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/main"><BiHomeAlt /></Nav.Link>
                        <Nav.Link href="/messages">WIADOMOŚCI</Nav.Link>
                        <Nav.Link href="/employeeusersaccounts">KONTA UŻYTKOWNIKÓW</Nav.Link>
                        <Nav.Link href="/employeemanagejumps">ZARZĄDZANIE SKOKAMI</Nav.Link>
                    </Nav>
                    <Nav.Link href="/userprofile"><Navbar.Brand><AiOutlineUser />  PROFIL PRACOWNIKA</Navbar.Brand></Nav.Link>
                    <Button variant="danger" href="/logout">WYLOGUJ</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
            <Container className={styles.content}>
                <h1 className="text-center">OFERTA</h1>
                <CardGroup>
                    <Card>
                        <Card.Img variant="top" src={obraz} alt="img-oferta" />
                        <Card.Body>
                            <Card.Title>Skok samodzielny z licencją<p>Cena: 600zł</p></Card.Title>
                            <Button variant="success" className='przyciskButton'  >EDYTUJ OFERTĘ</Button>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Img variant="top" src={obraz} alt="img-terminy" />
                        <Card.Body>
                            <Card.Title>Skok w tandemie<p>Cena: 900zł</p></Card.Title>
                            <div className="mb-2">
                            <Button variant="success" className='przyciskButton' >EDYTUJ OFERTĘ</Button>
                            </div>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Img variant="top" src={obraz} alt="img-wiadomosci" />
                        <Card.Body>
                            <Card.Title>Skok w tandemie z kamerzystą<p>Cena: 1100zł</p></Card.Title>
                            <Button variant="success" className='przyciskButton'  >EDYTUJ OFERTĘ</Button>
                        </Card.Body>
                    </Card>
                </CardGroup>
            </Container></>
    )
}

export default EmployeeOffer

/* 767pix do 576pix */ 