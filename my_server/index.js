const express = require("express"),
  app = express(),
  port = 4000,
  mongoose = require("mongoose"),
  bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
var mqtt = require("./src/mqtt/index");
mongoose
  .connect(
    "mongodb+srv://minhtoan:1234@cluster0.avqmomq.mongodb.net/?retryWrites=true&w=majority",
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("Connected!");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
var router = require("./src/router/index");
router(app);
app.use(() => {
  mqtt;
});
app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + "not found" });
});
app.listen(port);
console.log("RESTful API server started on: " + port);
// const { MongoClient, ServerApiVersion } = require('mongodb'); const uri = "mongodb+srv://minhtoan:<password>@cluster0.y1aq6b5.mongodb.net/?retryWrites=true&w=majority"; const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }); client.connect(err => {   const collection = client.db("test").collection("devices");   // perform actions on the collection object   client.close(); });