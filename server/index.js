const express = require("express");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const bodyParser = require("body-parser");

require("dotenv").config({ path: "./config/.env" });
require("./config/db");

const mangasRoutes = require("./routes/mangas.routes");
const usersRoutes = require("./routes/users.routes");
const authRouter = require("./routes/authentication.router");
const reviewRouter = require("./routes/review.routes");
const contactRouter = require("./routes/contact.routes");

const app = express();

// configuration express-mongo-sanitze
app.use(
  mongoSanitize({
    allowDots: true,
    replaceWith: "_",
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

//----- Headers & autorizations -----//
const corsOptions = {
  origin: `http://localhost:3000,`,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middlewares
// Routes
app.use("/api/mangas", mangasRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRouter);
app.use("/api", reviewRouter);
app.use("/api", contactRouter);

app.get("/", (req, res) => {
  res.send("Bienvenue sur Manyscan!");
});
module.exports = app;
