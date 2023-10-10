import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col, Card, CardGroup, Image } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi'
import { BsFillPersonFill, BsArrowRightShort, BsFillBellFill, BsFillCalendarPlusFill } from 'react-icons/bs';
import { ImCancelCircle } from 'react-icons/im';
import styles from "./style.css"

const EmployeeManageJumps = () => {
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
                            <Nav.Link href="/employeeuseraccounts">KONTA UŻYTKOWNIKÓW</Nav.Link>
                        </Nav>
                        <Nav.Link href="/userprofile"><Navbar.Brand><AiOutlineUser />  PROFIL UŻYTKOWNIKA</Navbar.Brand></Nav.Link>
                        <Button variant="danger" href="/logout">WYLOGUJ</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className={styles.content}>
                <h1 className="text-center">ZARZĄDZANIE SKOKAMI</h1>
                <Row>
                    <Col>
                        <Button variant="secondary" className="mt-3" id="btn-edit">
                            <BsFillCalendarPlusFill /> Zaplanuj skoki <BsArrowRightShort />
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button variant="secondary" className="mt-3" id="btn-jumps">
                            <ImCancelCircle /> Odwołaj skoki <BsArrowRightShort />
                        </Button>
                    </Col>
                </Row>
            </Container></>


    )
}

export default EmployeeManageJumps

