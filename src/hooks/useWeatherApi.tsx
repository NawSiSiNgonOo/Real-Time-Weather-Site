import axios from "axios";
import { useState, useCallback } from "react";
import type { WeatherData, HourlyData, DailyData, City } from "../types/models";
import { getFetchError } from "../constants/errorMessage";
const useWeatherApi = () => {
  const api_key = import.meta.env.VITE_API_KEY;
  const api_Endpoint = import.meta.env.VITE_API_ENDPOINT;
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [suggestions, setSuggestions] = useState([]);
  const [hourlyData, setHourlyData] = useState<HourlyData[]>([]);
  const [dailyData, setDailyData] = useState<DailyData[]>([]);

  const fetchCitySuggestions = async (value: string) => {
    if (!value) {
      setSuggestions([]);
      return;
    }
    try {
      const url = `${api_Endpoint}search.json?key=${api_key}&q=${value}`;
      const response = await axios.get(url);
      const cities = response.data.map((city: City) => city.name);
      setSuggestions(cities);
    } catch (error) {
      getFetchError(error);
      setSuggestions([]);
    }
  };

  const fetchWeatherData = useCallback(
    async (lat: number | null, lon: number | null, city: string | null) => {
      try {
        let url = `${api_Endpoint}forecast.json?key=${api_key}`;
        if (city) {
          url += `&q=${city}`;
        } else if (lat !== null && lon !== null) {
          url += `&q=${lat},${lon}`;
        }

        const response = await axios.get(url);
        const data = response.data;
        setWeatherData({
          locationName: data.location.name,
          country: data.location.country,
          temperature: data.current.temp_c,
          conditionText: data.current.condition.text,
          conditionIcon: data.current.condition.icon,
          windSpeed: data.current.wind_kph,
          humidity: data.current.humidity,
          localTime: data.location.localtime,
          weatherCode: data.current.condition.code,
          isDay: data.current.is_Day,
        });
      } catch (error) {
        getFetchError(error);
      }
    },
    [api_Endpoint, api_key]
  );

  const fetchHourlyWeather = useCallback(
    async (
      lat: number | null,
      lon: number | null,
      searchCity: string | null
    ) => {
      try {
        let url = `${api_Endpoint}forecast.json?key=${api_key}`;
        if (searchCity) {
          url += `&q=${searchCity}`;
        } else if (lat !== null && lon !== null) {
          url += `&q=${lat},${lon}`;
        }
        const response = await axios.get(url);
        const data = response.data;
        const hourlyForecast = data.forecast.forecastday[0].hour.map(
          (hour: HourlyData) => ({
            time: hour.time,
            temp_c: hour.temp_c,
            condition: {
              icon: hour.condition.icon,
            },
          })
        );
        setHourlyData(hourlyForecast);
      } catch (error) {
        getFetchError(error);
      }
    },
    [api_Endpoint, api_key]
  );

  const fetchFiveDays = useCallback(
    async (
      lat: number | null,
      lon: number | null,
      searchCity: string | null
    ) => {
      try {
        let url = `${api_Endpoint}forecast.json?key=${api_key}&days=5`;

        if (searchCity) {
          url += `&q=${searchCity}`;
        } else if (lat !== null && lon !== null) {
          url += `&q=${lat},${lon}`;
        }
        const response = await axios.get(url);
        const forecast = response.data;
        const dailyForecast = forecast.forecast.forecastday.map(
          (d: DailyData) => ({
            date: d.date,
            day: {
              avgtemp_c: d.day.avgtemp_c,
              condition: {
                icon: d.day.condition.icon,
              },
            },
          })
        );
        setDailyData(dailyForecast);
      } catch (error) {
        getFetchError(error);
      }
    },
    [api_Endpoint, api_key]
  );

  return {
    weatherData,
    suggestions,
    hourlyData,
    dailyData,
    setSuggestions,
    fetchWeatherData,
    fetchHourlyWeather,
    fetchCitySuggestions,
    fetchFiveDays,
  };
};

export default useWeatherApi;
