import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col, Card, CardGroup, Image } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi'
import { BsFillPersonFill, BsArrowRightShort, BsFillBellFill, BsPencilSquare, BsFillTrashFill } from 'react-icons/bs';
import obraz from '../Images/obraz.jpg';
import styles from "./style.css"
import axios from "axios";
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const OfferEdit = () => {
    const [offerData, setOfferData] = useState({
        jumpName: "",
        jumpPrice: "",
    })
    const [error, setError] = useState("");
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [mail, setMail] = useState('');
    const [userRole, setUserRole] = useState('');
    const [file, setFile] = useState(null);

    const { offerId } = useParams();
    const navigate = useNavigate();

    //sprawdzamy autoryzacje
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3001/api/auth/offer-edit')
            .then(res => {
                if (res.data.Status === "Success") {
                    setIsAuth(true);
                    setMail(res.data.mail); //email
                    setUserRole(res.data.userRole); // rola użytkownika
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
                // Przekierowanie na stronę główną po wylogowaniu
                window.location.href = "/main";
            }).catch(err => console.log(err));
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/api/offer/showOffer?offerId=${offerId}`)
            .then(res => {
                if (res.data && res.data.length > 0) {
                    // console.log(res.data[0])
                    setOfferData({
                        jumpName: res.data[0].nazwa,
                        jumpPrice: res.data[0].cena
                    });
                }
            })
            .catch(err => console.log(err));
    }, [offerId]);

    const handleChange = ({ currentTarget: input }) => {
        setOfferData({ ...offerData, [input.name]: input.value })
        // console.log(`Nowa wartość pola ${input.name}: ${input.value}`);
    }

    // Usuwanie oferty
    const handleDeleteOffer = () => {
        if (window.confirm("Czy na pewno chcesz usunąć ofertę?")) {
            axios.delete(`http://localhost:3001/api/offer/deleteOffer/?offerId=${offerId}`)
                .then(res => {
                    // Przekierowanie na stronę główną po usunięciu konta
                    window.location.href = "http://localhost:3000/offer";
                })
                .catch(err => console.log(err));
        }
    }

    // Edycja oferty
    const handleOfferEdit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);

        try {
            const uploadResponse = await axios.post('http://localhost:3001/api/offer/uploadOfferPhoto', formData);
            const filePath = uploadResponse.data.filePath; // Oczekuj odpowiedzi z ścieżką do zapisanego pliku

            const response = await axios.post('http://localhost:3001/api/offer/updateOfferData', {
                offerData: offerData,
                filePath: filePath,
                offerId: offerId
            });
            if (response.data.error) {
                setError(response.data.error);
                setUpdateSuccess(false);
            } else if (response.data.Status === "Success") {
                setError('');
                setUpdateSuccess(true);
            } else {
                console.error("Błąd podczas aktualizacji oferty!");
            }
        } catch (error) {
            // console.error(error);
            console.error('Błąd podczas aktualizacji oferty: ' + error.message);
        }
    };

    // Nawigacja dla poszczególnych ról
    const getNavbar = (role, mail, handleDelete) => {
        switch (role) {
            case 'pracownik':
                return (
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Container>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="/main"><BiHomeAlt /></Nav.Link>
                                    <Nav.Link href="/messages">WIADOMOŚCI</Nav.Link>
                                    <Nav.Link href="/employeeusersaccounts">KONTA UŻYTKOWNIKÓW</Nav.Link>
                                    <Nav.Link href="/employeemanagejumps">ZARZĄDZANIE SKOKAMI</Nav.Link>
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
                                <Nav className="me-auto">
                                    <Nav.Link href="/main"><BiHomeAlt /></Nav.Link>
                                    <Nav.Link href="/messages">WIADOMOŚCI</Nav.Link>
                                    <Nav.Link href="/employee-users-accounts">KONTA UŻYTKOWNIKÓW</Nav.Link>
                                    <Nav.Link href="/employee-manage-jumps">ZARZĄDZANIE SKOKAMI</Nav.Link>
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

    return (
        <>
            {isAuth ? (
                // User zalogowany
                <>
                    {getNavbar(userRole, mail, handleLogout)}
                    <Container className={styles.content}>
                        <h1 className="text-center">EDYCJA OFERTY SKOKU</h1>
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
                                            value={offerData.jumpName}
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
                                            value={offerData.jumpPrice}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formEditOfferImg" className="mb-3">
                                    <Form.Label column sm={2}>
                                        Zdjęcie poglądowe
                                    </Form.Label>
                                    <Col sm={10}>
                                        <div className="d-flex flex-column">
                                            <Form.Control
                                                type="file"
                                                accept=".jpg, .jpeg, .png"
                                                onChange={(e) => setFile(e.target.files[0])}
                                            />
                                        </div>
                                    </Col>
                                </Form.Group>
                            </div>
                            {updateSuccess && <div className="alert alert-success">Dane oferty zostały zaktualizowane</div>}
                            {error && <div className="alert alert-danger">{error}</div>}
                            <div className='mt-4'>
                                <Button variant="success" className="mt-3" id="przycisk2" onClick={handleOfferEdit}>
                                    <BsPencilSquare /> EDYTUJ SKOK
                                </Button>
                                <Button variant="danger" className="mt-3" id="przycisk2" onClick={handleDeleteOffer}><BsFillTrashFill /> USUŃ OFERTĘ</Button>
                            </div>
                        </Form>
                    </Container></>
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
                    <Container className={styles.content}>
                        <h1 className="text-center">OFERTA</h1>
                        <h2>{message}</h2>
                        <CardGroup>
                            <Card>
                                <Card.Img variant="top" src={obraz} alt="img-oferta" />
                                <Card.Body>
                                    <Card.Title>Skok samodzielny z licencją<p>Cena: 600zł</p></Card.Title>
                                    <Button variant="primary" className='przyciskButton' >
                                        ZAREZERWUJ SKOK <BsArrowRightShort />
                                    </Button>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Img variant="top" src={obraz} alt="img-terminy" />
                                <Card.Body>
                                    <Card.Title>Skok w tandemie<p>Cena: 900zł</p></Card.Title>
                                    <div className="mb-2">
                                        <Button variant="primary" className='przyciskButton' >
                                            ZAREZERWUJ SKOK <BsArrowRightShort />
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Img variant="top" src={obraz} alt="img-wiadomosci" />
                                <Card.Body>
                                    <Card.Title>Skok w tandemie z kamerzystą<p>Cena: 1100zł</p></Card.Title>
                                    <Button variant="primary" className='przyciskButton' >
                                        ZAREZERWUJ SKOK <BsArrowRightShort />
                                    </Button>
                                </Card.Body>
                            </Card>
                        </CardGroup>
                    </Container>
                </>
            )}
        </>
    )
}

export default OfferEdit
