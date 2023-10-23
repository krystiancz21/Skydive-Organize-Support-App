import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col, Card, CardGroup, Image } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi'
import { BsFillPersonFill, BsArrowRightShort, BsFillBellFill } from 'react-icons/bs';
import styles from "./style.css"
import axios from "axios";
import Calendar from 'react-calendar';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
                window.location.href = "/main";
            }).catch(err => console.log(err));
    }

    const handleDateChange = (date) => {
        let currentDate = moment(date).format('YYYY-MM-DD');
        setDate(currentDate);
    }

    // zaznaczenie konkretnej daty
    useEffect(() => {
        axios.post('http://localhost:3001/api/jumps/availableDates', { date: date, selectedType: selectedType })
            .then(res => {
                setAvailableJumps(res.data); // Ustaw dostępne skoki na podstawie wyników z serwera
                // console.log(res.data);
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
                // console.log(formattedDates);
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
                            <Col >
                                <h2>Wybierz termin i zarezerwuj skok</h2>
                                <h5>Rodzaj skoku: <b>{selectedType}</b></h5>
                                <div className="my-3">
                                    <p>
                                        <span className="text-success">Kolor zielony</span> - oznacza wolne terminy
                                    </p>
                                </div>
                                <div className="my-3">
                                    <Calendar
                                        value={date}
                                        onChange={handleDateChange}
                                        minDate={new Date()}
                                        tileContent={tileContent}
                                    />
                                </div>
                            </Col>
                            <Col className="text-center">
                                <h2>Dostępne skoki w wybranym terminie</h2>
                                {availableJumps.length > 0 ? (
                                    <>
                                        <ul className="list-unstyled w-50 mx-auto">
                                            {availableJumps.map((jump, index) => (
                                                <li key={index} className="accounts-container">
                                                    <p className="mb-1">Data: {moment(jump.data_czas).format('DD.MM.YYYY')}</p>
                                                    <p className="mb-1">Godzina: {moment(jump.data_czas).format('HH:mm')}</p>
                                                    <p className="mb-1">Liczba wolnych miejsc: {jump.liczba_miejsc_w_samolocie}</p>
                                                    <Link to={`/reservation/${jump.terminy_id}`}>
                                                        <Button variant="primary" className="mt-2">Zamów</Button>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                ) : (
                                    <>
                                        <p>W tym dniu nie ma zaplanowanych skoków. Wybierz inną datę.</p>
                                    </>
                                )}
                            </Col>
                        </Row>
                    </Container>
                </>
            ) : (
                <></> // User niezalogowany
            )}
        </>


    )
}

export default JumpCalendar