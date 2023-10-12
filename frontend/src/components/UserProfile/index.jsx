import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col, Card, CardGroup, Image } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi'
import { BsFillPersonFill, BsArrowRightShort, BsFillBellFill } from 'react-icons/bs';
import styles from "./style.css"
import axios from "axios"
import { useEffect, useState } from 'react';

const UserProfile = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [mail, setMail] = useState('');

    //sprawdzamy autoryzacje
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3001/api/auth/userprofile')
            .then(res => {
                if (res.data.Status === "Success") {
                    setIsAuth(true);
                    setMail(res.data.mail); //email
                } else {
                    setIsAuth(false);
                    setMessage(res.data.Error);
                }
            })
            .then(err => console.log(err));
    }, []);

    const handleDelete = () => {
        axios.get('http://localhost:3001/api/auth/logout')
            .then(res => {
                window.location.reload(true);
            }).catch(err => console.log(err));
    }

    return (
        <>
            {isAuth ? (
                // User zalogowany
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
                                <Nav.Link href="/userprofile"><Navbar.Brand><AiOutlineUser />  {mail}</Navbar.Brand></Nav.Link>
                                <Button variant="danger" onClick={handleDelete}>WYLOGUJ</Button>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <Container>
                        <h1 className="text-center">PROFIL UŻYTKOWNIKA</h1>
                        <Row>
                            <Col className="text-center">
                                <Button variant="secondary" className="mt-3" id="btn-edit" href="/edit-user-data">
                                    <div className="mt-3">
                                        <BsFillPersonFill /> Edytuj dane <BsArrowRightShort />
                                    </div>
                                </Button>
                            </Col>
                        </Row>
                        <Row >
                            <Col className="text-center">
                                <Button variant="secondary" className="mt-3" id="btn-jumps" href="/myjumps">
                                    <div className="mt-3">
                                        <BsFillBellFill /> Moje skoki <BsArrowRightShort />
                                    </div>
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </>
            ) : (
                // User niezalogowany
                <>jestes wylogowany - kiedys sie to poprawi</>
            )}
        </>


    )
}

export default UserProfile

{/* <Container className={styles.content}>
                <h1>PROFIL UŻYTKOWNIKA</h1>
                <Button variant="secondary" id="btn-edit"><BsFillPersonFill /> Edytuj dane <BsArrowRightShort /></Button>
                <Button variant="secondary"><BsFillPersonFill /> Moje skoki <BsArrowRightShort /></Button>
            </Container></> */}