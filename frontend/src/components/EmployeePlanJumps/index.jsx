import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col, Card, CardGroup, Image } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi'
import { BsArrowLeft, BsPersonCircle, BsArrowRight } from 'react-icons/bs';
import styles from "./style.css";
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";

const EmployeePlanJumps = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [mail, setMail] = useState('');
    const [userRole, setUserRole] = useState('');
    const [addSuccess, setAddSuccess] = useState(false);
    const [error, setError] = useState('');

    const [jumpTypes, setJumpTypes] = useState([]);

    const [newJumpData, setNewJumpData] = useState({
        jumpType: "",
        jumpDate: "",
        jumpHour: "",
        jumpFreeSlots: "",
        jumpStartPlace: "Lublin",
    });

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

        axios.get("http://localhost:3001/api/offer/showAllOffers")
            .then((response) => {
                setJumpTypes(response.data.offers); // Ustaw rodzaje skoków
            })
            .catch((error) => console.log(error));
    }, []);

    const handleChange = ({ currentTarget: input }) => {
        setNewJumpData({ ...newJumpData, [input.name]: input.value })
    }

    const handleLogout = () => {
        axios.get('http://localhost:3001/api/auth/logout')
            .then(res => {
                window.location.href = "/main";
            }).catch(err => console.log(err));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!newJumpData.jumpType || !newJumpData.jumpDate || !newJumpData.jumpHour || !newJumpData.jumpFreeSlots) {
            setError('Wszystkie pola są wymagane.');
            return;
        }

        const submitJumpData = {
            jumpType: newJumpData.jumpType,
            jumpDateTime: `${newJumpData.jumpDate} ${newJumpData.jumpHour}`,
            jumpFreeSlots: newJumpData.jumpFreeSlots,
            jumpStartPlace: newJumpData.jumpStartPlace,
        };

        axios.post('http://localhost:3001/api/jumps/addNewPlannedDate', submitJumpData)
            .then(res => {
                if (res.data.error) {
                    setError(res.data.error);
                    setAddSuccess(false);
                } else {
                    setAddSuccess(true);
                    setError('');
                }
            })
            .catch(err => {
                if (err.response.status === 400) {
                    setAddSuccess(false);
                    setError(err.response.data.error);
                } else {
                    console.error('Błąd: Nie udało się dodać nowego terminu skoku');
                    console.error(err);
                }
            });
    }

    return (
        <>
            {isAuth ? (
                <>
                    {userRole === 'pracownik' && (
                        <>
                            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                                <Container>
                                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                    <Navbar.Collapse id="responsive-navbar-nav">
                                        <Nav className="me-auto">
                                            <Nav.Link href="/main"><BiHomeAlt /></Nav.Link>
                                            <Nav.Link href="/employeeoffer">OFERTA</Nav.Link>
                                            <Nav.Link href="/messages">WIADOMOŚCI</Nav.Link>
                                            <Nav.Link href="/employeeusersaccounts">KONTA UŻYTKOWNIKÓW</Nav.Link>
                                        </Nav>
                                        <Nav.Link href="/userprofile"><Navbar.Brand><AiOutlineUser />  {mail}</Navbar.Brand></Nav.Link>
                                        <Button variant="danger" onClick={handleLogout}>WYLOGUJ</Button>
                                    </Navbar.Collapse>
                                </Container>
                            </Navbar>
                            <Container className={styles.content}>
                                <h1 className="text-center">ZAPLANUJ SKOKI</h1>
                                <Form className="text-center">
                                    <div className='max-width-form'>
                                        <Form.Group as={Row} controlId="formJumpType" className="mb-3">
                                            <Form.Label column sm={2}>
                                                Rodzaj skoku
                                            </Form.Label>
                                            <Col sm={10}>
                                                <Form.Select
                                                    as="select"
                                                    onChange={(e) => setNewJumpData({ ...newJumpData, jumpType: e.target.value })}
                                                    required
                                                >
                                                    <option value="">Wybierz typ skoku</option>
                                                    {jumpTypes.map((type) => (
                                                        <option key={type.skok_id} value={type.nazwa}>
                                                            {type.nazwa}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formJumpData" className="mb-3">
                                            <Form.Label column sm={2}>
                                                Wybierz date
                                            </Form.Label>
                                            <Col sm={10}>
                                                <FormControl
                                                    type="date"
                                                    name="jumpDate"
                                                    value={newJumpData.jumpDate}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formJumpHour" className="mb-3">
                                            <Form.Label column sm={2}>
                                                Wybierz godzine
                                            </Form.Label>
                                            <Col sm={10}>
                                                <FormControl
                                                    type="time"
                                                    name="jumpHour"
                                                    value={newJumpData.jumpHour}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formJumpFreeSlots" className="mb-3">
                                            <Form.Label column sm={2}>
                                                Liczba miejsc
                                            </Form.Label>
                                            <Col sm={10}>
                                                <FormControl
                                                    type="number"
                                                    name="jumpFreeSlots"
                                                    value={newJumpData.jumpFreeSlots}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </Col>
                                        </Form.Group>
                                        {/* <Form.Group as={Row} controlId="formJumpStartPlace" className="mb-3">
                                            <Form.Label column sm={2}>
                                                Miejsce startu
                                            </Form.Label>
                                            <Col sm={10}>
                                                <FormControl
                                                    type="text"
                                                    placeholder=""
                                                    name="jumpStartPlace"
                                                    value={newJumpData.jumpStartPlace}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </Col>
                                        </Form.Group> */}
                                    </div>
                                    {addSuccess && <div className="alert alert-success text-center mt-3">
                                        Pomyślnie udało się dodać termin skoku!
                                    </div>}
                                    {error && <div className="alert alert-danger">{error}</div>}
                                    <Button variant="success" type="submit" onClick={handleSubmit}>ZAPLANUJ SKOK</Button>
                                </Form>
                            </Container>
                        </>
                    )}
                    {userRole === 'admin' && (
                        <>
                            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                                <Container>
                                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                    <Navbar.Collapse id="responsive-navbar-nav">
                                        <Nav className="me-auto">
                                            <Nav.Link href="/main"><BiHomeAlt /></Nav.Link>
                                            <Nav.Link href="/offer">OFERTA</Nav.Link>
                                            <Nav.Link href="/messages">WIADOMOŚCI</Nav.Link>
                                            <Nav.Link href="/employeemanagejumps">ZARZĄDZANIE SKOKAMI</Nav.Link>
                                            <Nav.Link href="/owner-financial-overview">PODSUMOWANIE FINANSOWE</Nav.Link>
                                        </Nav>
                                        <Nav.Link href="/userprofile"><Navbar.Brand><AiOutlineUser /> {mail}</Navbar.Brand></Nav.Link>
                                        <Button variant="danger" onClick={handleLogout}>WYLOGUJ</Button>
                                    </Navbar.Collapse>
                                </Container>
                            </Navbar>
                            potem przekopjować container kontener od pracownika!
                        </>
                    )}
                </>
            ) : (
                // User niezalogowany
                <>
                </>
            )}
        </>
    );
}

export default EmployeePlanJumps