const express = require("express");
const axios = require("axios");
const fs = require("fs");
const jwt = require("jsonwebtoken");
let cors = require("cors");

const app = express();
const port = 3003;

app.use(cors());
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   // res.header("Access-Control-Allow-Credentials", "true");
//   // res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//   // res.header(
//   //   "Access-Control-Allow-Headers",
//   //   "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
//   // );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.get("/", async (req, res, next) => {
  var privateKey = fs.readFileSync(__dirname + "/AuthKey_257TYZZU8P.p8");

  // Creating the signed token needs specific data
  var token = jwt.sign(
    {
      sub: "com.mechaneyes.cybotrance", // reverse URL App Id
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

  // log your token so you can decode it and manually check
  // console.log(token);

  const url =
    "https://weatherkit.apple.com/api/v1/weather/en/40.7128/74.0060?dataSets=currentWeather&timezone=Europe/London";

  // add the token to your headers
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // get the data
  const { data: weatherData } = await axios.get(url, config);

  // prove we have data
  //console.log(weatherData);

  // return the data to your front end
  res.json(weatherData);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
