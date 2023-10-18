import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col, Card, CardGroup, Image } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi'
import { BsFillPersonFill, BsArrowRightShort, BsFillBellFill } from 'react-icons/bs';
import styles from "./style.css"
import axios from "axios";
import Calendar from 'react-calendar';
import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';

const UserProfile = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [mail, setMail] = useState('');
    // do kalendarza
    const [selectedDate, setSelectedDate] = useState(new Date());

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

    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log(date);
    };


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
                        <Row className='mt-5'>
                            <Col className="text-center">
                                <h3 className="text-left">Wybierz termin i zarezerwuj skok</h3>
                                <div className="my-3">
                                    <p>
                                        <span className="text-danger">Kolor czerwony</span> - nie skaczemy
                                    </p>
                                    <p>
                                        <span className="text-success">Kolor zielony</span> - skaczemy, wolne miejsca
                                    </p>
                                    <p>
                                        <span className="text-primary">Kolor niebieski</span> - brak wolnych miejsc
                                    </p>
                                </div>
                            </Col>
                            <Col className="text-center">
                                <Calendar
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                />
                            </Col>
                        </Row>
                    </Container>
                </>
            ) : (
                // User niezalogowany
                <></>
            )}
        </>


    )
}

export default UserProfile