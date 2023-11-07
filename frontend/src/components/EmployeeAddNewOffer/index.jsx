import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col, Card, CardGroup, Image } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi'
import { BsFillTrashFill } from 'react-icons/bs';
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";

const EmployeeAddNewOffer = () => {
    const [newOfferData, setNewOfferData] = useState({
        jumpName: "",
        jumpPrice: "",
        jumpSeats: "",
        jumpLicense: "",
        jumpWeight: ""
    })

    const [error, setError] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [mail, setMail] = useState('');
    const [userRole, setUserRole] = useState('');
    const [newOffer, setNewOffer] = useState('');


    //sprawdzamy autoryzacje
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3001/api/auth/employee-add-new-offer')
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

    // Wylogowanie
    const handleLogout = () => {
        axios.get('http://localhost:3001/api/auth/logout')
            .then(res => {
                window.location.href = "/main";
            }).catch(err => console.log(err));
    }

    const handleChange = ({ currentTarget: input }) => {
        setNewOfferData({ ...newOfferData, [input.name]: input.value })
        //console.log(`Nowa wartość pola ${input.name}: ${input.value}`);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/api/offer/addNewOffer', {
                newOfferData: newOfferData,
            });
            if (response.data.error) {
                setError(response.data.error);
                setUpdateSuccess(false);
            } else if (response.data.Status === "Success") {
                setError('');
                setUpdateSuccess(true);
            } else {
                console.error("Błąd podczas dodawania oferty!");
            }
        } catch (error) {
            // console.error(error);
            console.error('Błąd podczas dodawania oferty: ' + error.message);
        }
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
                                            <Nav.Link href="/employee-users-accounts">KONTA UŻYTKOWNIKÓW</Nav.Link>
                                        </Nav>
                                        <Nav.Link href="/userprofile"><Navbar.Brand><AiOutlineUser />  {mail}</Navbar.Brand></Nav.Link>
                                        <Button variant="danger" onClick={handleLogout}>WYLOGUJ</Button>
                                    </Navbar.Collapse>
                                </Container>
                            </Navbar>
                            <Container>
                                <h1 className="text-center">DODAJ RODZAJ SKOKU</h1>
                                <Form className="text-center">
                                    <div className='max-width-form'>
                                        <Form.Group as={Row} controlId="formEditOfferName" className="mb-3">
                                            <Form.Label column sm={2}>
                                                Nazwa
                                            </Form.Label>
                                            <Col sm={10}>
                                                <FormControl
                                                    type="text"
                                                    name="jumpName"
                                                    value={newOfferData.jumpName}
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formEditOfferPrice" className="mb-3">
                                            <Form.Label column sm={2}>
                                                Cena
                                            </Form.Label>
                                            <Col sm={10}>
                                                <FormControl
                                                    type="text"
                                                    name="jumpPrice"
                                                    value={newOfferData.jumpPrice}
                                                    onChange={handleChange}

                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formEditOfferSeats" className="mb-3">
                                            <Form.Label column sm={2}>
                                                Liczba miejsc w samolocie
                                            </Form.Label>
                                            <Col sm={10}>
                                                <FormControl
                                                    type="text"
                                                    name="jumpSeats"
                                                    value={newOfferData.jumpSeats}
                                                    onChange={handleChange}

                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formEditOfferLicense" className="mb-3">
                                            <Form.Label column sm={2}>
                                                Wymagana licencja
                                            </Form.Label>
                                            <Col sm={10}>
                                                <FormControl
                                                    type="text"
                                                    name="jumpLicense"
                                                    value={newOfferData.jumpLicense}
                                                    onChange={handleChange}

                                                />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formEditOfferWeight" className="mb-3">
                                            <Form.Label column sm={2}>
                                                Maksymalna masa
                                            </Form.Label>
                                            <Col sm={10}>
                                                <FormControl
                                                    type="text"
                                                    name="jumpWeight"
                                                    value={newOfferData.jumpWieght}
                                                    onChange={handleChange}

                                                />
                                            </Col>
                                        </Form.Group>
                                    </div>
                                    {error && <div className="alert alert-danger">{error}</div>}
                                    <div className='mt-4'>
                                        <Button variant="success" className="mt-3" id="przycisk2" onClick={handleSubmit}>
                                            DODAJ
                                        </Button>
                                    </div>
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

export default EmployeeAddNewOffer
