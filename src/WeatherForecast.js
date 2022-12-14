import React from "react";

export default function WeatherForecast(props) {
  return (
    <div className="WeatherForecast">
      <div className="row weather-forecast-row">
        <div className="col-2 weather-forecast-content">
          <div className=" weather-forecast-date">Sat</div>
          <img className="" width={70} src={props.weather.icon} alt="" />
          <div className="weather-forecast-temperature">
            <span className="weather-forecast-temperature-max">19°</span>
            <span className="weather-forecast-temperature-min">6°</span>
          </div>
        </div>
      </div>
    </div>
  );
}
