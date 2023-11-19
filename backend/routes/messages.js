require('dotenv').config()
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");
const multer = require("multer");

router.post('/showMessages', async (req, res) => {
    const sql = `SELECT user_id FROM user WHERE mail = ?`;

    db.query(sql, [req.body.senderMail], (err, results) => {
        if (err) {
            console.error('Błąd zapytania do bazy danych 1 (/showMessages): ' + err.message);
            res.status(500).json({ error: 'Błąd zapytania do bazy danych 1 (/showMessages).' });
        } else {
            if (results.length > 0) {
                const userID = results[0].user_id;
                const sql2 = `SELECT w.wiadomosci_id, w.tytul, w.tresc, 
                                    w.data_czas, w.odczytane, w.nadawca_id, 
                                    w.odbiorca_id, u.imie, u.nazwisko 
                                    FROM wiadomosci w
                                    JOIN user u ON u.user_id = w.odbiorca_id
                                    WHERE w.nadawca_id = ?`;
                                // jeszcze orderBY żeby sortować po dacie xd

                db.query(sql2, userID, (err2, results2) => {
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

router.get("/getReceivers", async (req, res) => {
    // SELECT * FROM rola_user ru
    // JOIN rola r ON r.rola_id = ru.rola_rola_id
    // JOIN user u ON u.user_id = ru.user_id


    // klient -> pracownik
    // pracownik -> admin
    // przechwycenie roli
    // i chyba przechwycenie userID lub mail

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

module.exports = router;
