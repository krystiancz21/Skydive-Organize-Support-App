import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col, Card, CardGroup, Image } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi'
import { BsArrowLeft, BsPersonCircle, BsArrowRight } from 'react-icons/bs';
import styles from "./style.css"

const EmployeeUsersAccounts = () => {
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
                <Row>
                    <h1 className="text-center">KONTA UŻYTKOWNIKÓW</h1>
                </Row>
                <Row>
                    <Row className="accounts-container mb-3">
                        <Col className='mt-2'><BsPersonCircle /></Col>
                        <Col className='mt-2'>Jan</Col>
                        <Col className='mt-2'>Kowalski</Col>
                        <Col className='mt-2'>jankowalski@gmail.com</Col>
                        <Col>
                            <Button variant="success">Zarządzaj kontem <BsArrowRight /></Button>
                        </Col>
                    </Row>
                    <Row className="accounts-container mb-3">
                        <Col className='mt-2'><BsPersonCircle /></Col>
                        <Col className='mt-2'>Ewa</Col>
                        <Col className='mt-2'>Nowak</Col>
                        <Col className='mt-2'>ewanowak@gmail.com</Col>
                        <Col>
                            <Button variant="success">Zarządzaj kontem <BsArrowRight /></Button>
                        </Col>
                    </Row>
                </Row>
                <Row className="mt-3">
                    <Col className="text-center">
                        <h3>Dodaj nowego użytkownika</h3>
                        <Button variant="success" className="mt-3">UTWÓRZ KONTO</Button>
                    </Col>
                </Row>
            </Container></>
    )
}

export default EmployeeUsersAccounts