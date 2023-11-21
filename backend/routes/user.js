require('dotenv').config()
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");
const multer = require("multer");
const { editClientSchema, editUserSchema } = require("../utils/validation");


router.get("/getUserData", async (req, res) => {
    const email = req.query.email;
    const sql = "SELECT * FROM user WHERE mail = ?";

    db.query(sql, [email], (err, data) => {
        if (err) {
            res.status(500).send({ error: 'Wystąpił błąd podczas pobierania danych użytkownika' });
        } else {
            res.send(data);
        }
    })
});

router.post("/getUserDataById", async (req, res) => {
    const clientId = req.body.clientId;
    const sql = "SELECT * FROM user WHERE user_id = ?";

    db.query(sql, [clientId], (err, data) => {
        if (err) {
            res.status(500).send({ error: 'Wystąpił błąd podczas pobierania danych użytkownika' });
        } else {
            res.status(200).send(data);
        }
    })
});

router.post("/getUserIdByMail", async (req, res) => {
    const userMail = req.body.userMail;
    const sql = "SELECT user_id FROM user WHERE mail = ?";

    db.query(sql, [userMail], (err, data) => {
        if (err) {
            res.status(500).send({ error: 'Wystąpił błąd podczas pobierania ID użytkownika' });
        } else {
            res.status(200).send(data);
        }
    })
});

router.post("/updateClientDataById", async (req, res) => {
    // Tutaj możesz dodać logikę weryfikacji danych wejściowych
    // Sprawdzenie, czy email istnieje w bazie danych, itp
    try {
        const { error } = editClientSchema.validate(req.body.formData);

        if (error) {
            return res.json({ error: error.details[0].message });
        }

        const values = [
            req.body.formData.firstName,
            req.body.formData.lastName,
            req.body.formData.email,
            req.body.formData.phoneNumber,
            req.body.clientId,
        ];

        const sql = "UPDATE user SET `imie` = ?, `nazwisko` = ?, `mail` = ?, `telefon` = ? WHERE `user_id` = ?";
        db.query(sql, values, (err, result) => {
            if (err) {
                res.status(500).send({ error: 'Wystąpił błąd podczas aktualizacji danych użytkownika' });
            } else {
                res.send({ Status: 'Success' });
            }
        });
    } catch (error) {
        console.error("Błąd podczas aktualizacji danych: " + error.message);
        return res.status(500).json({ error: "Błąd podczas aktualizacji danych" });
    }
});

router.post("/updateUserData", async (req, res) => {
    // Tutaj możesz dodać logikę weryfikacji danych wejściowych
    // Sprawdzenie, czy email istnieje w bazie danych, itp
    try {
        const { error } = editUserSchema.validate(req.body);

        if (error) {
            return res.json({ error: error.details[0].message });
        }

        const values = [
            req.body.firstName,
            req.body.lastName,
            req.body.phoneNumber,
            req.body.weight,
            req.body.email,
        ];

        const sql = "UPDATE user SET `imie` = ?, `nazwisko` = ?, `telefon` = ?, `masa` = ? WHERE `mail` = ?";
        db.query(sql, values, (err, result) => {
            if (err) {
                res.status(500).send({ error: 'Wystąpił błąd podczas aktualizacji danych użytkownika' });
            } else {
                res.send({ Status: 'Success' });
            }
        });
    } catch (error) {
        console.error("Błąd podczas aktualizacji danych: " + error.message);
        return res.status(500).json({ error: "Błąd podczas aktualizacji danych" });
    }
});

// Usuwanie konta z wyczyszczeniem tokenu
router.delete("/deleteAccount", async (req, res) => {
    const userEmail = req.query.email;
    const sql = "UPDATE user SET `usuniete_konto` = 1 WHERE `mail` = ?";
    db.query(sql, [userEmail], (err, result) => {
        if (err) {
            console.error("Błąd podczas usuwania konta:", err);
            return res.json({ Error: "Error deleting account" });
        }
        // Wylogowanie użytkownika
        res.clearCookie("token");

        return res.json({ Status: "Account deleted successfully" });
    });
});

// Usuniecie konta bez wyczyszczenia tokenu
router.delete("/deleteAccountByAdmin", async (req, res) => {
    const userEmail = req.query.email;
    const sql = "UPDATE user SET `usuniete_konto` = 1 WHERE `mail` = ?";
    db.query(sql, [userEmail], (err, result) => {
        if (err) {
            console.error("Błąd podczas usuwania konta:", err);
            return res.json({ Error: "Error deleting account" });
        }

        return res.json({ Status: "Account deleted successfully" });
    });
});

// Zablokowanie konta 
router.post("/blockAccount", async (req, res) => {
    const userEmail = req.query.email;

    const today = new Date();
    const blockedUntil = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
    const sql = "UPDATE user SET `zablokowane_do` = ? WHERE `mail` = ?";
    const values = [blockedUntil, userEmail];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Błąd podczas zablokowania konta:", err);
            return res.json({ Error: "Error blocking account" });
        }

        return res.json({ Status: "Account blocked successfully" });
    });
});

