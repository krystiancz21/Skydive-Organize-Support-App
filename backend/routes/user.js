require('dotenv').config()
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");
const { editUserSchema, passwordComplexityInstance } = require("../utils/validation");

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
router.delete("/deleteAccount",  async (req, res) => {
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


module.exports = router;
