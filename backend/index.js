const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const jumpsRoutes = require("./routes/jumps");
const paymentRoutes = require("./routes/payment");

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/jumps", jumpsRoutes);
app.use("/api/payment", paymentRoutes);

app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});
