import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi';
import axios from "axios";
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

const JumpDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isAuth, setIsAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [mail, setMail] = useState('');
    const [userRole, setUserRole] = useState('');

    const [editSuccess, setEditSuccess] = useState(location.state?.message);
    const { jumpId } = useParams();

    const [jumpData, setJumpData] = useState({
        rezerwacje_id: "",
        imie: "",
        nazwisko: "",
        nazwa: "",
        data: "",
        godzina: "",
        miejsce_startu: "",
        liczba_osob: "",
        sposob_zaplaty: "",
        cena: "",
        status_skoku: "",
    });

    //sprawdzamy autoryzacje
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3001/api/auth/myjumps')
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
                // Przekierowanie na stronę główną po wylogowaniu
                window.location.href = "/main";
                //window.location.reload(true);
            }).catch(err => console.log(err));
    }

    useEffect(() => {
        axios.post('http://localhost:3001/api/jumps/showJumpsById', { jumpId: jumpId })
            .then(res => {
                setJumpData({
                    rezerwacje_id: res.data[0].rezerwacje_id,
                    imie: res.data[0].imie,
                    nazwisko: res.data[0].nazwisko,
                    nazwa: res.data[0].nazwa_skoku,
                    data: moment(res.data[0].data_czas).format('DD.MM.YYYY'),
                    godzina: moment(res.data[0].data_czas).format('HH:mm'),
                    miejsce_startu: res.data[0].miejsce_startu,
                    liczba_osob: res.data[0].liczba_miejsc_w_samolocie,
                    sposob_zaplaty: res.data[0].nazwa,
                    cena: `${res.data[0].cena} PLN`,
                    status_skoku: res.data[0].status_skoku_id,

                });
            })
            .catch(err => console.log(err));
    }, [jumpId]);

    const handleResign = () => {
        const rezerwacjaId = jumpData.rezerwacje_id;

        // Wywołanie zapytania do usunięcia rezerwacji
        if (window.confirm("Czy na pewno chcesz zrezygnować?")) {
            axios.post('http://localhost:3001/api/jumps/resignJump', { rezerwacjaId: rezerwacjaId })
                .then(res => {
                    // KOMUNIKAT NA FRONT ZE POPRAWNIE ZREZYGNOWANO I PRZEKIEROWANIE
                    navigate("/myjumps");
                })
                .catch(err => console.log(err));
        }
    };

    const handleEditJump = () => {
        const rezerwacjaId = jumpData.rezerwacje_id;
        navigate(`/jump-edit/${rezerwacjaId}`);
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
                    <h1 className="text-center">SZCZEGÓŁY SKOKU</h1>
                    <Container className="form-container">
                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-2">
                                    <Form.Label>Imię</Form.Label>
                                    <FormControl
                                        type="text"
                                        name="imie"
                                        value={jumpData.imie}
                                        disabled
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-2">
                                    <Form.Label>Nazwisko</Form.Label>
                                    <FormControl
                                        type="text"
                                        name="nazwisko"
                                        value={jumpData.nazwisko}
                                        disabled
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-2">
                                    <Form.Label>Rodzaj skoku</Form.Label>
                                    <FormControl
                                        type="text"
                                        name="nazwa"
                                        value={jumpData.nazwa}
                                        disabled
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-2">
                                    <Form.Label>Data skoku</Form.Label>
                                    <FormControl
                                        type="text"
                                        name="data"
                                        value={jumpData.data}
                                        // value={moment(jumpData.data_czas).format('DD.MM.YYYY')}
                                        disabled

                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-2">
                                    <Form.Label>Godzina</Form.Label>
                                    <FormControl
                                        type="text"
                                        name="godzina"
                                        value={jumpData.godzina}
                                        // value={moment(jumpData.data_czas).format('HH:mm')}
                                        disabled
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-2">
                                    <Form.Label>Miejsce skoku</Form.Label>
                                    <FormControl
                                        type="text"
                                        name="miejsce_startu"
                                        value={jumpData.miejsce_startu}
                                        disabled
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            {/* <Col md={4}>
                                <Form.Group className="mb-2">
                                    <Form.Label>Liczba osób w samolocie</Form.Label>
                                    <FormControl
                                        type="text"
                                        name="liczba_osob"
                                        value={jumpData.liczba_osob}
                                        disabled
                                    />
                                </Form.Group>
                            </Col> */}
                            <Col md={4}>
                                <Form.Group className="mb-2">
                                    <Form.Label>Sposób zapłaty</Form.Label>
                                    <FormControl
                                        type="text"
                                        value={jumpData.sposob_zaplaty}
                                        disabled
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={{ span: 3, offset: 9 }}>
                                <Form.Group className="mb-2">
                                    <Row>
                                        <Col className="align-self-center text-end">
                                            <span className="do-zaplaty-label">DO ZAPŁATY</span>
                                        </Col>
                                        <Col>
                                            <FormControl
                                                type="text"
                                                name="cena"
                                                value={jumpData.cena}
                                                disabled
                                            />
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                {jumpData.status_skoku === 1 ? (
                                    <>
                                        <Button variant="danger" className="mt-3" id="przycisk" onClick={handleResign}>
                                            REZYGNUJE
                                        </Button>
                                        <Button variant="warning" className='mt-3' id="przycisk" onClick={handleEditJump}>
                                            EDYTUJ
                                        </Button>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </Col>
                        </Row>
                        {editSuccess &&
                            <Row className='mt-4'>
                                <Col>
                                    <Alert className="text-center" key="success" variant="success">
                                        {editSuccess}
                                    </Alert>
                                </Col>
                            </Row>
                        }
                    </Container>
                    <div className='pt-5 pb-5'></div>
                    <SmallFooter />
                </>
            ) : (
                <></> // User niezalogowany
            )}
        </>
    );
}

export default JumpDetails
