const express = require("express");
const https = require("node:https");
const axios = require("axios");
const fetch = require("node-fetch");
const fs = require("fs");
const jwt = require("jsonwebtoken");
let cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3003;

app.use(cors());

// ————————————————————————————————————o Assigned Reading —>
// 
// Writing middleware for use in Express apps
// http://expressjs.com/en/guide/writing-middleware.html
// 
// 

// ————————————————————————————————————o————————————————————————————————————o create signed twitter token -->
// ————————————————————————————————————o create signed twitter token —>
//
const weatherToken = () => {
  const privateKey = fs.readFileSync(__dirname + "/AuthKey_B5RUZ9LF74.p8");

  const token = jwt.sign(
    {
      sub: "com.mechaneyes.cybotrance",
    },
    privateKey,
    {
      issuer: "V8K2ALDM25", // TeamID via developer account
      expiresIn: "1h", // 1 hour of validity
      keyid: "B5RUZ9LF74", // ID for the created key
      algorithm: "ES256", // Apple algorithm
      header: {
        id: "V8K2ALDM25.com.mechaneyes.cybotrance",
      },
    }
  );
  
  return {
    Authorization: `Bearer ${token}`,
  };
};

// ————————————————————————————————————o————————————————————————————————————o All Weathers Fetcher -->
// ————————————————————————————————————o All Weathers Fetcher —>
//
const fetchWeather = (res, dataset) => {
  const config = weatherToken();

  // Time Zones Reference:
  // https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  // https://www.google.com/maps/place/Fort+Greene+Park/@40.6842269,-73.9712484,15z/
  //
  fetch(
    "https://weatherkit.apple.com/api/v1/weather/en/40.6842269/-73.9712484?dataSets=" +
      dataset +
      "&timezone=America/New_York",
    {
      method: "GET",
      headers: config,
    }
  )
    .then((response) => {
      return response.json();
    })
    // return the data to front end
    .then((data) => {
      // console.log(data);
      res.json(data);
    })
    .catch((err) => {
      console.error(err);
    });
};

// ————————————————————————————————————o————————————————————————————————————o Axios Errors -->
// ————————————————————————————————————o Axios Errors —>
//
const axiosErrors = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log("Error data", error.response.data);
    console.log("Error status", error.response.status);
    console.log("Error headers", error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser
    // and an instance of http.ClientRequest in node.js
    console.log("Error request", error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error message", error.message);
  }
  console.log(error.config);
};

// ————————————————————————————————————o————————————————————————————————————o Current Weather -->
// ————————————————————————————————————o Current Weather —>
//
app.get("/current", async (req, res, next) => {
  await fetchWeather(res, "currentWeather");
});

// ————————————————————————————————————o————————————————————————————————————o Hourly Weather -->
// ————————————————————————————————————o Hourly Weather —>
//
app.get("/hourly", async (req, res, next) => {
  await fetchWeather(res, "forecastHourly");
});

// ————————————————————————————————————o————————————————————————————————————o Listen -->
// ————————————————————————————————————o Listen —>
//
app.listen(port, () => {
  console.log(`Twitter+Weather server listening on port ${port}`);
});
