const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const { hostRouter } = require("./routers/hostRouter");
const storeRouter = require("./routers/storeRouter");
const rootDir = require("./util/path-util");

const errorController = require("./controllers/errorController");









const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(rootDir, "public")));

app.use(bodyParser.urlencoded({ extended: true }));




app.use(storeRouter);
app.use("/host",hostRouter);



app.use(errorController.get404);

const mongoose = require("mongoose");
const PORT = 3001;

const MONGO_DB_URL =
  "mongodb+srv://pranaypraveen1210:a4b3c2d1%3F%3F@airbnb.ngu7mqb.mongodb.net/Airbnb?appName=airbnb";

mongoose.connect(MONGO_DB_URL)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server running at: http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error(err));

