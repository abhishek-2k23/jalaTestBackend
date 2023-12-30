const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

//database connection function
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

// database connected 
dbconnect();

//cors used
app.use(cors());

//for json data acceptance ...
app.use(express.json());

//message on home page of server
app.get('/', (req, res) => {
  res.send("app is running smoothly");
});

//routes 
const router = require("./router");
app.use(router);

//app initialized
app.listen(4000, () => {
  console.log("app started at 4000");
});
