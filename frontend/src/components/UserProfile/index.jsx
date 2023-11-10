import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col, Card, CardGroup, Image } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi'
import { BsFillPersonFill, BsArrowRightShort, BsFillBellFill } from 'react-icons/bs';
import { Link } from "react-router-dom"
import styles from "./style.css"
import obraz from '../Images/obraz.jpg';
import axios from "axios";
import { useEffect, useState } from 'react';

const UserProfile = () => {
    const [error, setError] = useState("")
    const [isAuth, setIsAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [mail, setMail] = useState('');
    const [userRole, setUserRole] = useState('');

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
                    {userRole === 'klient' && (
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
                                        <Nav.Link href="#"><Navbar.Brand><AiOutlineUser /> {mail}</Navbar.Brand></Nav.Link>
                                        <Button variant="danger" onClick={handleLogout}>WYLOGUJ</Button>
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
                                <Row>
                                    <Col className="text-center">
                                        <Button variant="secondary" className="mt-3" id="btn-jumps" href="/myjumps">
                                            <div className="mt-3">
                                                <BsFillBellFill /> Moje skoki <BsArrowRightShort />
                                            </div>
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
                            <SmallFooter/>
                        </>
                    )}
                    {userRole === 'pracownik' && (
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
                                            <Nav.Link href="/employee-users-accounts">KONTA UŻYTKOWNIKÓW</Nav.Link>
                                            <Nav.Link href="/employee-manage-jumps">ZARZĄDZANIE SKOKAMI</Nav.Link>
                                        </Nav>
                                        <Nav.Link href="#"><Navbar.Brand><AiOutlineUser />  {mail}</Navbar.Brand></Nav.Link>
                                        <Button variant="danger" onClick={handleLogout}>WYLOGUJ</Button>
                                    </Navbar.Collapse>
                                </Container>
                            </Navbar>
                            <Container>
                                <h1 className="text-center">PROFIL PRACOWNIKA</h1>
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
                            <SmallFooter/>
                        </>
                    )}
                    {userRole === 'admin' && (
                        <><Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                            <Container>
                                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                <Navbar.Collapse id="responsive-navbar-nav">
                                    <Nav className="me-auto">
                                        <Nav.Link href="/main"><BiHomeAlt /></Nav.Link>
                                        <Nav.Link href="/offer">OFERTA</Nav.Link>
                                        <Nav.Link href="/reservation">TERMINY SKOKÓW</Nav.Link>
                                        <Nav.Link href="/messages">WIADOMOŚCI</Nav.Link>
                                        <Nav.Link href="/employee-users-accounts">KONTA UŻYTKOWNIKÓW</Nav.Link>
                                        <Nav.Link href="/employee-manage-jumps">ZARZĄDZANIE SKOKAMI</Nav.Link>
                                        <Nav.Link href="/owner-financial-overview">PODSUMOWANIE FINANSOWE</Nav.Link>
                                    </Nav>
                                    <Nav.Link href="#"><Navbar.Brand><AiOutlineUser />  {mail}</Navbar.Brand></Nav.Link>
                                    <Button variant="danger" onClick={handleLogout}>WYLOGUJ</Button>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                            <Container>
                                <h1 className="text-center">PROFIL ADMINISTRATORA</h1>
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
                            <SmallFooter/>
                        </>
                    )}</>
            ) : (
                // User niezalogowany
                <>
                </>
            )}
        </>
    );
}
export default UserProfile;