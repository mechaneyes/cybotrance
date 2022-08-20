const express = require("express");
const https = require("node:https");
const axios = require("axios");
const fs = require("fs");
const jwt = require("jsonwebtoken");
let cors = require("cors");
require("dotenv").config();

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

  return {
    timeout: 60000,
    httpsAgent: new https.Agent({ keepAlive: true }),
    headers: { Authorization: `Bearer ${token}` },
  };
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
  res.json(weatherData);
});

// ————————————————————————————————————o————————————————————————————————————o Twitter -->
// ————————————————————————————————————o Twitter —>
app.get("/twitter", async (req, res, next) => {
  const twitterConfig = {
    timeout: 60000,
    httpsAgent: new https.Agent({ keepAlive: true }),
    headers: {
      Authorization: "Bearer " + process.env.TWITTER_BEARER_TOKEN,
      Cookie: "guest_id=v1%3A166054213299708709",
    },
  };

  // const url = "https://api.twitter.com/2/users/208585808/tweets";
  let twitterUrl =
    "https://api.twitter.com/2/users/208585808/tweets?max_results=5&since_id=";
  let lastId = 1560899440340516864;
  twitterUrl = twitterUrl + lastId;

  let { data: returnedTweets } = await axios
    .get(twitterUrl, twitterConfig)
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser
        // and an instance of http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });

  res.json(returnedTweets.data[0]);
});

// ————————————————————————————————————o————————————————————————————————————o Listen -->
// ————————————————————————————————————o Listen —>
app.listen(port, () => {
  console.log(`Twitter+Weather server listening on port ${port}`);
});
