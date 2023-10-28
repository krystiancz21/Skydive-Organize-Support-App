require('dotenv').config()
const router = require("express").Router();
const db = require("../db");
const { editUserWeight } = require("../utils/validation");

// Pobranie rodzajów skoków
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

// Pobranie nazwy skoku
router.post('/showJumpName', (req, res) => {
  const selectedType = req.body.type;

  const sqlJumpType = `SELECT nazwa FROM rodzaj_skoku WHERE skok_id = ?`;
  db.query(sqlJumpType, [selectedType], (err, results) => {
    if (err) {
      console.error('Błąd zapytania do bazy danych (/freeDatesOnJump): ' + err.message);
      res.status(500).json({ error: 'Błąd zapytania do bazy danych: /freeDatesOnJump' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Pobranie wszystkich wolnych terminów na dany skok
// ogólnie wyswietlanie dat w kalendarzu
router.post('/freeDatesOnJump', (req, res) => {
  const selectedType = req.body.type;

  const sqlJumpType = `SELECT * FROM rodzaj_skoku WHERE skok_id = ?`;
  db.query(sqlJumpType, [selectedType], (err, results) => {
    if (err) {
      console.error('Błąd zapytania do bazy danych (/freeDatesOnJump): ' + err.message);
      res.status(500).json({ error: 'Błąd zapytania do bazy danych: /freeDatesOnJump' });
    } else {
      if (results.length > 0) {
        const nazwa = results[0].nazwa;
        const liczbaMiejsc = results[0].liczba_miejsc_w_samolocie;

        const sql = `SELECT data_czas FROM planowane_terminy 
          WHERE data_czas > NOW()
          AND status_terminu_id = 1
          AND nazwa = ?
          AND liczba_miejsc_w_samolocie > ?`;

        // Wykonujemy drugie zapytanie, przekazując nazwę z wyników pierwszego zapytania
        db.query(sql, [nazwa, liczbaMiejsc], (err, secondResults) => {
          if (err) {
            console.error('Błąd drugiego zapytania do bazy danych: ' + err.message);
            res.status(500).json({ error: 'Błąd drugiego zapytania do bazy danych' });
          } else {
            // Tutaj możesz użyć wyników drugiego zapytania (secondResults)
            res.status(200).json(secondResults);
          }
        });
      } else {
        res.status(404).json({ error: 'Brak wyników dla podanego typu skoku.' });
      }
    }
  });
});

// Pobranie wszystkich dostępnych terminów na konkretny skok (aktualnego dnia)
// zaznaczenie konkretnej daty w kalendarzu
router.post('/availableDatesByJumpId', (req, res) => {
  const selectedType = req.body.type;
  const selectedDate = req.body.date;

  const sqlJumpType = `SELECT * FROM rodzaj_skoku WHERE skok_id = ?`;

  db.query(sqlJumpType, [selectedType], (err, results) => {
    if (err) {
      console.error('Błąd zapytania do bazy danych (/availableDatesByJumpId): ' + err.message);
      res.status(500).json({ error: 'Błąd zapytania do bazy danych: /availableDatesByJumpId' });
    } else {
      if (results.length > 0) {
        const jumpName = results[0].nazwa;
        const seatsCount = results[0].liczba_miejsc_w_samolocie;

        const sql = `SELECT * FROM planowane_terminy 
                    WHERE CAST(data_czas as DATE) = CAST(? as DATE)
                    AND data_czas >= CURDATE()
                    AND nazwa = ?
                    AND liczba_miejsc_w_samolocie > ?`;

        db.query(sql, [selectedDate, jumpName, seatsCount], (err, secondResults) => {
          if (err) {
            console.error('Błąd drugiego zapytania do bazy danych: ' + err.message);
            res.status(500).json({ error: 'Błąd drugiego zapytania do bazy danych' });
          } else {
            // Tutaj możesz użyć wyników drugiego zapytania (secondResults)
            res.status(200).json(secondResults);
          }
        });

      } else {
        res.status(404).json({ error: 'Brak wyników dla podanego typu skoku.' });
      }
    }
  });
});

// Pobranie info o szczegółach konkretnego skoku - np. data, godzina, rodzaj soku
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

// Pobranie wszystkich wolnych terminów na dany skok
// ogólnie wyswietlanie dat w kalendarzu
router.get('/freeDatesOnAllJumpType', (req, res) => {
  const sql = `SELECT * FROM planowane_terminy 
          WHERE data_czas > NOW()
          AND status_terminu_id = 1
          AND liczba_miejsc_w_samolocie > 0`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Błąd zapytania do bazy danych (/avaiableDatesOnAllJumpType): ' + err.message);
      res.status(500).json({ error: 'Błąd zapytania do bazy danych: /avaiableDatesOnAllJumpType' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Pobranie wszystkich dostępnych terminów na konkretny skok (wszystkie rozdaje skoku)
// zaznaczenie konkretnej daty w kalendarzu
router.post('/availableDateAllJumpType', (req, res) => {
  const selectedDate = req.body.date;

  const sql = `SELECT * FROM planowane_terminy 
              WHERE CAST(data_czas as DATE) = CAST(? as DATE)
              AND data_czas >= CURDATE()
              AND liczba_miejsc_w_samolocie > 0`;

  db.query(sql, [selectedDate], (err, results) => {
    if (err) {
      console.error('Błąd drugiego zapytania do bazy danych (/availableDateAllJumpType): ' + err.message);
      res.status(500).json({ error: 'Błąd drugiego zapytania do bazy danych (/availableDateAllJumpType).' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Rezerwacja skoku
router.post("/reserveJump", async (req, res) => {
  try {
    // Aktualizacja wagi użytkownika
    const { error } = editUserWeight.validate({ userWeight: req.body.userWeight });

    if (error) {
      return res.json({ error: error.details[0].message });
    }

    const valuesWeight = [
      req.body.userWeight,
      req.body.mail
    ];

    const sqlWeight = "UPDATE user SET `masa` = ? WHERE `mail` = ?";

    db.query(sqlWeight, valuesWeight, (err, result) => {
      if (err) {
        console.error('Błąd podczas aktualizacji wagi użytkownika: ' + err.message);
        res.status(500).send({ error: 'Wystąpił błąd podczas aktualizacji wagi użytkownika' });
      } else {
        // Rezerwacja skoku po pomyślnej aktualizacji wagi
        const valuesReservation = [
          req.body.userId,
          req.body.planowaneTerminyId,
          req.body.statusSkokuId, // to domyślnie 1- niezrealizowany
          req.body.rodzajSkokuId,
          req.body.platnoscId,
          req.body.cena
        ];

        const sqlReservation = "INSERT INTO rezerwacje_terminow (user_id, planowane_terminy_id, status_skoku_id, rodzaj_skoku_id, platnosc_id, cena) VALUES (?, ?, ?, ?, ?, ?)";

        db.query(sqlReservation, valuesReservation, (err, result) => {
          if (err) {
            console.error('Błąd podczas rezerwacji skoku: ' + err.message);
            res.status(500).send({ error: 'Wystąpił błąd podczas rezerwacji skoku' });
          } else {
            res.send({ Status: 'Success' });
          }
        });
      }
    });
  } catch (error) {
    console.error("Błąd podczas rezerwacji skoku: " + error.message);
    return res.status(500).json({ error: "Błąd podczas rezerwacji skoku" });
  }
});

module.exports = router;
