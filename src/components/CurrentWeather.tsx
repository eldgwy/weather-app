interface types {
  current:  any,
  imageWeather: string,
  city: string,
  country: string,
  wind: string,
  precipitation: string
}

const CurrentWeather = ({ current, imageWeather, city, country, wind, precipitation }: types) => {
  const date = current ? new Date(current.time.split("T")[0]).toLocaleString('US-en', { dateStyle: 'full' }) : "___, __ ___, ____";
  return (
    <>
      <div className="current-weather">
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-extrabold">
            {city ? city : '___'}, {country !== "" ? country : '___'}
          </h2>
          <p className="text-white/70">
            {date}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <img src={imageWeather} alt="Weather Image" className='size-15 sm:size-20' />
          {<span className='text-5xl sm:text-6xl font-bold'>{current ? current.temperature_2m : '___'}°</span>}
        </div>
      </div>
      <div className="flex gap-4 my-4 flex-wrap sm:flex-nowrap">
        <div className="flex flex-col sm:flex-1/4 flex-1/3 gap-4 p-4 rounded-md bg-background border">
          <p className="text-white/70">Feels Like</p>
          <span className="text-3xl">{current ? current.apparent_temperature : '___'}°</span>
        </div>
        <div className="flex flex-col sm:flex-1/4 flex-1/3 gap-4 p-4 rounded-md bg-background border">
          <p className="text-white/70">Humidity</p>
          <span className="text-3xl">{current ? current.relative_humidity_2m : '___'}%</span>
        </div>
        <div className="flex flex-col sm:flex-1/4 flex-1/3 gap-4 p-4 rounded-md bg-background border">
          <p className="text-white/70">Wind</p>
          <span className="text-3xl">{current ? current.wind_speed_10m : '___'} {wind === 'kmh' ? 'km/h' : wind}</span>
        </div>
        <div className="flex flex-col sm:flex-1/4 flex-1/3 gap-4 p-4 rounded-md bg-background border">
          <p className="text-white/70">Precipitation</p>
          <span className="text-3xl">{current ? current.precipitation : '___'} { precipitation }</span>
        </div>
      </div>
    </>
  );
};

export default CurrentWeather;
