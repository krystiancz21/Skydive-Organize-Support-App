require('dotenv').config()
const router = require("express").Router();
const db = require("../db");

router.post('/showOffer', (req, res) => {
    const offerId = req.body.offerId;
    const sql = `SELECT skok_id, nazwa, cena FROM rodzaj_skoku WHERE skok_id = ?`;
  
    db.query(sql, [offerId], (err, results) => {
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