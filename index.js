///jshint esversions:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

  // console.log(req.body.crypto);
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var baseUrl = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
  var finalUrl = baseUrl + crypto + fiat;

  request(finalUrl, function(error, response, body) {
    // console.log(body);
    var data = JSON.parse(body);
    var price = data.last;
    var date = data.display_timestamp;

    res.write("<p>The Current Date is " + date + "</p>");

    res.write("<h1> The Current Price of " + crypto + " price is " + price + fiat + " </h1>");

    res.send();
  });



});



app.listen(3000, function() {
  console.log("Server is started on Port 3000!")
});
