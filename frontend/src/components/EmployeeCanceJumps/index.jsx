import { Container, Nav, Navbar, Button, Row, Col } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi'
import styles from "./style.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import moment from 'moment';

const EmployeeCancelJumps = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [mail, setMail] = useState('');
    const [userRole, setUserRole] = useState('');

    const [date, setDate] = useState(new Date());
    const [availableJumps, setAvailableJumps] = useState([]);
    const [availableDates, setAvailableDates] = useState([]);

    //sprawdzamy autoryzacje
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3001/api/auth/employee-plan-jumps')
            .then(res => {
                if (res.data.Status === "Success") {
                    setIsAuth(true);
                    setMail(res.data.mail); //email
                    setUserRole(res.data.userRole); // Ustaw rolę użytkownika
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

    // wszystke daty - wszystkie skoki
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

    const handleJumpCancel = (jumpId) => {
        if (window.confirm("Czy na pewno chcesz odwołać skok?")) {
            axios.post(`http://localhost:3001/api/messages/sendMessageCancelJump`, { jumpId: jumpId })
                .then(res => {
                    // Wysłanie wiadomości o anulowaniu skoku
                    return axios.post(`http://localhost:3001/api/jumps/cancelPlannedJump`, { jumpId: jumpId });
                })
                .then(res => {
                    // Aktualizuj stan po pomyślnym anulowaniu skoku
                    window.location.reload(true);
                })
                .catch(err => console.log(err));
        }
    }

    // Nawigacja dla poszczególnych ról
    const getNavbar = (role, mail, handleLogout) => {
        switch (role) {
            case 'pracownik':
                return (
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Container>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="/main"><BiHomeAlt /></Nav.Link>
                                    <Nav.Link href="/offer">OFERTA</Nav.Link>
                                    <Nav.Link href="/messages">WIADOMOŚCI</Nav.Link>
                                    <Nav.Link href="/employee-users-accounts">KONTA UŻYTKOWNIKÓW</Nav.Link>
                                </Nav>
                                <Nav.Link href="/userprofile"><Navbar.Brand><AiOutlineUser /> {mail}</Navbar.Brand></Nav.Link>
                                <Button variant="danger" onClick={handleLogout}>WYLOGUJ</Button>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                );
            case 'admin':
                return (
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Container>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto d-flex align-items-center" style={{ fontSize: '14px' }}>
                                    <Nav.Link href="/main"><BiHomeAlt /></Nav.Link>
                                    <Nav.Link href="/offer">OFERTA</Nav.Link>
                                    <Nav.Link href="/messages">WIADOMOŚCI</Nav.Link>
                                    <Nav.Link href="/employee-users-accounts">KONTA UŻYTKOWNIKÓW</Nav.Link>
                                    <Nav.Link href="/owner-financial-overview">PODSUMOWANIE FINANSOWE</Nav.Link>
                                </Nav>
                                <Nav.Link href="/userprofile"><Navbar.Brand><AiOutlineUser /> {mail}</Navbar.Brand></Nav.Link>
                                <Button variant="danger" onClick={handleLogout}>WYLOGUJ</Button>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                );
            default:
                return null;
        }
    }

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
                <>
                    {getNavbar(userRole, mail, handleLogout)}
                    <Container>
                        <Row className='mt-5'>
                            <Col>
                                <h2>Terminy skoków</h2>
                                <div className="my-3">
                                    <p>
                                        <span className="text-success">Kolor zielony</span> - oznacza terminy zaplanowanych skoków
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
                                <h2>Zaplanowane terminy</h2>

                                {availableJumps.length > 0 ? (
                                    <>
                                        <ul className="list-unstyled w-50 mx-auto">
                                            {availableJumps.map((jump, index) => (
                                                <li key={index} className="accounts-container">
                                                    <h5 className="mb-1">{jump.nazwa}</h5>
                                                    <p className="mb-1">Data: {moment(jump.data_czas).format('DD.MM.YYYY HH:mm')}</p>
                                                    <Button variant="danger" type="submit" className="mt-1" onClick={() => handleJumpCancel(jump.terminy_id)}>
                                                        ODWOŁAJ
                                                    </Button>
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
                    <div className='pt-5 pb-5'></div>
                    <SmallFooter />
                </>
            ) : (
                // User niezalogowany
                <>
                </>
            )}
        </>
    );
}


export default EmployeeCancelJumps