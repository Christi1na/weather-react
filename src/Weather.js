import React, { useState } from "react";
import axios from "axios";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import { RotatingLines } from "react-loader-spinner";

export default function Weather(props) {
  const apiKey = "5e87f4ecb5ef263ffd194d9c88ca4f24";
  const [city, setCity] = useState(props.defaultCity);
  const [weather, setWeather] = useState({ ready: false });
  const [forecast, setForecast] = useState({ isInit: false });

  function displayCurrentWeather(e) {
    e.preventDefault();
    function getCoordinates(response) {
      const lat = response.coords.latitude;
      const lon = response.coords.longitude;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`).then(handleResponse);
      axios.get(`https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=0a61o14eb1fedf4ec084dt130b222342`).then(handleForecastResponse);
    }
    navigator.geolocation.getCurrentPosition(getCoordinates);
  }

  function handleResponse(response) {
    setWeather({
      ready: true,
      city: response.data.name,
      description: response.data.weather[0].description,
      temperature: Math.round(response.data.main.temp),
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: ` http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      lat: response.data.coord.lat,
      lon: response.data.coord.lon,
    });
  }

  function getApiUrl() {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  function handleForecastResponse(response) {
    setForecast({
      isInit: true,
      days: response.data.daily,
    });
  }

  function forecastApiUrl() {
    axios.get(`https://api.shecodes.io/weather/v1/forecast?lon=${weather.lon}&lat=${weather.lat}&key=0a61o14eb1fedf4ec084dt130b222342`).then(handleForecastResponse);
  }

  async function getData() {
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const weatherJson = await weatherResponse.json();
    const forecastResponse = await fetch(`https://api.shecodes.io/weather/v1/forecast?lon=${weatherJson.coord.lon}&lat=${weatherJson.coord.lat}&key=0a61o14eb1fedf4ec084dt130b222342`);
    const forecastJson = await forecastResponse.json();
    setForecast({
      isInit: true,
      days: forecastJson.daily,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    getApiUrl();
    getData();
  }

  function getCity(e) {
    setCity(e.target.value);
  }

  if (weather.ready) {
    return (
      <div className="">
        <div className="wrapper">
          <div className="row">
            <form className="row mb-4 col-9" id="form" onSubmit={handleSubmit}>
              <div className="col-8 ">
                <input type="search" className="form-control" id="input-text" placeholder="City name" autoComplete="off" autoFocus="on" onChange={getCity} />
              </div>
              <div className="col-4 ">
                <input type="submit" className="form-control btn btn-primary" value="Search" />
              </div>
            </form>
            <div className="col-3">
              <button className="form-control btn btn-success" id="current-location-button" onClick={displayCurrentWeather}>
                Current
              </button>
            </div>
          </div>
          <WeatherInfo weather={weather} />
          <WeatherForecast weather={weather} forecastApiUrl={forecastApiUrl} forecast={forecast} />
        </div>
        <div className="open-source mt-3">
          <a href="https://github.com/Christi1na/weather-react" target="_blank" rel="noopener noreferrer">
            Open-source code
          </a>
          <span>, by Kristina Astaturian</span>
        </div>
      </div>
    );
  } else {
    getApiUrl();
    return (
      <div className="text-center">
        <RotatingLines strokeColor="green" strokeWidth="5" animationDuration="0.75" width="96" visible={true} />
      </div>
    );
  }
}
