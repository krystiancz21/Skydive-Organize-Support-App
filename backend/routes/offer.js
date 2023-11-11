require('dotenv').config()
const router = require("express").Router();
const db = require("../db");
const multer = require("multer");
const { editOfferSchema, addNewOfferSchema } = require("../utils/validation");

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

router.get("/showOffer", async (req, res) => {
  const sql = `SELECT * FROM rodzaj_skoku WHERE skok_id = ?`;
  const offerId = req.query.offerId;

  db.query(sql, [offerId], (err, data) => {
    if (err) {
      res.status(500).send({ error: 'Wystąpił błąd podczas pobierania danych ofert' });
    } else {
      // console.log(data);
      res.send(data);
    }
  })
});

router.post("/updateOfferData", async (req, res) => {

  try {
    const { error } = editOfferSchema.validate(req.body.offerData);

    if (error) {
      return res.json({ error: error.details[0].message });
    }

    const values = [
      req.body.offerData.jumpName,
      req.body.offerData.jumpPrice,
      req.body.filePath,
      req.body.offerId,
    ];

    const sql = "UPDATE rodzaj_skoku SET `nazwa` = ?, `cena` = ?, `sciezka_do_grafiki` = ? WHERE `skok_id` = ?";
    db.query(sql, values, (err, result) => {
      if (err) {
        res.status(500).send({ error: 'Wystąpił błąd podczas aktualizacji danych oferty' });
      } else {
        res.send({ Status: 'Success' });
      }
    });
  } catch (error) {
    console.error("Błąd podczas aktualizacji danych: " + error.message);
    return res.status(500).json({ error: "Błąd podczas aktualizacji danych" });
  }
});

// obsługa dodania grafiki skoku
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/Images")
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`)
  }
});

const upload = multer({ storage });

// dodanie pliku na serwer
router.post("/uploadOfferPhoto", upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Plik nie został przesłany." });
  }

  const filePath = req.file.path; // Ścieżka do zapisanego pliku
  res.json({ filePath });
});

router.post("/addNewOffer", async (req, res) => {
  try {
    const { error } = addNewOfferSchema.validate(req.body.newOfferData);

    if (error) {
      return res.json({ error: error.details[0].message });
    }

    const values = [
      req.body.newOfferData.jumpName,
      req.body.newOfferData.jumpPrice,
      req.body.newOfferData.jumpSeats,
      req.body.newOfferData.jumpLicense,
      req.body.newOfferData.jumpWeight,
      req.body.filePath
      //req.body.offerId,
    ];

    const sql = "INSERT INTO rodzaj_skoku (`nazwa`, `cena`, `liczba_miejsc_w_samolocie`, `wymagana_licencja`, `max_masa`, `sciezka_do_grafiki`) VALUES (?, ?, ?, ?, ?, ?)"

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Błąd podczas dodawania nowej oferty (/addNewOffer): ' + err.message);
        res.status(500).send({ error: 'Wystąpił błąd podczas dodawania nowej oferty (/addNewOffer)' });
      } else {
        res.status(200).json(result);
      }
    });
  } catch (error) {
    console.error("Błąd podczas aktualizacji danych: " + error.message);
    return res.status(500).json({ error: "Błąd podczas aktualizacji danych" });
  }
});

// Usuwanie oferty
router.delete('/deleteOffer', (req, res) => {
  const offerId = req.query.offerId;

  const sql = "DELETE FROM rodzaj_skoku WHERE skok_id = ?";

  db.query(sql, [offerId], (err, result) => {
      if (err) {
          console.error('Błąd podczas usuwania oferty (/deleteOffer): ' + err.message);
          res.status(500).send({ error: 'Wystąpił błąd podczas oferty (/deleteOffer)' });
      } else {
          res.status(200).json(result);
      }
  });
});

module.exports = router;
