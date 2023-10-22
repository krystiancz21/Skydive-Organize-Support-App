require('dotenv').config()
const router = require("express").Router();
const db = require("../db");

router.get('/showPaymentMethod', (req, res) => {
    const sql = 'SELECT * FROM sposob_platnosci';

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Błąd zapytania do bazy danych: ' + err.message);
            res.status(500).json({ error: 'Błąd zapytania do bazy danych' });
        } else {
            // Zwróć wyniki jako odpowiedź w formacie JSON
            res.status(200).json(results);
        }
    });
});

// Dodawanie nowej płatności
router.post("/addPayment", (req, res) => {
    // const { data_platnosci, wplacona_kwota, status_platnosci_id, sposob_platnosci_id } = req.body;
    const values = [
        req.body.data_platnosci,
        req.body.wplacona_kwota,
        req.body.status_platnosci_id,
        req.body.sposob_platnosci_id,
    ];

    const sql = "INSERT INTO platnosc (data_platnosci, wplacona_kwota, status_platnosci_id, sposob_platnosci_id) VALUES (?, ?, ?, ?)";

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Błąd podczas dodawania płatności: ' + err.message);
            res.status(500).send({ error: 'Wystąpił błąd podczas dodawania płatności' });
        } else {
            res.send({ Status: 'Success', platnosc_id: result.insertId });
        }
    });
});

module.exports = router;