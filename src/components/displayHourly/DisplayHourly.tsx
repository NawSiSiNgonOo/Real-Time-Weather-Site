import './displayHourly.css'
import { TbClockHour2Filled } from "react-icons/tb";
import { MdOutlineDateRange } from "react-icons/md";
// import axios from 'axios';
import { useEffect } from 'react';
import moment from 'moment';
import useWeatherApi from '../../hooks/useWeatherApi';

const DisplayHourly = ({city}:any) => {

    // const api_key="44da2cd4399c4e18b71102445240212";
    // const api_Endpoint="https://api.weatherapi.com/v1/";

    // interface HourlyData{
    //     currentTime:string,
    //     currentTemp:number,
    //     currentIcon:string,
    // }

    // interface DailyData{
    //     date:string,
    //     avgTemp:number,
    //     conditionIcon:string,
    // }


    // const [hourlyData,setHourlyData]=useState<HourlyData []>([]);
    // const [dailyData,setDailyData]=useState<DailyData []>([]);

    const {hourlyData,dailyData,fetchHourlyWeather,fetchFiveDays}=useWeatherApi();

    // const fetchHourlyWeather = async (lat: number | null, lon: number | null, searchCity: string | null) => {
    //     try {
    //         let url = `${api_Endpoint}forecast.json?key=${api_key}`;

    //         if (searchCity)
    //         {
    //             url+=`&q=${searchCity}`;
    //         }
    //         else if (lat !== null && lon !== null) {
    //             url += `&q=${lat},${lon}`;
    //           }
    //       const response = await axios.get(url);
    //       return response.data;
    //     } catch (error) {
    //       console.error("Error fetching weather data:", error);
    //       throw error; 
    //     }
    //   };

    // const fetchFiveDays= async (lat: number | null, lon: number | null, searchCity: string | null) => {
    //     try {
    //         let url = `${api_Endpoint}forecast.json?key=${api_key}&days=5`;

    //         if (searchCity)
    //         {
    //             url+=`&q=${searchCity}`;
    //         }
    //         else if (lat !== null && lon !== null) {
    //             url += `&q=${lat},${lon}`;
    //           }
    //       const response = await axios.get(url);
    //       return response.data;
    //     } catch (error) {
    //       console.error("Error fetching weather data:", error);
    //       throw error; 
    //     }
    //   };

    useEffect(() => {
        const fetchData = async () => {
          if (city) {
            
            try {
              await fetchHourlyWeather(null, null, city);
              await fetchFiveDays(null, null,city);
              
              // const hourlyForecast = data.forecast.forecastday[0].hour.map((hour: any) => ({
              //   currentTime: hour.time,
              //   currentTemp: hour.temp_c,
              //   currentIcon: hour.condition.icon,
              // }));
    
              // const dailyForecast = forecast.forecast.forecastday.map((day: any) => ({
              //   date: day.date,
              //   avgTemp: day.day.avgtemp_c,
              //   conditionIcon: day.day.condition.icon,
              // }));
    
              // setHourlyData(hourlyForecast);
              // setDailyData(dailyForecast);
            } catch (error) {
              console.error("Error fetching weather data for city:", error);
            }
          } else { 
            navigator.geolocation.getCurrentPosition(
              async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                  await fetchHourlyWeather(latitude, longitude, null);
                  await fetchFiveDays(latitude, longitude,null);
    
                  // const hourlyForecast = data.forecast.forecastday[0].hour.map((hour: any) => ({
                  //   currentTime: hour.time,
                  //   currentTemp: hour.temp_c,
                  //   currentIcon: hour.condition.icon,
                  // }));
    
                  // const dailyForecast = forecast.forecast.forecastday.map((day: any) => ({
                  //   date: day.date,
                  //   avgTemp: day.day.avgtemp_c,
                  //   conditionIcon: day.day.condition.icon,
                  // }));
    
                  // setHourlyData(hourlyForecast);
                  // setDailyData(dailyForecast);
                } catch (error) {
                  console.error("Error fetching weather data from geolocation:", error);
                }
              },
              (error) => {
                console.error("Geolocation error:", error);
              }
            );
          }
        };
    
        fetchData();
      }, [city]);  

  return (
    <div className="displayHourlyContainer">
        <div className="hourlyContainer">
            <div className="title">
                <TbClockHour2Filled/>
                <p>Hourly forecast</p>
            </div>
            <div className="hourly">
                {hourlyData.map((hour,index)=>(
                    <div className='hourlyInfo' key={index}>
                    <p className='textSmall'>{moment(hour.currentTime).format('h:mm A')}</p>
                    <p>{hour.currentTemp}&deg;C</p>
                    <img src={hour.currentIcon} alt="" />
                </div>
                ))}    
            </div>
        </div>

        <div className="dailyContainer">
            <div className="title">
                <MdOutlineDateRange />
                <p>Upcoming days</p>
            </div>
            <div className="daily">
                {
                    dailyData.map((day,index)=>(
                        <div className='dailyInfo' key={index}>
                        <p>{moment(day.date).format('dddd')}</p>
                        <p className='textSmall'>{moment(day.date).format("MMM Do")}</p>
                        <p>{day.avgTemp}&deg;C</p>
                        <img src={day.conditionIcon} alt="" />
                    </div>
                    ))
                }
                
                
            </div>
        </div>
    </div>
  )
}

export default DisplayHourly
