import React, { Component } from "react";
import "../css/WeatherDisplay.css";

class WeatherDisplay extends Component {
  
  render() {
    const {city, currentweather, country, temperature,humidity,maxT,minT,currentdatetime} = this.props.weatherData;
    const cTemp = Math.round(temperature - 273.15);
    const maxTemperature = Math.round(maxT - 273.15);
    const minTemperature = Math.round(minT-273.15)
    return (
      <div class="topContainer">
        <div className="WeatherDisplay">
        <h2 className="WeatherDisplay-Details">
          {city}, {country}
        </h2>
        <h3><div className="WeatherDisplay-Details">
        {currentdatetime}
        </div></h3>
        <h1 className="WeatherDisplay-degrees"><span class="w3-badge w3-green">{cTemp}°C</span></h1>
        <h2 className="WeatherDisplay-Details">
          <div>
            <label for="Max Temp">Max: {maxTemperature}°C</label>
          </div>
          <div>
            <label for="Min Temp">Min: {minTemperature}°C</label>
          </div> 
        </h2>
        
        <span class="w3-badge w3-padding">
        <i className={`wi wi-owm-${currentweather[0].id} WeatherDisplay-icon`} />
          <p><font size="5">{currentweather[0].main}</font></p>
          </span>
          
        <h2 className="WeatherDisplay-Details">
          <div>
            <label for="Humidity">Humidity: {humidity}</label>
          </div>
        </h2>
        
      </div>
      </div>
    );
  }
}
export default WeatherDisplay;
