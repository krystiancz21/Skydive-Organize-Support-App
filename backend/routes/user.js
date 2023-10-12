require('dotenv').config()
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");
const { userSchema, passwordComplexityInstance } = require("../utils/validation");

router.get("/getUserData", async (req, res) => {
    const email = req.query.email;
    const sql = "SELECT * FROM user WHERE mail = ?";
    
    db.query(sql, [email], (err, data) => {
        if (err) {
            res.status(500).send({ error: 'Wystąpił błąd podczas pobierania danych użytkownika' });
        } else {
            res.send(data);
        }
    })
});

module.exports = router;