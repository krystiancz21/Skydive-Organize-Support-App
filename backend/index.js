const express = require("express");
const path = require('path');
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const jumpsRoutes = require("./routes/jumps");
const offerRoutes = require("./routes/offer");
const paymentRoutes = require("./routes/payment");
const messagesRoutes = require("./routes/messages");

const port = process.env.PORT || 3001;

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/Images')));
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
app.use("/api/offer", offerRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/messages", messagesRoutes);

app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});
