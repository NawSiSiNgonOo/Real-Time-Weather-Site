import { IoLocation } from "react-icons/io5";
import "./displayWeather.css";
import React from "react";
import { ChangeEvent, useEffect, useState, useRef } from "react";
import moment from "moment";
import getWeatherMessage from "../../constants/weatherMessage";
import { FormEvent } from "react";
import useWeatherApi from "../../hooks/useWeatherApi";
import useLocation from "../../hooks/useLocation";

const DisplayWeather = ({
  setCity,
}: {
  setCity: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const {
    weatherData,
    suggestions,
    fetchWeatherData,
    setSuggestions,
    fetchCitySuggestions,
  } = useWeatherApi();
  const { location } = useLocation();
  const [loading, setLoading] = useState(false);
  const [searchCity, setSearchCity] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchCity(searchCity);
    setCity(searchCity);
    await fetchWeatherData(null, null, searchCity);
    setSearchCity("");
    setSuggestions([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (location) {
        try {
          setLoading(true);
          await fetchWeatherData(location.latitude, location.longitude, null);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
    };
    fetchData();
  }, [fetchWeatherData, location]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchCity(e.target.value);
    if (value.length > 2) {
      fetchCitySuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (city: string) => {
    setSearchCity(city);
    setSuggestions([]);
    inputRef.current?.focus();
  };

  return (
    <div className="displayWeatherContainer">
      <div className="searchLocation">
        <IoLocation className="IoLocation" />
        <form action="" onSubmit={handleSearch}>
          <input
            type="text"
            className="searchLocationInput"
            placeholder="Search Location ..."
            value={searchCity}
            onChange={handleInputChange}
            ref={inputRef}
          />
        </form>
      </div>
      {suggestions && suggestions.length > 0 && (
        <div>
          <ul className="suggestions-dropdown">
            {suggestions.map((city, index) => (
              <li
                key={index}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(city)}
              >
                {city}
              </li>
            ))}
          </ul>
        </div>
      )}
      {loading && (
        <div className="weatherInfo">
          <div className="loader"></div>
        </div>
      )}
      {weatherData && (
        <div className="displayWeatherInfo">
          <div className="weatherInfo">
            <h1>{weatherData.locationName}</h1>
            <p>{weatherData.temperature}&deg;C</p>
            <img src={weatherData.conditionIcon} alt="" />
            <h2>{weatherData.conditionText}</h2>
            <p className="textStyle">
              {getWeatherMessage(
                weatherData.weatherCode,
                weatherData.temperature
              )}
            </p>
          </div>
          <div className="weatherDateTime">
            <p>{moment(weatherData.localTime).format("MMM Do YY")}</p>
            <p>
              {moment(weatherData.localTime).format("dddd")} |{" "}
              {moment(weatherData.localTime).format("h:mm A")}
            </p>
            <p>{weatherData.country}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayWeather;
