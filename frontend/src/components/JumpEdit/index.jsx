import { Container, Nav, Navbar, Button, Row, Col } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi'
import styles from "./style.css"
import axios from "axios";
import Calendar from 'react-calendar';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';

const JumpEdit = () => {
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [mail, setMail] = useState('');
    const [userRole, setUserRole] = useState('');

    const [date, setDate] = useState(new Date());
    const [availableJumps, setAvailableJumps] = useState([]);
    const [availableDates, setAvailableDates] = useState([]);

    const { reservationId } = useParams();

    const [jumpOldData, setOldJumpData] = useState({
        rodzaj_skoku_id: "",
        nazwa: "",
        data: "",
        godzina: "",
    });

    //sprawdzamy autoryzacje
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3001/api/auth/userprofile')
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
            .catch(err => console.log(err.message));
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

    useEffect(() => {
        axios.post('http://localhost:3001/api/jumps/showJumpsById', { jumpId: reservationId })
            .then(res => {
                setOldJumpData({
                    rodzaj_skoku_id: res.data[0].rodzaj_skoku_id,
                    nazwa: res.data[0].nazwa_skoku,
                    data: moment(res.data[0].data_czas).format('DD.MM.YYYY'),
                    godzina: moment(res.data[0].data_czas).format('HH:mm'),
                });
            })
            .catch(err => console.log(err.message));
    }, [reservationId]);

    // wyswietlanie dat w kalendarzu
    useEffect(() => {
        if (jumpOldData.rodzaj_skoku_id) {
            axios.post('http://localhost:3001/api/jumps/freeDatesOnJump', { type: jumpOldData.rodzaj_skoku_id })
                .then(res => {
                    const formattedDates = res.data.map(item => {
                        const date = new Date(item.data_czas);
                        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                        return formattedDate;
                    });
                    setAvailableDates(formattedDates);
                })
                .catch(err => console.log(err.message));
        }
    }, [jumpOldData.rodzaj_skoku_id]);

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

    // Szczegóły dot. danego terminu (konkretna data/godzina skoku wybrana przez usera)
    useEffect(() => {
        if (jumpOldData.rodzaj_skoku_id) {
            axios.post('http://localhost:3001/api/jumps/availableDatesByJumpId', { date: date, type: jumpOldData.rodzaj_skoku_id })
                .then(res => {
                    setAvailableJumps(res.data); // Ustaw dostępne skoki na podstawie wyników z serwera
                })
                .catch(err => console.log(err.message));
        }
    }, [date, jumpOldData]);

    // Edycja terminu skoku
    const handleEditJump = (termin_id) => {
        axios.post('http://localhost:3001/api/jumps/editJumpReservationById', {
            rezerwacje_id: reservationId,
            termin_id: termin_id,
        })
            .then(res => {
                if (res.data.error) {
                    window.alert("Wystąpił błąd podczas edycji skoku.");
                } else {
                    // navigate(`/jump-details/${reservationId}`);
                    navigate(`/jump-details/${reservationId}`, { state: { message: "Pomyślnie zmieniono datę skoku!" } });
                }
            })
            .catch(err => console.log(err.message));
    };

    // Nawigacja dla poszczególnych ról
    const getNavbar = (role, mail, handleLogout) => {
        switch (role) {
            case 'klient':
                return (<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
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
                );
            case 'pracownik':
                return (
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Container>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="/main"><BiHomeAlt /></Nav.Link>
                                    <Nav.Link href="/offer">OFERTA</Nav.Link>
                                    <Nav.Link href="/jump-dates">TERMINY SKOKÓW</Nav.Link>
                                    <Nav.Link href="/messages">WIADOMOŚCI</Nav.Link>
                                    <Nav.Link href="/employee-users-accounts">KONTA UŻYTKOWNIKÓW</Nav.Link>
                                    <Nav.Link href="/employee-manage-jumps">ZARZĄDZANIE SKOKAMI</Nav.Link>
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
                                    <Nav.Link href="/jump-dates">TERMINY SKOKÓW</Nav.Link>
                                    <Nav.Link href="/messages">WIADOMOŚCI</Nav.Link>
                                    <Nav.Link href="/employee-users-accounts">KONTA UŻYTKOWNIKÓW</Nav.Link>
                                    <Nav.Link href="/employee-manage-jumps">ZARZĄDZANIE SKOKAMI</Nav.Link>
                                    <Nav.Link href="/owner-financial-overview">PODSUMOWANIE FINANSOWE</Nav.Link>
                                </Nav>
                                <Nav.Link href="/userprofile"><Navbar.Brand><AiOutlineUser />  {mail}</Navbar.Brand></Nav.Link>
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
                // User zalogowany
                <>
                    {getNavbar(userRole, mail, handleLogout)}
                    <Container>
                        <Row className='mt-5'>
                            <Col>
                                <h2>Edytuj termin zarezerwowanego skoku</h2>
                                <h5>Rodzaj skoku: <b>{jumpOldData.nazwa}</b></h5>
                                <h5 className="mb-1">Poprzedni termin skoku:</h5>
                                <p className="mb-0">Data: {jumpOldData.data}</p>
                                <p>Godzina: {jumpOldData.godzina}</p>
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
                                                <li key={index} className="jump-avaiable-date-container">
                                                    <p className="mb-1">Data: {moment(jump.data_czas).format('DD.MM.YYYY')}</p>
                                                    <p className="mb-1">Godzina: {moment(jump.data_czas).format('HH:mm')}</p>
                                                    <p className="mb-1">Liczba wolnych miejsc: {jump.liczba_miejsc_w_samolocie}</p>
                                                    <Button variant="primary" className="mt-2" onClick={() => handleEditJump(jump.terminy_id)}>
                                                        Rezerwuj nową datę
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
                <></> // User niezalogowany
            )}
        </>


    )
}

export default JumpEdit