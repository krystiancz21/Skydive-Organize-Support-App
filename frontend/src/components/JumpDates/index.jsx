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
import logo from '../Images/logo.jpg';

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

    const Stopka = () => (
        <footer className="big-footer mt-5">
            <Container fluid>
                <Row>
                    <Col md={4} className="d-flex flex-column align-items-center text-center">
                        <div className='logo'>
                            {/*https://www.vecteezy.com/vector-art/17127793-parachute-logo-icon-design-and-symbol-skydiving-vector */}
                            <img src={logo} alt="Logo" />
                        </div>
                        <p>&copy; 2023 System wspomagający organizację skoków spadochronowych</p>
                    </Col>
                    <Col md={4} className="d-flex justify-content-center">
                        <div>
                            <h4>Szybkie linki</h4>
                            <ul className="list-unstyled">
                                <li><a href="/main">Strona główna</a></li>
                                <li><a href="/offer">Oferta</a></li>
                                <li><a href="/jump-calendar">Terminy skoków</a></li>
                                <li><a href="/messages">Wiadomości</a></li>
                            </ul>
                        </div>
                    </Col>
                    <Col md={4} className="d-flex justify-content-center">
                        <div>
                            <h4>Autorzy</h4>
                            <p>Krystian Czapla</p>
                            <p>Kacper Czajka</p>
                            <p>Mariusz Choroś</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );

    const SmallFooter = () => {
        const year = new Date().getFullYear();
    
        return (
            <footer className="text-center footer fixed-bottom">
                <p className="m-0 stopa">System wspomagający organizację skoków spadochronowych | Autorzy: Krystian Czapla, Kacper Czajka, Mariusz Choroś | &copy; {year}</p>
            </footer>
        );
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
                                    <Nav.Link href="/jump-dates">TERMINY SKOKÓW</Nav.Link>
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
                                {availableJumps.length > 0 ? (<>
                                        <ul className="list-unstyled w-50 mx-auto">
                                            {availableJumps.map((jump, index) => (
                                                <li key={index} className="jump-date-container">
                                                    <h5 className="mb-1">{jump.nazwa}</h5>
                                                    <p className="mb-1">Data: {moment(jump.data_czas).format('DD.MM.YYYY')}</p>
                                                    <p className="mb-1">Godzina: {moment(jump.data_czas).format('HH:mm')}</p>
                                                    <p className="mb-1">Liczba wolnych miejsc: {jump.liczba_miejsc_w_samolocie}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </>) : ( <>
                                        <p>W tym dniu nie ma zaplanowanych skoków. Wybierz inną datę.</p>
                                    </>
                                )}
                            </Col>

                        </Row>
                    </Container>
                    <Stopka/>
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
                                                <li key={index} className="jump-date-container">
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
                    <SmallFooter/>
                </>
            )}
        </>


    )
}

export default JumpDates