// Odblokowanie konta
router.post("/unblockAccount", async (req, res) => {
    const userEmail = req.query.email;

    const unblockedDate = "NULL"
    const sql = "UPDATE user SET `zablokowane_do` = ? WHERE `mail` = ?";
    const values = [unblockedDate, userEmail];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Błąd podczas odblokowywania konta:", err);
            return res.json({ Error: "Error unblocking account" });
        }

        return res.json({ Status: "Account unblocked successfully" });
    });
});

// obsługa dodania licencji
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./public/Documents")
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
});

const upload = multer({ storage });

// dodanie pliku na serwer
router.post("/updateUserFile", upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "Plik nie został przesłany." });
    }

    const filePath = req.file.path; // Ścieżka do zapisanego pliku

    res.json({ filePath });
});

// dodanie wpisu do bazy ze ścieżką do pliku licencji
router.post("/updateLicenseData", async (req, res) => {
    try {
        const userEmail = req.body.email;
        const getUserIdQuery = "SELECT user_id FROM user WHERE mail = ?";


        db.query(getUserIdQuery, [userEmail], (getIdError, getUserIdResult) => {
            if (getIdError) {
                console.error("Błąd podczas pobierania ID użytkownika:", getIdError);
                return res.status(500).json({ error: "Błąd podczas aktualizacji danych licencji" });
            }

            if (getUserIdResult.length === 0) {
                return res.status(404).json({ error: "Użytkownik o podanym adresie email nie istnieje." });
            }

            const userId = getUserIdResult[0].user_id;

            if (userId === null) {
                console.error("Błąd: userId jest null.");
                return res.status(500).json({ error: "Błąd podczas aktualizacji danych licencji" });
            }

            const currentDate = new Date();
            currentDate.setFullYear(currentDate.getFullYear() + 1);

            const values = [
                "Licencja na skok samodzielny",
                currentDate,
                req.body.sciezka_do_skanu_licencji,
                userId
            ];

            const sql = "INSERT INTO licencje (nazwa, do_kiedy_licencja, sciezka_do_skanu_licencji, user_id) VALUES (?, ?, ?, ?)";
            db.query(sql, values, (err, result) => {
                if (err) {
                    console.error("Błąd podczas wstawiania danych do tabeli licencje:", err);
                    return res.status(500).json({ error: "Błąd podczas aktualizacji danych licencji" });
                }

                res.json({ Status: "Success" });
            });
        });
    } catch (error) {
        console.error("Błąd podczas obsługi żądania /updateLicenseData:", error.message);
        res.status(500).json({ error: "Błąd podczas aktualizacji danych licencji" });
    }
});

// konta klientów
router.get("/showUserAccounts", async (req, res) => {
    // Wyszukanie kont klientów, rola == 1
    const sql = 'SELECT u.user_id, imie, nazwisko, mail FROM `user` u ' +
        'JOIN rola_user ru ON ru.user_id = u.user_id ' +
        'WHERE ru.rola_rola_id = 1';

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Błąd zapytania do bazy danych: ' + err.message);
            res.status(500).json({ error: 'Błąd zapytania do bazy danych' });
        } else {
            res.status(200).json(results);
        }
    });
});

// konta pracowników
router.get("/showEmployeeAccounts", async (req, res) => {
    // Wyszukanie kont pracowników, rola == 2
    const sql = 'SELECT u.user_id, imie, nazwisko, mail FROM `user` u ' +
        'JOIN rola_user ru ON ru.user_id = u.user_id ' +
        'WHERE ru.rola_rola_id = 2';

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Błąd zapytania do bazy danych: ' + err.message);
            res.status(500).json({ error: 'Błąd zapytania do bazy danych' });
        } else {
            res.status(200).json(results);
        }
    });
});

// Pobieranie roli użytkownika
router.post("/getUserRole", async (req, res) => {
    const clientId = req.body.clientId;
    const sql = "SELECT * FROM rola_user WHERE user_id = ?";

    db.query(sql, [clientId], (err, data) => {
        if (err) {
            res.status(500).send({ error: 'Wystąpił błąd podczas pobierania roli użytkownika' });
        } else {
            res.send(data);
            //console.log(data);
        }
    })
});

// Zmiana roli
router.post("/updateClientRoleById", async (req, res) => {
    try {
        const values = [
            req.body.role,
            req.body.clientId,
        ];

        const sql = "UPDATE `rola_user` SET `rola_rola_id` = ? WHERE `user_id` = ?";
        db.query(sql, values, (err, result) => {
            if (err) {
                res.status(500).send({ error: 'Wystąpił błąd podczas aktualizacji roli użytkownika' });
            } else {
                res.send({ Status: 'Success' });
            }
        });
    } catch (error) {
        console.error("Błąd podczas aktualizacji danych: " + error.message);
        return res.status(500).json({ error: "Błąd podczas aktualizacji danych" });
    }
});

// Dostępne role w baize
router.get('/availableRoles', (req, res) => {
    const sql = 'SELECT * FROM rola';

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Błąd zapytania do bazy danych: ' + err.message);
            res.status(500).send({ error: 'Błąd podczas pobierania ról' });
        } else {
            res.status(200).json(results);
            //res.send(data);
        }
    });
});

module.exports = router;
