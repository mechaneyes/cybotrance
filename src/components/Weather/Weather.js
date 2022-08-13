import { useEffect } from "react";
import "./Weather.scss";

const Weather = () => {
  useEffect(() => {
    fetch("http://localhost:3003")
      .then((response) => {
        console.log("resolved", response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        console.log('data' + data);

        document.querySelector('.weather-top__temp').innerHTML = data.currentWeather.temperature
      })
      .catch((err) => {
        console.log("error retrieving data", err);
      });
  });

  return (
    <section className="weather">
      <div className="weather-top">
        <h3 className="weather-top__humidity">83%</h3>
        <h2 className="weather-top__temp">107°</h2>
      </div>
      <div className="weather-lineup">
        <div className="weather-lineup__item">
          <p>86°</p>
          <p>8pm</p>
        </div>
        <div className="weather-lineup__item">
          <p>82°</p>
          <p>9pm</p>
        </div>
        <div className="weather-lineup__item">
          <p>69°</p>
          <p>1am</p>
        </div>
        <div className="weather-lineup__item">
          <p>80°</p>
          <p>10pm</p>
        </div>
        <div className="weather-lineup__item">
          <p>77°</p>
          <p>11pm</p>
        </div>
        <div className="weather-lineup__item">
          <p>74°</p>
          <p>12am</p>
        </div>
        <div className="weather-lineup__item">
          <p>69°</p>
          <p>1am</p>
        </div>
      </div>
    </section>
  );
};

export default Weather;
