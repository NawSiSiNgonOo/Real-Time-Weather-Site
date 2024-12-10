interface WeatherData {
  locationName: string;
  country: string;
  temperature: number;
  conditionText: string;
  conditionIcon: string;
  windSpeed: number;
  humidity: number;
  localTime: string;
  weatherCode: number;
  isDay: boolean | number;
}

interface HourlyData {
  time: string;
  temp_c: number;
  condition: {
    icon: string;
  };
}

interface DailyData {
  date: string;
  day: {
    avgtemp_c: number;
    condition: {
      icon: string;
    };
  };
}

interface City {
  name: string;
}

interface Location {
  latitude: number;
  longitude: number;
}

export type { WeatherData, HourlyData, DailyData, City, Location };
