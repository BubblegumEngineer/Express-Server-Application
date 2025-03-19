const express = require("express");
const app = express();
const PORT = 4000;
const bodyParser = require("body-parser");
const morgan = require("morgan");

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

//setting the view engine as ejs
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("This is working");
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
