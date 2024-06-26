import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

import styles from "./style.css"
import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col } from 'react-bootstrap';
import { BiHomeAlt } from 'react-icons/bi'

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    })

    const [error, setError] = useState("")
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
        // console.log(data); // Wyświetlanie w przeglądarce zmian w polach formularza, przechwycinych przez handleChange
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3001/api/auth/login", data); // /api/auth
            if (response.data.Status === "Success") {
                navigate('/main');
            } else if (response.data.Error === "InvalidPassword") { // Obsłuż komunikat o niepoprawnym haśle
                setError("Niewłaściwe hasło, spróbuj ponownie");
            } else if (response.data.Error === "DeletedAccount") {
                setError("To konto zostało usunięte");
            } else if (response.data.Error === "BlockedAccount") {
                const blockedUntil = new Date(response.data.blockedUntil);
                const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
                const formattedBlockedUntil = blockedUntil.toLocaleDateString('pl-PL', options); 
                setError(`To konto jest zablokowane do ${formattedBlockedUntil}`);
            } else {
                setError("Niewłaściwe dane logowania, spróbuj ponownie");
            }

            console.log(response.data);
        } catch (error) {
            console.error('Błąd podczas logowania: ' + error.message);
        }
    };

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
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/main"><BiHomeAlt /></Nav.Link>
                            <Nav.Link href="/offer">OFERTA</Nav.Link>
                            <Nav.Link href="/jump-dates">TERMINY SKOKÓW</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className={styles.content}>
                <h1 className="text-center my-4">Zaloguj się do swojego konta</h1>
                <Form className="text-center" onSubmit={handleSubmit}>
                    <h4 className="mb-3">Podaj dane logowania</h4>
                    <div className='max-width-form'>
                        <Form.Group as={Row} controlId="formLoginEmail" className="mb-3">
                            <Form.Label column sm={2}>
                                Email
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
                        <Form.Group as={Row} controlId="formLoginPassword" className="mb-3">
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
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <Button variant="success" type="submit" size="lg">ZALOGUJ</Button>
                    <div className='mt-4'>
                        <h4>Nie masz konta?</h4>
                        <p>Kliknij w link poniżej i zarejestruj się!</p>
                        <Link to="/signup">
                            <Button variant="primary" size="lg">Zarejestruj się</Button>
                        </Link>
                    </div>
                </Form>
            </Container>
            <SmallFooter/>
        </>
    )
}

export default Login
