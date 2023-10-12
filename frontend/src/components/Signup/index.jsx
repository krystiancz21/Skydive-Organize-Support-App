import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

import styles from "./style.css"
import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col } from 'react-bootstrap';
import { BiHomeAlt } from 'react-icons/bi'


const Signup = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
    })
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
        // console.log(data); // Wyświetlanie w przeglądarce zmian w polach formularza, przechwycinych przez handleChange
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3001/api/auth/register", data); // /api/auth
            if (response.data.error) {
                setError(response.data.error);
            } else if (response.data.Status === "Success") {
                navigate('/login');
            } else {
                console.error("Błąd rejestracji: Niepoprawna odpowiedź z serwera");
            }

            console.log(response.data);
        } catch (error) {
            console.error('Błąd podczas rejestracji: ' + error.message);
        }
    };

    return (
        <><Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#"><BiHomeAlt /></Nav.Link>
                        <Nav.Link href="#">OFERTA</Nav.Link>
                        <Nav.Link href="#">TERMINY SKOKÓW</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
            <Container className={`${styles.content}  my-4`}>
                <h1 className="text-center">REJESTRACJA</h1>
                <Form onSubmit={handleSubmit} className="text-center">
                    <h4 className="mb-3">Podaj dane do rejestracji nowego konta</h4>
                    <div className='max-width-form'>
                        <Form.Group as={Row} controlId="formSignupFirstName" className="mb-3">
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
                        <Form.Group as={Row} controlId="formSignupLastName" className="mb-3">
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
                        <Form.Group as={Row} controlId="formSignupEmail" className="mb-3">
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
                        <Form.Group as={Row} controlId="formSignupPassword" className="mb-3">
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
                        <Form.Group as={Row} controlId="formSignupPhone" className="mb-3">
                            <Form.Label column sm={2}>
                                Numer telefonu
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
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <Button variant="success" type="submit" size="lg">ZAREJESTRUJ SIĘ</Button>
                    <div className='mt-4'>
                        <h4>Masz już konto?</h4>
                        <p>Kliknij w przycisk poniżej i zaloguj się!</p>
                        <Link to="/login">
                            <Button variant="primary" size="lg">ZALOGUJ SIĘ</Button>
                        </Link>
                    </div>
                </Form>
            </Container></>
    )
}

export default Signup