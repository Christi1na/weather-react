import React, { useState } from "react";

export default function Temperature({ temperature }) {
  const [isCelsius, setIsCelsius] = useState(true);
  function displayCelsiusTemperature(e) {
    setIsCelsius(true);
    e.preventDefault();
  }

  function displayFahrenheitTemperature(e) {
    setIsCelsius(false);
    e.preventDefault();
  }

  if (isCelsius) {
    return (
      <h1 className="card-title temperature">
        <span id="temperature">{temperature}</span>
        <span className="links">
          <a className="link active" id="celsius-link" href="/" onClick={displayCelsiusTemperature}>
            °C
          </a>{" "}
          |
          <a className="link" id="fahrenheit-link" href="/" onClick={displayFahrenheitTemperature}>
            °F
          </a>
        </span>
      </h1>
    );
  } else {
    const celsiusTemperature = Math.round((temperature * 9) / 5 + 32);
    return (
      <h1 className="card-title temperature">
        <span id="temperature">{celsiusTemperature}</span>
        <span className="links">
          <a className="link" id="celsius-link" href="/" onClick={displayCelsiusTemperature}>
            °C
          </a>{" "}
          |
          <a className="link active" id="fahrenheit-link" href="/" onClick={displayFahrenheitTemperature}>
            °F
          </a>
        </span>
      </h1>
    );
  }
}
