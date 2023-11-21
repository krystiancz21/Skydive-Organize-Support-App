require('dotenv').config()
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");
const multer = require("multer");

router.post('/showMyMessages', async (req, res) => {
    const sql = `SELECT w.wiadomosci_id, w.tytul, w.tresc, 
                    w.data_czas, w.odczytane, w.nadawca_id, 
                    w.odbiorca_id, u.imie, u.nazwisko 
                    FROM wiadomosci w
                    JOIN user u ON u.user_id = w.odbiorca_id
                    WHERE w.nadawca_id = ?
                    ORDER BY w.data_czas DESC`;

    db.query(sql, req.body.userID, (err, results) => {
        if (err) {
            console.error('Błąd zapytania do bazy danych (/getReceivers): ' + err.message);
            res.status(500).json({ error: 'Błąd zapytania do bazy danych (/getReceivers).' });
        } else {
            res.status(200).json(results);
        }
    });
});

router.post('/showReadMessages', async (req, res) => {
    const sql = `SELECT w.wiadomosci_id, w.tytul, w.tresc, 
                w.data_czas, w.odczytane, w.nadawca_id, 
                w.odbiorca_id, u.imie, u.nazwisko 
                FROM wiadomosci w 
                JOIN user u ON u.user_id = w.nadawca_id 
                WHERE w.odbiorca_id = ? AND w.odczytane IS NOT NULL 
                ORDER BY w.data_czas DESC`;

    db.query(sql, req.body.userID, (err, results) => {
        if (err) {
            console.error('Błąd zapytania do bazy danych (/getReceivers): ' + err.message);
            res.status(500).json({ error: 'Błąd zapytania do bazy danych (/getReceivers).' });
        } else {
            res.status(200).json(results);
        }
    });
});

router.post('/showUnreadMessages', async (req, res) => {
    const sql = `SELECT w.wiadomosci_id, w.tytul, w.tresc, 
                w.data_czas, w.odczytane, w.nadawca_id, 
                w.odbiorca_id, u.imie, u.nazwisko 
                FROM wiadomosci w 
                JOIN user u ON u.user_id = w.nadawca_id 
                WHERE w.odbiorca_id = ? AND w.odczytane IS NULL 
                ORDER BY w.data_czas DESC`;

    db.query(sql, req.body.userID, (err, results) => {
        if (err) {
            console.error('Błąd zapytania do bazy danych (/getReceivers): ' + err.message);
            res.status(500).json({ error: 'Błąd zapytania do bazy danych (/getReceivers).' });
        } else {
            res.status(200).json(results);
        }
    });
});



// SELECT * FROM rola_user ru
// JOIN rola r ON r.rola_id = ru.rola_rola_id
// JOIN user u ON u.user_id = ru.user_id
// przechwycenie roli
// i chyba przechwycenie userID lub mail

// klient -> pracownik | klient -> admin
// pracownik -> admin | pracownik -> klient
// admin -> pracownik | admin -> klient
// OGÓLNIE TO POYEBANY TEMAT - żeby to tak robić 
// pierdole narazie nie robie - za dużo jebańska 

// Pobranie informacji o personach na podstronie /new-message
router.get("/getReceivers", async (req, res) => {
    const sql = `SELECT user_id, imie, nazwisko, mail FROM user`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Błąd zapytania do bazy danych (/getReceivers): ' + err.message);
            res.status(500).json({ error: 'Błąd zapytania do bazy danych (/getReceivers).' });
        } else {
            res.status(200).json(results);
        }
    });
});

router.post("/sendMessage", async (req, res) => {
    if (!req.body.msgTitle || !req.body.msgContent || !req.body.reciverID || !req.body.senderMail) {
        return res.status(400).json({ error: 'Wszystkie pola są wymagane.' });
    }
    const sql = `SELECT user_id FROM user WHERE mail = ?`;

    db.query(sql, [req.body.senderMail], (err, results) => {
        if (err) {
            console.error('Błąd zapytania do bazy danych 2 (/sendMessage): ' + err.message);
            res.status(500).json({ error: 'Błąd zapytania do bazy danych 2 (/sendMessage).' });
        } else {
            if (results.length > 0) {
                const senderID = results[0].user_id;
                const values = [
                    req.body.msgTitle,
                    req.body.msgContent,
                    senderID,
                    req.body.reciverID,
                ];

                const sql2 = `INSERT INTO wiadomosci(tytul, tresc, data_czas, nadawca_id, odbiorca_id) 
                        VALUES (?, ?, NOW(), ?, ?)`;

                db.query(sql2, values, (err2, results2) => {
                    if (err) {
                        console.error('Błąd zapytania do bazy danych2 (/getReceivers): ' + err2.message);
                        res.status(500).json({ error: 'Błąd zapytania do bazy danych2 (/getReceivers).' });
                    } else {
                        res.status(200).json(results2);
                    }
                });
            } else {
                res.status(404).json({ error: 'Użytkownik o podanym adresie e-mail nie istnieje.' });
            }
        }
    });
});

router.post("/markAsRead", async (req, res) => {
    const sql = `UPDATE wiadomosci SET odczytane = 1 WHERE wiadomosci_id = ?`;

    db.query(sql, [req.body.messageId], (err, results) => {
        if (err) {
            console.error('Błąd zapytania do bazy danych (/markAsRead): ' + err.message);
            res.status(500).json({ error: 'Błąd zapytania do bazy danych (/markAsRead).' });
        } else {
            res.status(200).json(results);
        }
    });
});

// wysłanie wiadomości o odwołaniu skoku
router.post("/sendMessageCancelJump", async (req, res) => {
    const jumpId = req.body.jumpId;
  
    const getJumpDetailsSql = `SELECT nazwa, data_czas FROM planowane_terminy WHERE terminy_id = ?`;
  
    db.query(getJumpDetailsSql, [jumpId], (err, jumpDetails) => {
      if (err) {
        console.error('Błąd zapytania do bazy danych (/sendMessageCancelJump): ' + err.message);
        res.status(500).json({ error: 'Błąd zapytania do bazy danych (/sendMessageCancelJump).' });
      } else {
        const jumpName = jumpDetails[0].nazwa;
        const jumpDate = new Date(jumpDetails[0].data_czas).toLocaleString();
  
        const getUsersSql = `SELECT user_id FROM rezerwacje_terminow WHERE planowane_terminy_id = ?`;
  
        db.query(getUsersSql, [jumpId], (err, users) => {
          if (err) {
            console.error('Błąd zapytania do bazy danych (/sendMessageCancelJump): ' + err.message);
            res.status(500).json({ error: 'Błąd zapytania do bazy danych (/sendMessageCancelJump).' });
          } else {
            const userIds = users.map(user => user.user_id);
  
            const messageSql = `INSERT INTO wiadomosci (tytul, tresc, data_czas, nadawca_id, odbiorca_id) VALUES ?`;
            const messageValues = userIds.map(userId => [
              'Odwołanie skoku',
              `Dzień dobry. ${jumpName} zarezerwowany na dzień ${jumpDate} został odwołany. Przepraszamy za utrudnienia i zapraszamy do ponownego skorzystania z naszej oferty. Pozdrawiamy.`,
              new Date(),
              '3',
              userId
            ]);
  
            db.query(messageSql, [messageValues], (err, results) => {
              if (err) {
                console.error('Błąd zapytania do bazy danych (/sendMessageCancelJump): ' + err.message);
                res.status(500).json({ error: 'Błąd zapytania do bazy danych (/sendMessageCancelJump).' });
              } else {
                res.status(200).json(results);
              }
            });
          }
        });
      }
    });
  });

module.exports = router;
