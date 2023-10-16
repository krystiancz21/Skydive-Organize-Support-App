require('dotenv').config()
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");
const multer = require("multer");
const { editUserSchema } = require("../utils/validation");

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

// Usuwanie konta
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

module.exports = router;
