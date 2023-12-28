const express = require("express");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const userRoutes = require("./routes/user");
const userSauces = require("./routes/sauces");
const dotenv = require("dotenv");
dotenv.config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWD}@cluster0.cvt8ztg.mongodb.net/hotTakes`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.log("Connexion à MongoDB échouée ! " + error));

app.use(express.json());
app.use(cors());
//Modification du middleware crossOriginRessourcePolicy de helmet pour autoriser l'affichage des images depuis tout site
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

//Informations CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//Routes que va suivre l'API à chaque appel
app.use("/api/auth", limiter, userRoutes);
app.use("/api/sauces", userSauces);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
