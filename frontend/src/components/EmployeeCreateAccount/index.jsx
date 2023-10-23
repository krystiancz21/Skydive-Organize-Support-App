import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col, Card, CardGroup, Image } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi'
import { BsArrowLeft, BsPersonCircle, BsArrowRight } from 'react-icons/bs';
import styles from "./style.css"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";

const EmployeeCreateAccount = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
    })
    const [isAuth, setIsAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [mail, setMail] = useState('');
    const [userRole, setUserRole] = useState('');
    const [createUserSuccess, setCreateUserSuccess] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
        //console.log(data); // Wyświetlanie w przeglądarce zmian w polach formularza, przechwycinych przez handleChange
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3001/api/auth/register", data); // /api/auth
            if (response.data.error) {
                setError(response.data.error);
                setCreateUserSuccess(false);
            } else if (response.data.Status === "Success") {
                setError('');
                setCreateUserSuccess(true);
            } else {
                console.error("Błąd rejestracji: Niepoprawna odpowiedź z serwera");
            }

            console.log(response.data);
        } catch (error) {
            console.error('Błąd podczas rejestracji: ' + error.message);
        }
    };

    //sprawdzamy autoryzacje
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3001/api/auth/employee-create-account')
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

    return (
        <>
            {isAuth ? (
                <>
                    {/* Wyświetl odpowiednią nawigację w zależności od roli */}
                    {userRole === 'pracownik' && (
                        // User zalogowany
                        <>
                            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                                <Container>
                                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                    <Navbar.Collapse id="responsive-navbar-nav">
                                        <Nav className="me-auto">
                                            <Nav.Link href="/main"><BiHomeAlt /></Nav.Link>
                                            <Nav.Link href="/employeeoffer">OFERTA</Nav.Link>
                                            <Nav.Link href="/messages">WIADOMOŚCI</Nav.Link>
                                            <Nav.Link href="/employeemanagejumps">ZARZĄDZANIE SKOKAMI</Nav.Link>
                                        </Nav>
                                        <Nav.Link href="/userprofile"><Navbar.Brand><AiOutlineUser /> {mail}</Navbar.Brand></Nav.Link>
                                        <Button variant="danger" onClick={handleLogout}>WYLOGUJ</Button>
                                    </Navbar.Collapse>
                                </Container>
                            </Navbar>
                            <Container className={styles.content}>
                                <h1 className="text-center">TWORZENIE KONTA UŻYTKOWNIKA</h1>
                                <Form onSubmit={handleSubmit} className="text-center">
                                    <div className='max-width-form'>
                                        <Form.Group as={Row} controlId="formOwnerCreateAccountName" className="mb-3">
                                            <Form.Label column sm={2}>
                                                Imię
                                            </Form.Label>
                                            <Col sm={10}>
                                                <FormControl
                                                    type="name"
                                                    placeholder="Jan"
                                                    name="firstName"
                                                    onChange={handleChange}
                                                    value={data.firstName}
                                                    required
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formOwnerCreateAccountLastName" className="mb-3">
                                            <Form.Label column sm={2}>
                                                Nazwisko
                                            </Form.Label>
                                            <Col sm={10}>
                                                <FormControl
                                                    type="surname"
                                                    placeholder="Kowalski"
                                                    name="lastName"
                                                    onChange={handleChange}
                                                    value={data.lastName}
                                                    required
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formOwnerCreateAccountEmail" className="mb-3">
                                            <Form.Label column sm={2}>
                                                E-mail
                                            </Form.Label>
                                            <Col sm={10}>
                                                <FormControl
                                                    type="email"
                                                    placeholder="jankowalski@email.com"
                                                    name="email"
                                                    onChange={handleChange}
                                                    value={data.email}
                                                    required
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formOwnerCreateAccountPassword" className="mb-3">
                                            <Form.Label column sm={2}>
                                                Hasło
                                            </Form.Label>
                                            <Col sm={10}>
                                                <FormControl
                                                    type="password"
                                                    placeholder="********"
                                                    name="password"
                                                    onChange={handleChange}
                                                    value={data.password}
                                                    required
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formOwnerCreateAccountPhone" className="mb-3">
                                            <Form.Label column sm={2}>
                                                Telefon
                                            </Form.Label>
                                            <Col sm={10}>
                                                <FormControl
                                                    type="phone"
                                                    placeholder="666777888"
                                                    name="phoneNumber"
                                                    onChange={handleChange}
                                                    value={data.phoneNumber}
                                                    required
                                                />
                                            </Col>
                                        </Form.Group>
                                        {/* <Form.Group as={Row} controlId="formOwnerCreateAccountRole" className="mb-3">
                                            <Form.Label column sm={2}>
                                                Rola
                                            </Form.Label>
                                            <Col md={10} className="form-col">
                                                <Form>
                                                    <div className='przyciskiradio'>
                                                        <label class="radio-inline">
                                                            <input type="radio" name="myRadio" value="userAccount" checked disabled />  Użytkownik
                                                        </label>
                                                    </div>
                                                </Form>
                                            </Col>
                                        </Form.Group> */}
                                    </div>

                                    {createUserSuccess && <div className="alert alert-success">Pomyślnie udało się utworzyć konto nowego użytkownika!</div>}
                                    {error && <div className="alert alert-danger">{error}</div>}
                                    <Button variant="success" type="submit">UTWÓRZ KONTO</Button>
                                </Form>
                            </Container></>
                    )}
                </>
            ) : (
                // User niezalogowany
                <></>
            )}
        </>
    );
}

export default EmployeeCreateAccount