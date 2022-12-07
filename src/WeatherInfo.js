import React from "react";
import FormattedDate from "./FormattedDate";
import WeatherTemperature from "./WeatherTemperature";

export default function WeatherInfo({ weather }) {
  return (
    <div className="row mb-4">
      <div className="col-7">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">
              <span id="city">{weather.city}</span>
            </h2>
            <FormattedDate />

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
            <WeatherTemperature temperature={weather.temperature} />
          </div>
        </div>
      </div>
    </div>
  );
}
