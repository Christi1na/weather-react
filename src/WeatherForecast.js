import React from "react";
import { RotatingLines } from "react-loader-spinner";

export default function WeatherForecast({ forecastApiUrl, forecast }) {
  function formatDay(timestamp) {
    const date = new Date(timestamp * 1000);
    const day = date.getDay();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
  }

  if (forecast.isInit) {
    return (
      <div className="row border-bottom border-top pt-4 pb-4">
        {forecast.days.map((day, index) => {
          if (index < 6) {
            return (
              <div className="col-2" key={index}>
                <div className="weather-forecast-content">
                  <div className="weather-forecast-date">{formatDay(day.time)}</div>
                  <img className="" width={70} src={day.condition.icon_url} alt={day.condition.description} title={day.condition.description} />
                  <div className="weather-forecast-temperature">
                    <span className="weather-forecast-temperature-max">{Math.round(day.temperature.maximum)}°</span>
                    <span className="weather-forecast-temperature-min">{Math.round(day.temperature.minimum)}°</span>
                  </div>
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    );
  } else {
    forecastApiUrl();
    return (
      <div className="text-center">
        <RotatingLines strokeColor="blue" strokeWidth="5" animationDuration="0.75" width="60" visible={true} />
      </div>
    );
  }
}
