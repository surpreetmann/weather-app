import React, { Component } from 'react';
import './css/App.css';

import ButtonSearch from './components/ButtonSearch';
import WeatherDisplay from './components/WeatherDisplay';

const API_KEY = "99245f7225258e7c4334adae8e685e53";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherData: [],
            searchDone: false,
            errorMessage: '',
        };

        this.dataCallWeather = this.dataCallWeather.bind(this);
    }

    dataCallWeather(city) {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=15&APPID=${API_KEY}`;
        fetch(url)
            .then(handleErrors)
            .then(resp => resp.json())

            .then(data => {
                let arrObj = [];
                data.list.forEach(element => {
                    arrObj.push({
                        currentweather: element.weather,
                        city: data.city.name,
                        country: data.city.country,
                        minT: element.main.temp_min,
                        maxT: element.main.temp_max,
                        humidity: element.main.humidity,
                        temperature: element.main.temp,
                        currentdatetime: element.dt_txt,
                    });
                });
                this.setState({
                    weatherData: arrObj,
                    searchDone: true,
                    errorMessage: '',
                });
            })
            .catch(error => {
                this.setState({ errorMessage: error.message });
                this.setState({
                    weatherData: null,
                    searchDone: false,  
                });
            });

        function handleErrors(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }
    }
    render() {
        const { searchDone, weatherData, errorMessage } = this.state;

        return (
            <div className="DashBoard">
                <div className="App">
                <ButtonSearch callBackFromParent={this.dataCallWeather} error={errorMessage} />
               </div>
                <div className="topContainer">
                   
                    {searchDone &&
                        weatherData.map((value, index) => {
                        return <WeatherDisplay weatherData={value} />
                        
                         ;
                    })}
                </div>
            </div>
        );
    }
}

export default App;
