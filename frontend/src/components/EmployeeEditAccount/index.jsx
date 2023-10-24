import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col, Card, CardGroup, Image } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi'
import { BsArrowLeft, BsPersonCircle, BsArrowRight } from 'react-icons/bs';
import styles from "./style.css"
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const EmployeeEditAccount = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
    });
    const [isAuth, setIsAuth] = useState(false);
    const [editUserSuccess, setEditUserSuccess] = useState(false);

    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [updateFile, setUpdateFile] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState("");

    const [mail, setMail] = useState('');
    const [userRole, setUserRole] = useState('');
    const [file, setFile] = useState(null);

    const { clientId } = useParams();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
        //console.log(data); // Wyświetlanie w przeglądarce zmian w polach formularza, przechwycinych przez handleChange
    }

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

    useEffect(() => {
        if (isAuth) {
            axios.post(`http://localhost:3001/api/user/getUserDataById`, { clientId: clientId })
                .then(res => {
                    if (Array.isArray(res.data) && res.data.length > 0) {
                        setData({
                            firstName: res.data[0].imie,
                            lastName: res.data[0].nazwisko,
                            email: res.data[0].mail,
                            phoneNumber: res.data[0].telefon,
                        });
                    } else {
                        // Sytuacja, gdy nie znaleziono rekordu
                        console.log('Nie znaleziono rekordu.');
                        setData(null);
                        // Możesz również ustawić stan lub wyświetlić odpowiednią wiadomość na stronie
                        // np.  lub setMessage("Nie znaleziono rekordu.")
                    }
                })
                .catch(err => console.error(err));
        }
    }, [clientId, isAuth]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Zapobiega przeładowaniu strony

        try {
            const response = await axios.post('http://localhost:3001/api/user/updateClientDataById', {
                formData: data,
                clientId: clientId
            });

            if (response.data.Status === 'Success') {
                setEditUserSuccess(true);
                setError('');
            } else {
                setError(response.data.error);
                setEditUserSuccess(false);
            }
        } catch (error) {
            console.error(error);
            setError('Wystąpił błąd podczas aktualizacji danych użytkownika');
            setEditUserSuccess(false);
        }
    };

    // Dodanie licencji
    const uploadFile = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const uploadResponse = await axios.post('http://localhost:3001/api/user/updateUserFile', formData);
            const filePath = uploadResponse.data.filePath; // Oczekuj odpowiedzi z ścieżką do zapisanego pliku

            const licenseData = {
                sciezka_do_skanu_licencji: filePath, // Ścieżka do zapisanego pliku
                email: data.email, // adres email edytowanego usera
            };

            const dbResponse = await axios.post('http://localhost:3001/api/user/updateLicenseData', licenseData);
            if (dbResponse.data.error) {
                setError(dbResponse.data.error);
                setUpdateFile(false);
                setUpdateSuccess(false);
            } else if (dbResponse.data.Status === "Success") {
                setError('');
                setUpdateSuccess(false);
                setUpdateFile(true);
            } else {
                console.error("Błąd podczas dodawania licencji!");
            }
            console.log("Dodano wpis do bazy danych:", dbResponse.data);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError('Wystąpił błąd podczas przesyłania pliku');
            }
            console.error("Błąd podczas przesyłania pliku: " + error.message);
        }
    };

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
                                <h1 className="text-center">EDYCJA KONTA UŻYTKOWNIKA</h1>
                                <Form onSubmit={handleSubmit} className="text-center">
                                    <div className='max-width-form'>
                                        <Form.Group as={Row} controlId="formOwnerEditAccountName" className="mb-3">
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
                                        <Form.Group as={Row} controlId="formOwnerEditAccountLastName" className="mb-3">
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
                                        <Form.Group as={Row} controlId="formOwnerEditAccountEmail" className="mb-3">
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
                                        <Form.Group as={Row} controlId="formOwnerEditAccountPhone" className="mb-3">
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
                                        <Form.Group as={Row} controlId="formEditUserFile" className="mb-3">
                                            <Form.Label column sm={2}>
                                                Licencja
                                            </Form.Label>
                                            <Col sm={10}>
                                                <div className="d-flex flex-column">
                                                    <Form.Control
                                                        type="file"
                                                        accept=".jpg, .jpeg, .png, .pdf"
                                                        onChange={(e) => setFile(e.target.files[0])}
                                                    />
                                                    <Button variant="secondary" onClick={uploadFile} className="mt-2" style={{ width: '100px' }}>
                                                        Dodaj plik
                                                    </Button>
                                                </div>
                                            </Col>
                                        </Form.Group>
                                    </div>
                                    {editUserSuccess && <div className="alert alert-success">Pomyślnie udało zmienić dane użytkownika!</div>}
                                    {updateFile && <div className="alert alert-success">Pomyślnie dodano załącznik!</div>}
                                    {error && <div className="alert alert-danger">{error}</div>}
                                    <Button variant="success" type="submit">EDYTUJ KONTO</Button>
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

export default EmployeeEditAccount