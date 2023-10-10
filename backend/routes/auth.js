require('dotenv').config()
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");
const { userSchema, passwordComplexityInstance } = require("../utils/validation");

const saltRounds = 10;

router.post("/register", async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body);

    if (error) {
      return res.json({ error: error.details[0].message });
    }

    const { passwordValidationError } = passwordComplexityInstance.validate(
      req.body.password
    );

    if (passwordValidationError) {
      return res.json({ error: passwordValidationError.details[0].message });
    }

    const checkEmailQuery = "SELECT COUNT(*) as count FROM user WHERE mail = ?";
    db.query(checkEmailQuery, [req.body.email], (err, result) => {
      if (err) {
        console.error("Błąd podczas sprawdzania adresu e-mail w bazie danych:", err);
        return res.status(500).json({ error: "Błąd podczas rejestracji" });
      }

      const emailExists = result[0].count > 0;
      if (emailExists) {
        return res.json({ error: "The email address already exists" });
      } else {
        const sql = "INSERT INTO user (`imie`, `nazwisko`, `mail`, `haslo`, `telefon`) VALUES (?, ?, ?, ?, ?)";

        bcrypt.hash(req.body.password.toString(), saltRounds, (err, hash) => {
          if (err) {
            console.error("Błąd podczas haszowania hasła:", err);
            return res.json({ Error: "Error for hashing password" });
          }
          const values = [
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            hash,
            req.body.phoneNumber,
          ];

          db.query(sql, values, (err, result) => {
            if (err) {
              console.error("Błąd podczas wstawiania danych do bazy danych:", err);
              return res.json({ Error: "Inserting data error in server" });
            }
            return res.json({ Status: "Success" });
          });
        });
      }
    });
  } catch (error) {
    console.error("Błąd podczas rejestracji: " + error.message);
    return res.status(500).json({ error: "Błąd podczas rejestracji" });
  }
});

router.post("/login", (req, res) => {
  const sql = "SELECT * FROM user WHERE mail = ?";
  db.query(sql, [req.body.email], (err, data) => {
    if (err) return res.json({ Error: "Login error in server" });
    if (data.length > 0) {
      bcrypt.compare(req.body.password.toString(), data[0].haslo, (err, response) => {
        if (err) {
          console.error("Błąd podczas logowania:", err);
          return res.json({ Error: "Login error in server" });
        }

        if (response) {
          const name = data[0].mail;
          const token = jwt.sign({ name }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" }); // jwt-secret-key -> .env -> 32/256 znakow
          res.cookie("token", token);
          console.log("Logowanie udało się.");
          return res.json({ Status: "Success" });
        } else {
          return res.json({ Status: "Password not matched" });
        }
      }
      );
    } else {
      return res.json({ Error: "No email existed" });
    }
  });
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "You are not authenticated" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.json({ Error: "Token is not ok" });
      } else {
        req.name = decoded.name;
        next();
      }
    });
  }
};

router.get("/main", verifyUser, (req, res) => {
  return res.json({ Status: "Success", name: req.name });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

module.exports = router;
