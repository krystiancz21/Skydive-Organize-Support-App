import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col, Card, CardGroup, Image } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi'
import { BsFillPersonFill, BsArrowRightShort, BsFillBellFill } from 'react-icons/bs';
import styles from "./style.css"
import axios from "axios";
import Calendar from 'react-calendar';
import moment from 'moment'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';

const JumpCalendar = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [mail, setMail] = useState('');
    const [date, setDate] = useState(new Date());
    const [availableJumps, setAvailableJumps] = useState([]);
    const [availableDates, setAvailableDates] = useState([]);

    const typeMapping = {
        skok_samodzielny: 'Skok samodzielny z licencją',
        skok_w_tandemie: 'Skok w tandemie',
        skok_w_tandemie_z_kamerzysta: 'Skok w tandemie z kamerzystą',
    };

    const { type } = useParams();
    const selectedType = typeMapping[type];

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
            .catch(err => console.log(err));
    }, []);

    const handleLogout = () => {
        axios.get('http://localhost:3001/api/auth/logout')
            .then(res => {
                window.location.reload(true);
            }).catch(err => console.log(err));
    }

    const handleDateChange = (date) => {
        let currentDate = moment(date).format('YYYY-MM-DD');
        setDate(currentDate);
    }

    // const handleCheckDates = () => {
    //     axios.post('http://localhost:3001/api/jumps/availableDates', { date: date, selectedType: selectedType })
    //         .then(res => {
    //             console.log(res.data);
    //         }).catch(err => console.log(err));
    // }

    //zaznaczenie konkretnej daty
    useEffect(() => {
        axios.post('http://localhost:3001/api/jumps/availableDates', { date: date, selectedType: selectedType })
            .then(res => {
                setAvailableJumps(res.data); // Ustaw dostępne skoki na podstawie wyników z serwera
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }, [date, selectedType]);


    // wyswietlanie dat w kalendarzu
    useEffect(() => {
        axios.post('http://localhost:3001/api/jumps/freeDates', { selectedType: selectedType })
            .then(res => {
                const formattedDates = res.data.map(item => {
                    const date = new Date(item.data_czas);
                    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                    return formattedDate;
                });
                setAvailableDates(formattedDates);
                console.log(formattedDates);
            })
            .catch(err => console.log(err));
    }, []);

    // podświetlanie pól w kalendarzu ( wolny termin)
    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const dateStr = moment(date).format('YYYY-MM-DD');
            if (availableDates.includes(dateStr)) {
                return <div style={{ backgroundColor: 'green', height: '100%', width: '100%', position: 'absolute', opacity: 0.2 }}></div>;
            }
        }
        return null;
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
                                <Button variant="danger" onClick={handleLogout}>WYLOGUJ</Button>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <Container>
                        <Row className='mt-5'>
                            <Col className="text-center">
                                <h3 className="text-left">Wybierz termin i zarezerwuj skok</h3>
                                <h5 className="text-left">Rodzaj skoku: <b>{selectedType}</b></h5>
                                <div className="my-3">
                                    {/* <p>
                                        <span className="text-danger">Kolor czerwony</span> - nie skaczemy
                                    </p> */}
                                    <p>
                                        <span className="text-success">Kolor zielony</span> - oznacza wolne terminy
                                    </p>
                                    {/* <p>
                                        <span className="text-primary">Kolor niebieski</span> - brak wolnych miejsc
                                    </p> */}
                                </div>
                            </Col>
                            <Col className="text-center">
                                <Calendar
                                    value={date}
                                    onChange={handleDateChange}
                                    minDate={new Date()}
                                    tileContent={tileContent}
                                />
                            </Col>
                        </Row>
                        <Row className="text-center my-3">
                            <Col>
                                {availableJumps.length > 0 && (
                                    <div>
                                        <h2>Dostępne skoki w wybranym terminie:</h2>
                                        <ul className="list-unstyled">
                                            {availableJumps.map((jump, index) => (
                                                <li key={index}>
                                                    Data: {moment(jump.data_czas).format('DD.MM.YYYY HH:mm')} - Liczba wolnych miejsc: {jump.liczba_miejsc_w_samolocie}
                                                    <div>
                                                        <Button variant="primary">Zamów</Button>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </Col>
                        </Row>
                        {/* <Row>
                            <Col className="text-center">
                                <Button variant="primary" className="mt-3" onClick={handleCheckDates}>
                                    Wyświetl
                                </Button>
                            </Col>
                        </Row> */}
                    </Container>
                </>
            ) : (
                <></> // User niezalogowany
            )}
        </>


    )
}

export default JumpCalendar