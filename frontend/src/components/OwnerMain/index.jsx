import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col, Card, CardGroup, Image } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi'
import { BsArrowRightShort } from 'react-icons/bs';
import styles from "./style.css"
import obraz from '../Images/obraz.jpg';

const OwnerMain = () => {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/main"><BiHomeAlt /></Nav.Link>
                        </Nav>
                        <Nav.Link href="/userprofile"><Navbar.Brand><AiOutlineUser />  PROFIL WŁAŚCICIELA</Navbar.Brand></Nav.Link>
                        <Button variant="danger" href="/logout">WYLOGUJ</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className={styles.content}>
                <h1 className="text-center">STRONA GŁÓWNA</h1>
                <CardGroup>
                    <Card>
                        <Card.Img variant="top" src={obraz} alt="img-oferta" className="p-2" />
                        <Card.Body>
                            <Card.Title><Button variant="primary" size="sm">GRAFIK SKOKÓW <BsArrowRightShort /></Button></Card.Title>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Img variant="top" src={obraz} alt="img-terminy" className="p-2" />
                        <Card.Body>
                            <Card.Title><Button variant="primary" size="sm">KONTA PRACOWNIKÓW <BsArrowRightShort /></Button></Card.Title>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Img variant="top" src={obraz} alt="img-wiadomosci" className="p-2" />
                        <Card.Body>
                            <Card.Title><Button variant="primary" size="sm">PODSUMOWANIE FINANSOWE <BsArrowRightShort /> </Button></Card.Title>
                        </Card.Body>
                    </Card>
                </CardGroup>
            </Container></>
    )
}

export default OwnerMain