require('dotenv').config()
const router = require("express").Router();
const db = require("../db");
const { editOfferSchema } = require("../utils/validation");

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
      console.log(data);
      res.send(data);
    }
  })
});

router.post("/updateOfferData", async (req, res) => {

  try {
    const { error } = editOfferSchema.validate(req.body);

    if (error) {
      return res.json({ error: error.details[0].message });
    }

    const values = [
      req.body.jumpName,
      req.body.jumpPrice,
    ];

    const sql = "UPDATE rodzaj_skoku SET `nazwa` = ?, `cena` = ? WHERE `skok_id` = ?";
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

module.exports = router;