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

    const [isAuth, setIsAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [mail, setMail] = useState('');

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

    const handleDelete = () => {
        axios.get('http://localhost:3001/api/auth/logout')
            .then(res => {
                window.location.reload(true);
            }).catch(err => console.log(err));
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
                                        />
                                    </Col>
                                </Form.Group>
                                {/* <Form.Group as={Row} controlId="formEditUserDataPassword" className="mb-3">
                                    <Form.Label column sm={2}>
                                        Hasło
                                    </Form.Label>
                                    <Col sm={10}>
                                        <FormControl
                                            type="password"
                                            name="password"
                                            value={userData.password}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Form.Group> */}
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
                                <Form.Group as={Row} controlId="formEditUserDataLicense" className="mb-3">
                                    <Form.Label column lg={2}>
                                        Licencja
                                    </Form.Label>
                                    <Col lg={4}>
                                        <Button variant="secondary" id="btn-licence">DODAJ LICENCJĘ</Button>
                                    </Col>
                                </Form.Group>
                            </div>
                            <div className='mt-5'>
                                <Button variant="success" className="mt-3" id="przycisk2"><BsPencilSquare /> EDYTUJ DANE</Button>
                                <Button variant="danger" className="mt-3" id="przycisk2"><BsFillTrashFill /> USUŃ KONTO</Button>
                            </div>
                        </Form>
                    </Container></>
            ) : (
                // User niezalogowany
                <>jestes wylogowany - kiedys sie to poprawi</>
            )}
        </>
    )
}

export default EditUserData