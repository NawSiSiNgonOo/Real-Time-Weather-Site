const getWeatherMessage = (weatherCode: number, temperature: number): string => {
  switch (weatherCode) {
    case 1000: // Sunny
      return `Today, expect a sunny day with temperatures reaching a maximum of ${temperature}°C. Don’t forget your sunglasses!`;
    case 1003: // Partly cloudy
      return `Today, expect a partly cloudy day with temperatures reaching a maximum of ${temperature}°C. It might be a good idea to wear a light jacket.`;
    case 1006: // Cloudy
      return `Today, expect a cloudy day with temperatures reaching a maximum of ${temperature}°C. A perfect day for indoor activities.`;
    case 1009: // Overcast
      return `Today, expect an overcast day with temperatures reaching a maximum of ${temperature}°C. It might be a bit chilly, so bring a sweater.`;
    case 1030: // Mist
      return `Today, expect misty weather with temperatures reaching a maximum of ${temperature}°C. Drive safely and take care!`;
    case 1063: // Patchy rain possible
      return `Today, expect patchy rain with temperatures reaching a maximum of ${temperature}°C. Carry an umbrella in case the rain hits!`;
    case 1066: // Patchy snow possible
      return `Today, expect patchy snow with temperatures reaching a maximum of ${temperature}°C. If you're heading out, wear warm clothes and be careful on the roads.`;
    case 1069: // Patchy sleet possible
      return `Today, expect patchy sleet with temperatures reaching a maximum of ${temperature}°C. Dress warmly and be cautious when driving.`;
    case 1072: // Patchy freezing drizzle possible
      return `Today, expect patchy freezing drizzle with temperatures reaching a maximum of ${temperature}°C. Stay warm and be careful on slippery surfaces.`;
    case 1087: // Thundery outbreaks possible
      return `Today, expect thunderstorms with temperatures reaching a maximum of ${temperature}°C. Make sure to stay indoors when lightning strikes!`;
    case 1114: // Blowing snow
      return `Today, expect blowing snow with temperatures reaching a maximum of ${temperature}°C. Be cautious when traveling and bundle up!`;
    case 1117: // Blizzard
      return `Today, expect a blizzard with temperatures reaching a maximum of ${temperature}°C. Avoid travel if possible and stay warm!`;
    case 1135: // Fog
      return `Today, expect dense fog with temperatures reaching a maximum of ${temperature}°C. Slow down and stay safe on the roads!`;
    case 1147: // Freezing fog
      return `Today, expect freezing fog with temperatures reaching a maximum of ${temperature}°C. Take extra care on the roads!`;
    case 1150: // Patchy light drizzle
      return `Today, expect light drizzle with temperatures reaching a maximum of ${temperature}°C. Carry an umbrella to stay dry!`;
    case 1153: // Light drizzle
      return `Today, expect light drizzle with temperatures reaching a maximum of ${temperature}°C. A great day for indoor activities!`;
    case 1168: // Freezing drizzle
      return `Today, expect freezing drizzle with temperatures reaching a maximum of ${temperature}°C. Dress warmly and be cautious when walking on slippery surfaces.`;
    case 1171: // Heavy freezing drizzle
      return `Today, expect heavy freezing drizzle with temperatures reaching a maximum of ${temperature}°C. Be very careful outdoors!`;
    case 1180: // Patchy light rain
      return `Today, expect light rain with temperatures reaching a maximum of ${temperature}°C. Don’t forget your umbrella!`;
    case 1183: // Light rain
      return `Today, expect light rain with temperatures reaching a maximum of ${temperature}°C. Stay dry with an umbrella!`;
    case 1186: // Moderate rain at times
      return `Today, expect moderate rain at times with temperatures reaching a maximum of ${temperature}°C. Keep your raincoat handy!`;
    case 1189: // Moderate rain
      return `Today, expect moderate rain with temperatures reaching a maximum of ${temperature}°C. It’s a good day for staying inside with a hot drink!`;
    case 1192: // Heavy rain at times
      return `Today, expect heavy rain at times with temperatures reaching a maximum of ${temperature}°C. Make sure to take cover when it pours!`;
    case 1195: // Heavy rain
      return `Today, expect heavy rain with temperatures reaching a maximum of ${temperature}°C. Keep an umbrella close, and stay dry!`;
    case 1198: // Light freezing rain
      return `Today, expect light freezing rain with temperatures reaching a maximum of ${temperature}°C. Be careful when driving on icy roads!`;
    case 1201: // Moderate or heavy freezing rain
      return `Today, expect moderate to heavy freezing rain with temperatures reaching a maximum of ${temperature}°C. Stay indoors if possible, and drive carefully!`;
    case 1204: // Light sleet
      return `Today, expect light sleet with temperatures reaching a maximum of ${temperature}°C. Be careful on roads as they might be slippery!`;
    case 1207: // Moderate or heavy sleet
      return `Today, expect moderate or heavy sleet with temperatures reaching a maximum of ${temperature}°C. Stay warm and stay safe when traveling!`;
    case 1210: // Patchy light snow
      return `Today, expect light snow with temperatures reaching a maximum of ${temperature}°C. Dress warmly and be careful on the roads!`;
    case 1213: // Light snow
      return `Today, expect light snow with temperatures reaching a maximum of ${temperature}°C. Perfect for a winter walk if you’re dressed for it!`;
    case 1216: // Patchy moderate snow
      return `Today, expect moderate snow with temperatures reaching a maximum of ${temperature}°C. Keep your coat and gloves on, and be prepared for snow!`;
    case 1219: // Moderate snow
      return `Today, expect moderate snow with temperatures reaching a maximum of ${temperature}°C. Snowy days ahead, so make sure you’re bundled up!`;
    case 1222: // Patchy heavy snow
      return `Today, expect heavy snow with temperatures reaching a maximum of ${temperature}°C. Travel might be difficult, so take extra care!`;
    case 1225: // Heavy snow
      return `Today, expect heavy snow with temperatures reaching a maximum of ${temperature}°C. Keep warm and stay safe!`;
    case 1237: // Ice pellets
      return `Today, expect ice pellets with temperatures reaching a maximum of ${temperature}°C. Watch out for slippery surfaces!`;
    case 1240: // Light rain shower
      return `Today, expect light rain showers with temperatures reaching a maximum of ${temperature}°C. Bring an umbrella just in case!`;
    case 1243: // Moderate or heavy rain shower
      return `Today, expect moderate to heavy rain showers with temperatures reaching a maximum of ${temperature}°C. Keep your rain gear ready!`;
    case 1246: // Torrential rain shower
      return `Today, expect torrential rain showers with temperatures reaching a maximum of ${temperature}°C. Be prepared for heavy rain!`;
    case 1249: // Light sleet showers
      return `Today, expect light sleet showers with temperatures reaching a maximum of ${temperature}°C. Be careful on the roads!`;
    case 1252: // Moderate or heavy sleet showers
      return `Today, expect moderate to heavy sleet showers with temperatures reaching a maximum of ${temperature}°C. Stay warm and stay safe!`;
    case 1255: // Light snow showers
      return `Today, expect light snow showers with temperatures reaching a maximum of ${temperature}°C. Snow may accumulate, so be cautious!`;
    case 1258: // Moderate or heavy snow showers
      return `Today, expect moderate to heavy snow showers with temperatures reaching a maximum of ${temperature}°C. Be careful when driving!`;
    case 1261: // Light showers of ice pellets
      return `Today, expect light showers of ice pellets with temperatures reaching a maximum of ${temperature}°C. Watch for icy conditions!`;
    case 1264: // Moderate or heavy showers of ice pellets
      return `Today, expect moderate to heavy showers of ice pellets with temperatures reaching a maximum of ${temperature}°C. Be cautious on the roads!`;
    case 1273: // Patchy light rain with thunder
      return `Today, expect light rain with thunder with temperatures reaching a maximum of ${temperature}°C. Stay indoors if possible during thunderstorms!`;
    case 1276: // Moderate or heavy rain with thunder
      return `Today, expect moderate to heavy rain with thunder with temperatures reaching a maximum of ${temperature}°C. Keep your umbrella ready and avoid open areas!`;
    case 1279: // Patchy light snow with thunder
      return `Today, expect light snow with thunder with temperatures reaching a maximum of ${temperature}°C. Stay indoors and keep warm!`;
    case 1282: // Moderate or heavy snow with thunder
      return `Today, expect moderate to heavy snow with thunder with temperatures reaching a maximum of ${temperature}°C. Be extra cautious during storms!`;
    default:
      return `The weather is looking good today, with comfortable temperatures around ${temperature}°C. Have a great day!`;
  }
};

export default getWeatherMessage