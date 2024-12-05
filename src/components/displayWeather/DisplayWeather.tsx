import { IoLocation } from "react-icons/io5"
import './displayWeather.css'
// import axios from "axios";
import { ChangeEvent, useEffect, useState ,useRef } from "react";
import moment from "moment";
import getWeatherMessage from "./WeatherMessage";
import { FormEvent } from "react";
import useWeatherApi from '../../hooks/useWeatherApi'


const DisplayWeather = ({setCity}:any) => {

    // const api_key="44da2cd4399c4e18b71102445240212";
    // const api_Endpoint="https://api.weatherapi.com/v1/";


    // interface WeatherData{
    //     locationName:string;
    //     country:string;
    //     temperature:number;
    //     conditionText:string;
    //     conditionIcon:string;
    //     windSpeed:number;
    //     humidity:number;
    //     localTime:string;
    //     weatherCode:number;
    //     isDay:boolean | number;

    // }

    const {weatherData,suggestions,fetchWeatherData,setSuggestions,fetchCitySuggestions}=useWeatherApi();

    // const [weatherData,setWeatherData]=useState<WeatherData|null>(null);
    const [loading,setLoading]=useState(false);
    const [searchCity,setSearchCity]=useState("");

    // const [suggestions,setSuggestions]=useState([]);
    const inputRef = useRef<HTMLInputElement | null>(null);

    // const fetchWeatherData=async(lat:number | null, lon:number | null, city:string | null)=>{
    //     try{
    //       let url = `${api_Endpoint}forecast.json?key=${api_key}`;
    //       if (city)
    //         {
    //           url+=`&q=${city}`;
    //         }
    //       else if (lat !== null && lon !== null) {
    //           url += `&q=${lat},${lon}`;
    //         }
    //       const response=await axios.get(url);
    //       return response.data;
    //     }
    //     catch (error)
    //     {
    //         console.error("Error fetching weather data:",error);
    //         throw error;
    //     }
    // };

    const handleSearch=async(e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setSearchCity(searchCity);
        setCity(searchCity);
        await fetchWeatherData(null, null,searchCity);
        // setWeatherData({
        //     locationName: data.location.name,
        //     country: data.location.country,
        //     temperature: data.current.temp_c,
        //     conditionText: data.current.condition.text,
        //     conditionIcon: data.current.condition.icon,
        //     windSpeed: data.current.wind_kph,
        //     humidity: data.current.humidity,
        //     localTime:data.location.localtime,
        //     weatherCode:data.current.condition.code,
        //     isDay:data.current.is_Day,
        //   });
        setSearchCity("");
        setSuggestions([]);
    }
      

      useEffect(() => {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                setLoading(true);
              await fetchWeatherData(latitude, longitude,null);
              // setWeatherData({
              //   locationName: data.location.name,
              //   country: data.location.country,
              //   temperature: data.current.temp_c,
              //   conditionText: data.current.condition.text,
              //   conditionIcon: data.current.condition.icon,
              //   windSpeed: data.current.wind_kph,
              //   humidity: data.current.humidity,
              //   localTime:data.location.localtime,
              //   weatherCode:data.current.condition.code,
              //   isDay:data.current.is_Day,
              // });
             setLoading(false); 
            } catch (error) {
              console.error("Error fetching weather data:", error);
            }
          },
          (error) => {
            console.error("Geolocation error:", error);
          }
        );
      }, []);

    // const fetchCitySuggestions=async(value:string)=>{
    //   if(!value)
    //   {
    //     setSuggestions([]);
    //     return;
    //   }

    //   try {
    //     const url = `${api_Endpoint}search.json?key=${api_key}&q=${value}`;
    //     const response = await axios.get(url);
    //     const cities = response.data.map((city: any) => city.name);
    //     setSuggestions(cities);
    //   }
    //   catch (error) {
    //     console.error("Error fetching weather data:", error);
    //     setSuggestions([]);
    //   }

    // }

    const handleInputChange=(e : ChangeEvent<HTMLInputElement>)=>{
      let value=e.target.value;
      setSearchCity(e.target.value);
      if(value.length>2)
      {
        fetchCitySuggestions(value);
      }
      else{
        setSuggestions([]);
      }
    }       
    
    const handleSuggestionClick=(city:string)=>{
      setSearchCity(city);
      setSuggestions([]);
      inputRef.current?.focus(); 
    }
      

  return (
    <div className="displayWeatherContainer">
        <div className="searchLocation">
            <IoLocation className="IoLocation"/>
            <form action="" onSubmit={handleSearch}>
                <input type="text" className="searchLocationInput" placeholder="Search Location ..." value={searchCity} onChange={handleInputChange}  ref={inputRef}/>
            </form>
            
        </div>
        {suggestions && suggestions.length>0 && (
              <div>
                <ul className="suggestions-dropdown">
                  {suggestions.map((city, index) => (
                  <li key={index} className="suggestion-item" onClick={()=>handleSuggestionClick(city)}>{city}</li>))}
                </ul>
              </div>
            )}
        {loading && <div className="weatherInfo"><div className="loader"></div></div>}
        {weatherData && <div className="displayWeatherInfo">
            <div className="weatherInfo">
                <h1>{weatherData.locationName}</h1>
                <p>{weatherData.temperature}&deg;C</p>
                <img src={weatherData.conditionIcon} alt="" />
                <h2>{weatherData.conditionText}</h2>
                <p className="textStyle">{getWeatherMessage(weatherData.weatherCode,weatherData.temperature)}</p>
            </div>
            <div className="weatherDateTime">
                <p>{moment(weatherData.localTime).format("MMM Do YY")}</p>
                <p>{moment(weatherData.localTime).format('dddd')} | {moment(weatherData.localTime).format("h:mm A")}</p>
                <p>{weatherData.country}</p>
            </div>
        </div>}
    </div>
  )
}

export default DisplayWeather
