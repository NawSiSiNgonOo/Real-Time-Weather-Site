import axios from "axios";
import { useState } from "react";
const useWeatherApi = () => {

    interface WeatherData{
        locationName:string;
        country:string;
        temperature:number;
        conditionText:string;
        conditionIcon:string;
        windSpeed:number;
        humidity:number;
        localTime:string;
        weatherCode:number;
        isDay:boolean | number;

    }

    interface HourlyData{
        currentTime:string,
        currentTemp:number,
        currentIcon:string,
    }

    interface DailyData{
        date:string,
        avgTemp:number,
        conditionIcon:string,
    }

    const api_key="44da2cd4399c4e18b71102445240212";
    const api_Endpoint="https://api.weatherapi.com/v1/";

    const [weatherData,setWeatherData]=useState<WeatherData|null>(null);
    const [suggestions,setSuggestions]=useState([]);
    const [hourlyData,setHourlyData]=useState<HourlyData []>([]);
    const [dailyData,setDailyData]=useState<DailyData []>([]);

    const fetchCitySuggestions=async(value:string)=>{
        if(!value)
        {
          setSuggestions([]);
          return;
        }
  
        try {
          const url = `${api_Endpoint}search.json?key=${api_key}&q=${value}`;
          const response = await axios.get(url);
          const cities = response.data.map((city: any) => city.name);
          setSuggestions(cities);
        }
        catch (error) {
          console.error("Error fetching weather data:", error);
          setSuggestions([]);
        }
  
      }

   
    
    const fetchWeatherData=async(lat:number | null, lon:number | null, city:string | null)=>{
        try{
          let url = `${api_Endpoint}forecast.json?key=${api_key}`;
          if (city)
            {
              url+=`&q=${city}`;
            }
          else if (lat !== null && lon !== null) {
              url += `&q=${lat},${lon}`;
            }
          const response=await axios.get(url);
          const data=response.data;
          setWeatherData({
            locationName: data.location.name,
            country: data.location.country,
            temperature: data.current.temp_c,
            conditionText: data.current.condition.text,
            conditionIcon: data.current.condition.icon,
            windSpeed: data.current.wind_kph,
            humidity: data.current.humidity,
            localTime:data.location.localtime,
            weatherCode:data.current.condition.code,
            isDay:data.current.is_Day,
          });
        }
        catch (error)
        {
            console.error("Error fetching weather data:",error);
            throw error;
        }
    };
    
    
    const fetchHourlyWeather = async (lat: number | null, lon: number | null, searchCity: string | null) => {
        try {
            let url = `${api_Endpoint}forecast.json?key=${api_key}`;
    
            if (searchCity)
            {
                url+=`&q=${searchCity}`;
            }
            else if (lat !== null && lon !== null) {
                url += `&q=${lat},${lon}`;
              }
          const response = await axios.get(url);
          const data=response.data;
          const hourlyForecast = data.forecast.forecastday[0].hour.map((hour: any) => ({
            currentTime: hour.time,
            currentTemp: hour.temp_c,
            currentIcon: hour.condition.icon,
          }));
          setHourlyData(hourlyForecast);
        } catch (error) {
          console.error("Error fetching weather data:", error);
          throw error; 
        }
      };

     

    const fetchFiveDays= async (lat: number | null, lon: number | null, searchCity: string | null) => {
        try {
            let url = `${api_Endpoint}forecast.json?key=${api_key}&days=5`;

            if (searchCity)
            {
                url+=`&q=${searchCity}`;
            }
            else if (lat !== null && lon !== null) {
                url += `&q=${lat},${lon}`;
              }
          const response = await axios.get(url);
          const forecast=response.data;
          const dailyForecast = forecast.forecast.forecastday.map((day: any) => ({
            date: day.date,
            avgTemp: day.day.avgtemp_c,
            conditionIcon: day.day.condition.icon,
          }));
          setDailyData(dailyForecast);
        } catch (error) {
          console.error("Error fetching weather data:", error);
          throw error; 
        }
    };
    
    return {weatherData,suggestions,hourlyData,dailyData,setSuggestions,fetchWeatherData ,fetchHourlyWeather,fetchCitySuggestions,fetchFiveDays};
}

export default useWeatherApi


