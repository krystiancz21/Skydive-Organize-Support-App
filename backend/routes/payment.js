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

module.exports = router;