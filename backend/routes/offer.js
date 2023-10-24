require('dotenv').config()
const router = require("express").Router();
const db = require("../db");

router.get('/showAllOffers', async (req, res) => {
  const sql = `SELECT * FROM rodzaj_skoku`;

  try {
    db.query(sql, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ Status: 'Error', Error: 'Błąd podczas pobierania ofert' });
      } else {
        //console.log(results); // Wynik w konsoli co przechwytuje 
        res.json({ Status: 'Success', offers: results });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Status: 'Error', Error: 'Błąd podczas pobierania ofert' });
  }
});


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

// router.post('/editOffer', (req, res) => {
//   const offerId = req.body.offerId;
//   const newName = req.body.newName; // Nowa nazwa oferty
//   const newPrice = req.body.newPrice; // Nowa cena oferty

//   const sql = `UPDATE rodzaj_skoku SET nazwa = ?, cena = ? WHERE skok_id = ?`;

//   db.query(sql, [newName, newPrice, offerId], (err, results) => {
//     if (err) {
//       console.error('Błąd zapytania do bazy danych: ' + err.message);
//       res.status(500).json({ error: 'Błąd zapytania do bazy danych' });
//     } else {
//       // Zwróć potwierdzenie edycji jako odpowiedź w formacie JSON
//       res.status(200).json({ message: 'Oferta została zaktualizowana' });
//     }
//   });
// });

module.exports = router;