require("dotenv").config();
const express = require("express");
const router = require("./routes/index");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(router);

//home page

app.get("/", (req, res) => {
  res.send("Homepaage");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, async (req, res) => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => {
        console.log("conneted to db");
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
  console.log(`server started at port ${PORT}`);
});
