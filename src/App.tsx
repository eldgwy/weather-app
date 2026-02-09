import './App.css';
import { useEffect, useState } from 'react';
import { CurrentWeather, DailyForecast, Header, HourlyForecast, Navbar, ThemeProvider } from './components';
import { drizzle, fog, overcast, partCloud, rain, snow, storm, sunny } from './assets/images';


const API_TOKEN = import.meta.env.VITE_API_TOKEN;


const BASE_URL = 'https://api.open-meteo.com/v1/forecast'; 
const buildURL = (params: Record<string, string | number>) => {
  const query = new URLSearchParams(params as any).toString();
  return `${BASE_URL}?${query}`;
};


function App() {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [temperature, setTemperature] = useState("celsius");
  const [wind, setWind] = useState("kmh");
  const [precipitation, setPrecipitation] = useState("mm");
  const [current, setCurrent] = useState(null);
  const [minmax, setMinmax] = useState({
    min: null,
    max: null
  });
  const [weekDay, setWeekDay] = useState(new Date().toISOString().split("T")[0]);
  const [weekDays, setWeekDays] = useState(null);
  const [tempDay, setTempDay] = useState({
    times: [],
    temp: []
  });
  const imageWeather = [sunny, snow, storm, drizzle, overcast, partCloud, rain, fog];
  
  
  useEffect(() => {
    const getWeather = async () => {
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`);
      const geoJson = await geoRes.json();
      const loc = geoJson.results?.[0];
      if (!loc) return;

      const url = buildURL({
        latitude: loc.latitude,
        longitude: loc.longitude,
        current: "temperature_2m,apparent_temperature,precipitation,wind_speed_10m,relative_humidity_2m",
        timezone: 'auto',
        temperature_unit: temperature,
        wind_speed_unit: wind,
        precipitation_unit: precipitation,
        start_date: weekDay,
        end_date: weekDay,
        hourly: "temperature_2m,wind_speed_10m",
      })

      const urlToWeek = buildURL({
        latitude: loc.latitude,
        longitude: loc.longitude,
        temperature_unit: temperature,
        wind_speed_unit: wind,
        precipitation_unit: precipitation,
        daily: 'temperature_2m_max,temperature_2m_min',
        forecast_days: 7
      })

      const weatherRes = await fetch(url);
      const weekRes = await fetch(urlToWeek);

      const weatherJson = await weatherRes.json();
      const weekJson = await weekRes.json();

      setCurrent(weatherJson.current);
      setMinmax({
        min: weekJson.daily.temperature_2m_min,
        max: weekJson.daily.temperature_2m_max,
      });
      setWeekDays(weekJson.daily.time);
      setTempDay({
        times: weatherJson.hourly.time,
        temp: weatherJson.hourly.temperature_2m,
      })

    }

    getWeather();

  }, [city, temperature, wind, precipitation, weekDay]);



  useEffect(() => {
    const getIPLocation = async () => {
      const res = await fetch(`https://ipinfo.io/json?token=${API_TOKEN}`);
      const data = await res.json();
      setCity(data.city)
    };
    getIPLocation();
  }, []);


  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <div className='app'>
        <Navbar temperature={temperature} setTemperature={setTemperature} wind={wind} setWind={setWind} precipitation={precipitation} setPrecipitation={setPrecipitation} />
        <Header setCity={setCity} setCountry={setCountry} city={city} />
        
        <section className='flex md:flex-row flex-col justify-between items-stretch mt-8 gap-8'>
          <div className="flex-2/3">
            <CurrentWeather current={current} imageWeather={imageWeather[0]} city={city} country={country} wind={wind} precipitation={precipitation} />
            <DailyForecast weekDays={weekDays} minmax={minmax} imageWeather={imageWeather} />
          </div>
          <div className="flex-1/3 mb-2">
            <HourlyForecast weekDay={weekDay} setWeekDay={setWeekDay} weekDays={weekDays} tempDay={tempDay} imageWeather={imageWeather} />
          </div>
        </section>
      </div>
    </ThemeProvider>
  );
}

export default App;


