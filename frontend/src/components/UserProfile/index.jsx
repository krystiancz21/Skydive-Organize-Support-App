import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col, Card, CardGroup, Image } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi'
import { BsFillPersonFill, BsArrowRightShort, BsFillBellFill } from 'react-icons/bs';
import styles from "./style.css"

const UserProfile = () => {
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
                <h1 className="text-center">PROFIL UŻYTKOWNIKA</h1>
                <Row>
                    <Col>
                        <Button variant="secondary" className="mt-3" id="btn-edit" href="/edit-user-data">
                            <BsFillPersonFill /> Edytuj dane <BsArrowRightShort />
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button variant="secondary" className="mt-3" id="btn-jumps" href="/myjumps">
                            <BsFillBellFill /> Moje skoki <BsArrowRightShort />
                        </Button>
                    </Col>
                </Row>
            </Container></>


    )
}

export default UserProfile

{/* <Container className={styles.content}>
                <h1>PROFIL UŻYTKOWNIKA</h1>
                <Button variant="secondary" id="btn-edit"><BsFillPersonFill /> Edytuj dane <BsArrowRightShort /></Button>
                <Button variant="secondary"><BsFillPersonFill /> Moje skoki <BsArrowRightShort /></Button>
            </Container></> */}