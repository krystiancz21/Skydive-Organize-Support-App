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

const JumpDates = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [mail, setMail] = useState('');
    const [date, setDate] = useState(new Date());
    const [availableJumps, setAvailableJumps] = useState([]);
    const [availableDates, setAvailableDates] = useState([]);
    const [jumpName, setJumpName] = useState('');

    // const { type } = useParams();

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

    // NIEZALOGOWANY
    // nie zalogowany - wszystke daty - wszystkie skoki
    useEffect(() => {
        axios.get('http://localhost:3001/api/jumps/freeDatesOnAllJumpType')
            .then(res => {
                setAvailableDates(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    // podświetlanie pól w kalendarzu (wolny termin)
    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const dateStr = moment(date).format('YYYY-MM-DD');
            const matchingDate = availableDates.find(item => item.data_czas.includes(dateStr));
            if (matchingDate) {
                return <div style={{ backgroundColor: 'green', height: '100%', width: '100%', position: 'absolute', opacity: 0.2 }}></div>;
            }
        }
        return null;
    };

    // Szczegóły dot. danego terminu (konkretna data/godzina skoku wybrana przez usera)
    useEffect(() => {
        axios.post('http://localhost:3001/api/jumps/availableDateAllJumpType', { date: date })
            .then(res => {
                setAvailableJumps(res.data); // Ustaw dostępne skoki na podstawie wyników z serwera
            })
            .catch(err => console.log(err));
    }, [date]);




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
                            <Col>
                                <h2>Wolne terminy skoków</h2>
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
                                <h2>Wolne terminy na skoki</h2>

                                {availableJumps.length > 0 ? (
                                    <>
                                        <ul className="list-unstyled w-50 mx-auto">
                                            {availableJumps.map((jump, index) => (
                                                <li key={index} className="accounts-container">
                                                    <h5 className="mb-1">{jump.nazwa}</h5>
                                                    <p className="mb-1">Data: {moment(jump.data_czas).format('DD.MM.YYYY')}</p>
                                                    <p className="mb-1">Godzina: {moment(jump.data_czas).format('HH:mm')}</p>
                                                    <p className="mb-1">Liczba wolnych miejsc: {jump.liczba_miejsc_w_samolocie}</p>
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
                // User niezalogowany
                <>
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Container>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="/main"><BiHomeAlt /></Nav.Link>
                                </Nav>
                                <Link to="/login">
                                    <Button variant="success">ZALOGUJ</Button>
                                </Link>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <Container>
                        <Row className='mt-5'>
                            <Col>
                                <h2>Wolne terminy skoków</h2>
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
                                <h2>Wolne terminy na skoki</h2>

                                {availableJumps.length > 0 ? (
                                    <>
                                        <ul className="list-unstyled w-50 mx-auto">
                                            {availableJumps.map((jump, index) => (
                                                <li key={index} className="accounts-container">
                                                    <h5 className="mb-1">{jump.nazwa}</h5>
                                                    <p className="mb-1">Data: {moment(jump.data_czas).format('DD.MM.YYYY')}</p>
                                                    <p className="mb-1">Godzina: {moment(jump.data_czas).format('HH:mm')}</p>
                                                    <p className="mb-1">Liczba wolnych miejsc: {jump.liczba_miejsc_w_samolocie}</p>
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
            )}
        </>


    )
}

export default JumpDates