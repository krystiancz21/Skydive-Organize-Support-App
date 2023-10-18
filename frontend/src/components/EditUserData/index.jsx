import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col, Card, CardGroup, Image } from 'react-bootstrap';
import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from 'react-icons/bi'
import { BsArrowLeft, BsFillTrashFill, BsPencilSquare } from 'react-icons/bs';
import { useState } from "react"
import { useEffect } from 'react';
import axios from "axios"
import styles from "./style.css"

const EditUserData = () => {
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        weight: "",
    })

    const [error, setError] = useState("")
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [updateFile, setUpdateFile] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [mail, setMail] = useState('');
    const [file, setFile] = useState(null);

    //sprawdzamy autoryzacje
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3001/api/auth/edit-user-data')
            .then(res => {
                if (res.data.Status === "Success") {
                    setIsAuth(true);
                    setMail(res.data.mail); //email
                } else {
                    setIsAuth(false);
                    setMessage(res.data.Error);
                }
            })
            .then(err => console.log(err));
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/user/getUserData?email=${mail}`)
            .then(res => {
                if (res.data && res.data.length > 0) {
                    // console.log(res.data[0])
                    setUserData({
                        firstName: res.data[0].imie,
                        lastName: res.data[0].nazwisko,
                        email: res.data[0].mail,
                        phoneNumber: res.data[0].telefon,
                        weight: res.data[0].masa,
                    });
                }
            })
            .catch(err => console.log(err));
    }, [mail]);

    const handleChange = ({ currentTarget: input }) => {
        setUserData({ ...userData, [input.name]: input.value })
    }

    const handleEditUserData = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/api/user/updateUserData', userData);
            if (response.data.error) {
                setError(response.data.error);
                setUpdateSuccess(false);
                setUpdateFile(false);
            } else if (response.data.Status === "Success") {
                setError('');
                setUpdateSuccess(true);
                setUpdateFile(false);
            } else {
                console.error("Błąd podczas aktualizacji danych!");
            }
        } catch (error) {
            // console.error(error);
            console.error('Błąd podczas aktualizacji danych: ' + error.message);
        }
    };

    const handleDelete = () => {
        axios.get('http://localhost:3001/api/auth/logout')
            .then(res => {
                // Przekierowanie na stronę główną po wylogowaniu
                window.location.href = "http://localhost:3000/main";
            }).catch(err => console.log(err));
    }

    // Usuniecie konta
    const handleDeleteAccount = () => {
        if (window.confirm("Czy na pewno chcesz usunąć konto?")) {
            axios.delete(`http://localhost:3001/api/user/deleteAccount/?email=${mail}`)
                .then(res => {
                    // Przekierowanie na stronę główną po usunięciu konta
                    window.location.href = "http://localhost:3000/main";
                })
                .catch(err => console.log(err));
        }
    }

    // Dodanie licencji
    const uploadFile = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const uploadResponse = await axios.post('http://localhost:3001/api/user/updateUserFile', formData);
            const filePath = uploadResponse.data.filePath; // Oczekuj odpowiedzi z ścieżką do zapisanego pliku

            const licenseData = {
                sciezka_do_skanu_licencji: filePath, // Ścieżka do zapisanego pliku
                email: mail,
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
                console.error("Błąd podczas aktualizacji danych!");
            }
            console.log("Dodano wpis do bazy danych:", dbResponse.data);
        } catch (error) {
            console.error("Błąd podczas przesyłania pliku: " + error.message);
        }
    }

    return (
        <>
            {isAuth ? (
                // User zalogowany
                <>
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Container>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="/main"><BiHomeAlt /></Nav.Link>
                                    <Nav.Link href="/offer">OFERTA</Nav.Link>
                                    <Nav.Link href="/reservation">TERMINY SKOKÓW</Nav.Link>
                                    <Nav.Link href="/messages">WIADOMOŚCI</Nav.Link>
                                </Nav>
                                <Nav.Link href="/userprofile"><Navbar.Brand><AiOutlineUser /> {mail}</Navbar.Brand></Nav.Link>
                                <Button variant="danger" onClick={handleDelete}>WYLOGUJ</Button>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <Container className={styles.content}>
                        <h1 className="text-center">DANE OSOBOWE</h1>
                        <Form className="text-center">
                            <div className='max-width-form'>
                                <Form.Group as={Row} controlId="formEditUserDataName" className="mb-3">
                                    <Form.Label column sm={2}>
                                        Imię
                                    </Form.Label>
                                    <Col sm={10}>
                                        <FormControl
                                            type="text"
                                            name="firstName"
                                            value={userData.firstName}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formEditUserDataSurname" className="mb-3">
                                    <Form.Label column sm={2}>
                                        Nazwisko
                                    </Form.Label>
                                    <Col sm={10}>
                                        <FormControl
                                            type="text"
                                            name="lastName"
                                            value={userData.lastName}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formEditUserDataEmail" className="mb-3">
                                    <Form.Label column sm={2}>
                                        E-mail
                                    </Form.Label>
                                    <Col sm={10}>
                                        <FormControl
                                            type="email"
                                            name="email"
                                            value={userData.email}
                                            onChange={handleChange}
                                            disabled
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formEditUserDataPhone" className="mb-3">
                                    <Form.Label column sm={2}>
                                        Telefon
                                    </Form.Label>
                                    <Col sm={10}>
                                        <FormControl
                                            type="phone"
                                            name="phoneNumber"
                                            value={userData.phoneNumber}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formEditUserWeight" className="mb-3">
                                    <Form.Label column sm={2}>
                                        Masa
                                    </Form.Label>
                                    <Col sm={10}>
                                        <FormControl
                                            type="number"
                                            name="weight"
                                            value={userData.weight}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formEditUserFile" className="mb-3">
                                    <Form.Label column sm={2}>
                                        Licencja
                                    </Form.Label>
                                    <Col sm={8}>
                                        <div className="d-flex flex-column">
                                            <input
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

                            {updateSuccess && <div className="alert alert-success">Dane zostały zaktualizowane poprawnie!</div>}
                            {updateFile && <div className="alert alert-success">Pomyślnie dodano załącznik!</div>}
                            {error && <div className="alert alert-danger">{error}</div>}

                            <div className='mt-4'>
                                <Button variant="success" className="mt-3" id="przycisk2" onClick={handleEditUserData}>
                                    <BsPencilSquare /> EDYTUJ DANE
                                </Button>
                                {/* <Button variant="success" className="mt-3" id="przycisk2"><BsPencilSquare /> EDYTUJ DANE</Button> */}
                                <Button variant="danger" className="mt-3" id="przycisk2" onClick={handleDeleteAccount}><BsFillTrashFill /> USUŃ KONTO</Button>
                            </div>
                        </Form>
                    </Container></>
            ) : (
                // User niezalogowany
                <></>
            )}
        </>
    )
}

export default EditUserData