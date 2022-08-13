import { useState, useEffect } from "react";
import "./Weather.scss";

const Weather = () => {

  const offsetFromGmt = 9

  const formatHours = (offset) => {
    const d = new Date();
    let hours = d.getHours();
    let ampm = hours >= 12 ? 'pm' : 'am';
    
    hours += offset
    hours = hours % 12
    hours = hours ? hours : 12
    
    let strTime = hours + ampm;

    return strTime
  }

  // formatHours()
  // formatHours(2)

  let hourlyInitial = [
    {
      id: 0,
      hour: 0,
      temp: 0,
      precipitationChance: 0,
    },
    {
      id: 1,
      hour: 0,
      temp: 0,
      precipitationChance: 0,
    },
    {
      id: 2,
      hour: 0,
      temp: 0,
      precipitationChance: 0,
    },
    {
      id: 3,
      hour: 0,
      temp: 0,
      precipitationChance: 0,
    },
    {
      id: 4,
      hour: 0,
      temp: 0,
      precipitationChance: 0,
    },
    {
      id: 5,
      hour: 0,
      temp: 0,
      precipitationChance: 0,
    },
    {
      id: 6,
      hour: 0,
      temp: 0,
      precipitationChance: 0,
    },
  ];

  const [currTemp, setCurrTemp] = useState(null);
  const [currHumid, setCurrHumid] = useState(null);

  const [hourlyArray, setHourlyArray] = useState(hourlyInitial);

  const cToF = (celsius, precision = 1) => {
    const cTemp = celsius;
    const cToFahr = (cTemp * 9) / 5 + 32;
    var message = cTemp + "\xB0C is " + cToFahr + " \xB0F.";
    // console.log(message);
    return cToFahr.toFixed(precision);
  };

  // ————————————————————————————————————o————————————————————————————————————o Current Weather -->
  // ————————————————————————————————————o Current Weather —>
  useEffect(() => {
    fetch("http://localhost:3003/current")
      .then((response) => {
        // console.log("resolved", response);
        return response.json();
      })
      .then((data) => {
        // console.log(data);

        setCurrTemp(cToF(parseFloat(data.currentWeather.temperature)));
        setCurrHumid(parseFloat(data.currentWeather.humidity) * 100);
        console.log('data.currentWeather', data.currentWeather)
      })
      .catch((err) => {
        console.log("error retrieving data", err);
      });
  });

  // ————————————————————————————————————o————————————————————————————————————o Hourly Weather -->
  // ————————————————————————————————————o Hourly Weather —>
  useEffect(() => {
    fetch("http://localhost:3003/hourly")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        // console.log('data.forecastHourly', data.forecastHourly.hours[0])

        for (let i = 0; i < 7; i++) {
          hourlyInitial[i].temp = data.forecastHourly.hours[i].temperature;
          // console.log("temp", hourlyInitial[i].temp);

          hourlyInitial[i].hour = formatHours(i + 1)
        }
      })
      .then(() => {
        // TODO: Push/Pop array items each hour:
        // https://stackoverflow.com/a/54677026
        //
        // setTheArray(oldArray => [...oldArray, newElement]);
      })
      .catch((err) => {
        console.log("error retrieving data", err);
      });
  });

  return (
    <section className="weather">
      <div className="weather-top">
        <h3 className="weather-top__humidity">{currHumid}%</h3>
        <h2 className="weather-top__temp">{currTemp}°</h2>
      </div>
      <div className="lineup">
        <div className="lineup__item lineup__item--0">
          <h4>{cToF(hourlyArray[0].temp, 0)}°</h4>
          <p>{hourlyArray[0].hour}</p>
        </div>
        <div className="lineup__item lineup__item--1">
          <h4>{cToF(hourlyArray[1].temp, 0)}°</h4>
          <p>{hourlyArray[1].hour}</p>
        </div>
        <div className="lineup__item lineup__item--2">
          <h4>{cToF(hourlyArray[2].temp, 0)}°</h4>
          <p>{hourlyArray[2].hour}</p>
        </div>
        <div className="lineup__item lineup__item--3">
          <h4>{cToF(hourlyArray[3].temp, 0)}°</h4>
          <p>{hourlyArray[3].hour}</p>
        </div>
        <div className="lineup__item lineup__item--4">
          <h4>{cToF(hourlyArray[4].temp, 0)}°</h4>
          <p>{hourlyArray[4].hour}</p>
        </div>
        <div className="lineup__item lineup__item--5">
          <h4>{cToF(hourlyArray[5].temp, 0)}°</h4>
          <p>{hourlyArray[5].hour}</p>
        </div>
        <div className="lineup__item lineup__item--6">
          <h4>{cToF(hourlyArray[6].temp, 0)}°</h4>
          <p>{hourlyArray[6].hour}</p>
        </div>
      </div>
    </section>
  );
};

export default Weather;
