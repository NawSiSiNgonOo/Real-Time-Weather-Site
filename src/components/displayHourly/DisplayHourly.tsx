import "./displayHourly.css";
import { TbClockHour2Filled } from "react-icons/tb";
import { MdOutlineDateRange } from "react-icons/md";
import { useEffect } from "react";
import moment from "moment";
import useWeatherApi from "../../hooks/useWeatherApi";
import { getFetchError } from "../../constants/errorMessage";
import useLocation from "../../hooks/useLocation";

const DisplayHourly = ({ city }: { city: string }) => {
  const { hourlyData, dailyData, fetchHourlyWeather, fetchFiveDays } =
    useWeatherApi();
  const { location } = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      if (city) {
        try {
          await fetchHourlyWeather(null, null, city);
          await fetchFiveDays(null, null, city);
        } catch (error) {
          getFetchError(error);
        }
      } else {
        if (location) {
          try {
            await fetchHourlyWeather(
              location.latitude,
              location.longitude,
              null
            );
            await fetchFiveDays(location.latitude, location.longitude, null);
          } catch (error) {
            getFetchError(error);
          }
        }
      }
    };
    fetchData();
  }, [city, fetchFiveDays, fetchHourlyWeather, location]);

  return (
    <div className="displayHourlyContainer">
      <div className="hourlyContainer">
        <div className="title">
          <TbClockHour2Filled />
          <p>Hourly forecast</p>
        </div>
        <div className="hourly">
          {hourlyData.map((hour, index) => (
            <div className="hourlyInfo" key={index}>
              <p className="textSmall">{moment(hour.time).format("h:mm A")}</p>
              <p>{hour.temp_c}&deg;C</p>
              <img src={hour.condition.icon} alt="" />
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
          {dailyData.map((day, index) => (
            <div className="dailyInfo" key={index}>
              <p>{moment(day.date).format("dddd")}</p>
              <p className="textSmall">{moment(day.date).format("MMM Do")}</p>
              <p>{day.day.avgtemp_c}&deg;C</p>
              <img src={day.day.condition.icon} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayHourly;
