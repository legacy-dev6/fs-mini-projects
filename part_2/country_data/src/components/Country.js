import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Country = (props) => {
    const { countryData } = props

    //weather block
    const [weatherData, setWeather] = useState([])

    const params = {
        access_key: process.env.REACT_APP_API_KEY,
        query: `${countryData.capital}`
    }
    useEffect(() => {
        axios.get('http://api.weatherstack.com/current', { params })
            .then(response => {
                setWeather(response.data)
            })
    }, [])


    return (
        <div>
            <h1>{countryData.name}</h1>
            <p>capital: {countryData.capital}</p>
            <p>population: {countryData.population}</p>
            <h3>languages</h3>
            <ul>
                {countryData.languages.map(lang => {
                    return (
                        <li key={lang.name}>{lang.name}</li>
                    )
                })}
            </ul>
            <img src={countryData.flag} alt="flag" height="180px" />

            <h3>weather in {countryData.capital}</h3>
            {
                (weatherData.current) &&
                <div>
                    <p><strong>temperature:</strong> {weatherData.current.temperature} Celsius</p>
                    <img src={weatherData.current.weather_icons} alt="weather icon" />
                    <p><strong>wind:</strong> {weatherData.current.wind_speed} Kmph <strong>direction:</strong>{weatherData.current.wind_dir}</p>
                </div>
            }

        </div>
    )
}


export default Country