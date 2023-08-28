// index.js
// where your node app starts

// init project
const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...

app.get("/api", function (req, res) {
  const currentDate = new Date();

  res.json({
    unix: currentDate.valueOf(),
    utc: currentDate.toUTCString(),
  });
});

app.get("/api/:date", function (req, res) {
  const enteredDate = isNaN(req.params.date)
    ? req.params.date
    : Number(req.params.date);
  const outputDate = new Date(enteredDate);

  if (outputDate.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: outputDate.valueOf(),
      utc: outputDate.toUTCString(),
    });
  }
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
