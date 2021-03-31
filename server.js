require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;//@Herokuloko2021enois ...app school-chatbot-2021...no mongo cristiano.muroni@compasso.com.br

mongoose.connect(process.env.MONGODB_URL ||process.env.DATABASE_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("database Connected"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const router = require("./routes");
app.use(router);

app.listen(port, () => console.log(`Server running at port ${port}`));
