import React, { useState } from "react";
import axios from "axios";
import WeatherInfo from "./WeatherInfo";

export default function Weather(props) {
  const apiKey = "5e87f4ecb5ef263ffd194d9c88ca4f24";
  const [city, setCity] = useState(props.defaultCity);
  const [weather, setWeather] = useState({ ready: false });

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
    setWeather({
      ready: true,
      city: response.data.name,
      temperature: Math.round(response.data.main.temp),
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: ` http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function getApiUrl() {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // setCity(cityName);
    getApiUrl();
  }

  function getCity(e) {
    setCity(e.target.value);
  }

  if (weather.ready) {
    return (
      <div className="wrapper">
        <form className="row mb-4" id="form" onSubmit={handleSubmit}>
          <div className="col-6 ">
            <input type="search" className="form-control" id="input-text" placeholder="City name" autoComplete="off" autoFocus="on" onChange={getCity} />
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
        <WeatherInfo weather={weather} />
      </div>
    );
  } else {
    getApiUrl();
    return "Loading...";
  }
}
