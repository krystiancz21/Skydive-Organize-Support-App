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

            // Dodanie roli "user" dla nowo zarejestrowanego użytkownika
            const currentDate = new Date().toISOString().slice(0, 19).replace("T", " "); // Pobranie aktualnej daty w formacie YYYY-MM-DD HH:mm:ss
            const futureDate = new Date();
            futureDate.setFullYear(futureDate.getFullYear() + 1); // Dodanie roku do daty

            const formattedFutureDate = futureDate.toISOString().slice(0, 19).replace("T", " "); // Sformatowanie daty do odpowiedniego formatu
            const insertUserRoleQuery = "INSERT INTO rola_user (rola_od, rola_do, user_id, rola_rola_id) VALUES (?, ?, ?, ?)";
            const roleValues = [currentDate, formattedFutureDate, result.insertId, 1]; // 1 to ID roli "user"

            db.query(insertUserRoleQuery, roleValues, (err, roleResult) => {
              if (err) {
                console.error("Błąd podczas dodawania roli dla użytkownika:", err);
                return res.json({ Error: "Adding role error in server" });
              }
            });

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
      if (data[0].usuniete_konto === 1) {
        return res.json({ Error: "This account has been deleted" });
      }
      bcrypt.compare(req.body.password.toString(), data[0].haslo, (err, response) => {
        if (err) {
          console.error("Błąd podczas logowania:", err);
          return res.json({ Error: "Login error in server" });
        }

        if (response) {
          const mail = data[0].mail;
          // // Pobranie roli użytkownika z bazy danych (możesz zmienić sposób na odpowiedni dla Twojej aplikacji)
          // const userRoleQuery = "SELECT r.nazwa AS rola FROM rola_user ru JOIN rola r ON ru.rola_rola_id = r.rola_id WHERE ru.user_id = ?";
          // db.query(userRoleQuery, [data[0].user_id], (err, roleData) => {
          //   if (err) {
          //     console.error("Błąd podczas pobierania roli użytkownika:", err);
          //     return res.json({ Error: "Getting user role error in server" });
          //   }

          //   const userRole = roleData[0].rola; // Zakładam, że użytkownik ma jedną rolę
          //   console.log(userRole);

          const token = jwt.sign({ mail }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" }); // jwt-secret-key -> .env -> 32/256 znakow
          res.cookie("token", token);
          console.log("Logowanie udało się.");
          return res.json({ Status: "Success" });
          // });
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

// const verifyUser = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.json({ Error: "You are not authenticated" });
//   } else {
//     jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
//       if (err) {
//         return res.json({ Error: "Token is not ok" });
//       } else {
//         req.mail = decoded.mail;
//         next();
//       }
//     });
//   }
// };

// const verifyUser = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.json({ Error: "You are not authenticated" });
//   } else {
//     jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
//       if (err) {
//         return res.json({ Error: "Token is not ok" });
//       } else {
//         req.mail = decoded.mail;


//         // // Pobranie roli użytkownika z bazy danych (możesz zmienić sposób na odpowiedni dla Twojej aplikacji)
//           // const userRoleQuery = "SELECT r.nazwa AS rola FROM rola_user ru JOIN rola r ON ru.rola_rola_id = r.rola_id WHERE ru.user_id = ?";
//           // db.query(userRoleQuery, [data[0].user_id], (err, roleData) => {
//           //   if (err) {
//           //     console.error("Błąd podczas pobierania roli użytkownika:", err);
//           //     return res.json({ Error: "Getting user role error in server" });
//           //   }

//           //   const userRole = roleData[0].rola; // Zakładam, że użytkownik ma jedną rolę
//           //   console.log(userRole);

//         // Odczytaj rolę użytkownika z bazy danych i przypisz ją do req.userRole
//         const userRoleQuery = "SELECT r.nazwa AS rola FROM rola_user ru JOIN rola r ON ru.rola_rola_id = r.rola_id WHERE ru.user_id = ?";
//         db.query(userRoleQuery, [data[0].user_id], (err, roleData) => {
//           if (err) {
//             console.error("Błąd podczas pobierania roli użytkownika:", err);
//             return res.json({ Error: "Getting user role error in server" });
//           }

//           req.userRole = roleData[0].rola; // Zakładam, że użytkownik ma jedną rolę

//           // Przypisanie roli powinno być zrobione przed wywołaniem next()
//           next();
//         });
//       }
//     });
//   }
// };

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "You are not authenticated" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.json({ Error: "Token is not ok" });
      } else {
        req.mail = decoded.mail;

        // Odczytaj rolę użytkownika z bazy danych i przypisz ją do req.userRole
        // const userRoleQuery = "SELECT r.nazwa AS rola FROM rola_user ru JOIN rola r ON ru.rola_rola_id = r.rola_id WHERE ru.user_id = ?";
        const userRoleQuery2 = 'SELECT r.nazwa AS rola FROM user u JOIN rola_user ru ON u.user_id = ru.user_id JOIN rola r ON ru.rola_rola_id = r.rola_id WHERE u.mail = ? AND ru.rola_od <= NOW() AND (ru.rola_do IS NULL OR ru.rola_do >= NOW())';
        // czasy czy konto aktywne
        db.query(userRoleQuery2, [req.mail], (err, roleData) => {
          if (err) {
            console.error("Błąd podczas pobierania roli użytkownika:", err);
            return res.json({ Error: "Getting user role error in server" });
          }

          req.userRole = roleData[0].rola; // Zakładam, że użytkownik ma jedną rolę

          next();
        });
      }
    });
  }
};

// router.get("/main", verifyUser, (req, res) => {
//   // Możesz teraz użyć req.userRole w zależności od roli użytkownika
//   return res.json({ Status: "Success", mail: req.mail });

// });

router.get("/main", verifyUser, (req, res) => {
  // Możesz teraz użyć req.userRole w zależności od roli użytkownika
  if (req.userRole === "admin") {
    return res.json({ Status: "Success", mail: req.mail, userRole: req.userRole });
  } else if (req.userRole === "pracownik") {
    return res.json({ Status: "Success", mail: req.mail, userRole: req.userRole });
  } else if (req.userRole === "klient") {
    return res.json({ Status: "Success", mail: req.mail, userRole: req.userRole });
  } else {
    return res.json({ Status: "Error"});
  }
});


router.get("/userprofile", verifyUser, (req, res) => {
  return res.json({ Status: "Success", mail: req.mail });
});

router.get("/edit-user-data", verifyUser, (req, res) => {
  return res.json({ Status: "Success", mail: req.mail });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

module.exports = router;
