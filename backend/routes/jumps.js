require('dotenv').config()
const router = require("express").Router();
const db = require("../db");

router.post('/showJumpTypes', (req, res) => {
  const jumpName = req.body.jumpName;
  const sql = 'SELECT * FROM rodzaj_skoku WHERE nazwa = ?';

  db.query(sql, [jumpName], (err, results) => {
    if (err) {
      console.error('Błąd zapytania do bazy danych: ' + err.message);
      res.status(500).json({ error: 'Błąd zapytania do bazy danych' });
    } else {
      res.status(200).json(results);
    }
  });
});

router.post('/availableDates', (req, res) => {
  const selectedDate = req.body.date;
  const selectedType = req.body.selectedType;

  const sql = `SELECT * FROM planowane_terminy 
                 WHERE CAST(data_czas as DATE) = CAST(? as DATE)
                 AND data_czas >= CURDATE()
                 AND nazwa = ?
                 AND liczba_miejsc_w_samolocie > 0`;

  db.query(sql, [selectedDate, selectedType], (err, results) => {
    if (err) {
      console.error('Błąd zapytania do bazy danych: ' + err.message);
      res.status(500).json({ error: 'Błąd zapytania do bazy danych' });
    } else {
      res.status(200).json(results);
    }
  });
});

router.post('/freeDates', (req, res) => {
  const selectedType = req.body.selectedType;
  const sql = `SELECT data_czas FROM planowane_terminy 
               WHERE liczba_miejsc_w_samolocie != 0
               AND nazwa = ?
               AND data_czas > NOW()`;

  db.query(sql, [selectedType], (err, results) => {
    if (err) {
      console.error('Błąd zapytania do bazy danych: ' + err.message);
      res.status(500).json({ error: 'Błąd zapytania do bazy danych' });
    } else {
      // Zwróć wyniki jako odpowiedź w formacie JSON
      res.status(200).json(results);
    }
  });
});

router.post('/showJump', (req, res) => {
  const jumpId = req.body.jumpId;
  const sql = `SELECT * FROM planowane_terminy WHERE terminy_id = ?`;

  db.query(sql, [jumpId], (err, results) => {
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
