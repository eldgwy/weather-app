interface types {
  weekDays: string[] | null,
  minmax: {
    min: number[]  | null,
    max: number[] | null,
  }
  imageWeather: string[]
}

const DailyForecast = ({weekDays, minmax, imageWeather} : types) => {
  return (
    <>
      <h2 className="font-bold">Daily forecast</h2>
      <div className="flex gap-2 my-4 flex-wrap items-start md:flex-nowrap">
        {Array.from({ length: 7 }).map((_, i: number) => (
          <div key={i} className="flex flex-col items-center sm:flex-1/8 flex-1/4 gap-8 p-4 rounded-md bg-background border relative min-h-40">
            <p className="text-white/70 text-center">
              {weekDays && new Date(weekDays[i]).toLocaleDateString('US-en', {weekday: 'short'})}
            </p>
            {minmax.min && <img src={imageWeather[Math.round(Math.random() * 7)]} alt="imageWeather" className="size-10" />}
              <span className="absolute text-sm font-bold bottom-2 left-1">{minmax.max ? minmax.max[i] + "°" : ''}</span>
              <span className="absolute text-sm bottom-2 right-1">{minmax.min ? minmax.min[i] + "°" : ''}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default DailyForecast;
