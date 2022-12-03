import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  const apiKey = "5e87f4ecb5ef263ffd194d9c88ca4f24";
  const [city, setCity] = useState("Dnipro");
  const [weather, setWeather] = useState({ temperature: -2, humidity: 58, wind: 6 });

  const date = new Date();
  const hours = date.getHours();
  let minutes = String(date.getMinutes());
  if (minutes.length === 1) {
    minutes = `0${minutes}`;
  }
  const day = date.getDay();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // function getCurrentWeather(response) {}

  // function getCoordinates(response) {
  //   const lat = response.coords.latitude;
  //   const lon = response.coords.longitude;
  //   axios
  //     .get(
  //       `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
  //     )
  //     .then(getCurrentWeather);
  // }
  // navigator.geolocation.getCurrentPosition(getCoordinates);

  function handleResponse(response) {
    setCity(response.data.name);
    setWeather({
      temperature: Math.round(response.data.main.temp),
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: ` http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function getApiUrl(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // setCity(cityName);
    getApiUrl(cityName);
  }

  let cityName;

  function getCity(e) {
    e.preventDefault();
    cityName = e.target.value;
  }

  return (
    <div className="container">
      <div className="wrapper">
        <form className="row mb-4" id="form" onSubmit={handleSubmit}>
          <div className="col-6 ">
            <input type="search" className="form-control" id="input-text" placeholder="City name" autoComplete="off" onChange={getCity} />
          </div>
          <div className="col-3 ">
            <input type="submit" className="form-control btn btn-primary" value="Search" />
          </div>
          <div className="col-3 ">
            <button className="form-control btn btn-success" id="current-location-button">
              Current
            </button>
          </div>
        </form>
        <div className="row mb-4">
          <div className="col-7">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">
                  <span id="city">{city}</span>
                </h2>
                <p className="card-text">
                  Last updated:
                  <span> {days[day]}</span>
                  <span> {hours}</span>:<span>{minutes}</span>
                </p>

                <p className="card-text">
                  Humidity: <span id="humidity">{weather.humidity}%</span>, Wind:
                  <span id="wind"> {weather.wind}km/h</span>
                </p>
                <p className="card-text" id="description"></p>
              </div>
            </div>
          </div>
          <div className="col-5">
            <div className="card">
              <div className="card-body weather-info">
                <img id="icon" src={weather.icon} alt="" />
                <h1 className="card-title temperature">
                  <span id="temperature">{weather.temperature}</span>
                  <span className="links">
                    <a className="link active" id="celsius-link" href="/">
                      °C
                    </a>{" "}
                    |
                    <a className="link" id="fahrenheit-link" href="/">
                      °F
                    </a>
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="open-source">
        <a href="https://github.com/Christi1na/weather-react" target="_blank" rel="noopener noreferrer">
          Open-source code
        </a>
        <span>, by Kristina Astaturian</span>
      </div>
    </div>
  );
}
