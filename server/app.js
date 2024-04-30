require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./models/db");
const models = require("./models");
  
const app = express();
app.use(morgan("dev"));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(express.json());

app.use(require("./routes"));

app.use((req, res, next) => {
  const error = new Error(`Not Found ` + req.originalUrl);
  res.status(404);
  next(error);
});

app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({
    message: error.message || "Internal Server Error",
  });
});

const port = process.env.PORT || 4122;
 
db.sync({force : false}).then(() => {
  app.listen(port, () => console.log("Listening on port :" , port));
});
