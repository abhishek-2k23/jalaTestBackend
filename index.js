const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

function dbconnect() {
  mongoose
    .connect("mongodb+srv://abhishek:qdknt3dO9EqptuqE@cluster0.k1jynpp.mongodb.net/jalatest", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("DB connection successful");
    })
    .catch((error) => {
      console.log("DB is not connected:", error);
    });
}

dbconnect();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send("app is running smoothly");
});


const router = require("./router");
app.use(router);

app.listen(4000, () => {
  console.log("app started at 4000");
});
