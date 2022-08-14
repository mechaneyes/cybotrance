const express = require("express");
const axios = require("axios");
const fs = require("fs");
const jwt = require("jsonwebtoken");
let cors = require("cors");

const app = express();
const port = 3003;

app.use(cors());

// ————————————————————————————————————o————————————————————————————————————o create signed token -->
// ————————————————————————————————————o create signed token —>
let createToken = () => {
  const privateKey = fs.readFileSync(__dirname + "/AuthKey_257TYZZU8P.p8");

  const token = jwt.sign(
    {
      sub: "com.mechaneyes.cybotrance",
    },
    privateKey,
    {
      issuer: "V8K2ALDM25", // TeamID via developer account
      expiresIn: "1h", // 1 hour of validity
      keyid: "257TYZZU8P", // ID for the created key
      algorithm: "ES256", // Apple algorithm
      header: {
        id: "V8K2ALDM25.com.mechaneyes.cybotrance",
      },
    }
  );

  return { headers: { Authorization: `Bearer ${token}` } };
};

// ————————————————————————————————————o————————————————————————————————————o Current Weather -->
// ————————————————————————————————————o Current Weather —>
app.get("/current", async (req, res, next) => {
  let config = createToken();

  // Reference Time Zones:
  // https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  const url =
    "https://weatherkit.apple.com/api/v1/weather/en/38.5816/-121.4944?dataSets=currentWeather&timezone=Americas/Los_Angeles";

  // get the data
  const { data: weatherData } = await axios.get(url, config);
  //console.log(weatherData);

  // return the data to front end
  res.json(weatherData);
});

// ————————————————————————————————————o————————————————————————————————————o Hourly Weather -->
// ————————————————————————————————————o Hourly Weather —>
app.get("/hourly", async (req, res, next) => {
  let config = createToken();

  const url =
    "https://weatherkit.apple.com/api/v1/weather/en/38.5816/-121.4944?dataSets=forecastHourly&timeZone=America/Los_Angeles";

  const { data: weatherData } = await axios.get(url, config);
  //console.log(weatherData);

  res.json(weatherData);
});

app.listen(port, () => {
  console.log(`Weather app listening on port ${port}`);
});
