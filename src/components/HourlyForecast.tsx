import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { ScrollArea } from "./ui/scroll-area"
import { ChevronDown } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

interface types {
  weekDay: string,
  setWeekDay: Dispatch<SetStateAction<string>>,
  weekDays: null | string[],
  tempDay: {
    times: string[];
    temp: number[];
  },
  imageWeather: string[]
}

const HourlyForecast = ({ weekDay, setWeekDay, weekDays, tempDay, imageWeather }: types) => {
  const day = weekDay ? new Date(weekDay).toLocaleString('US-en', {weekday: 'long'}) : "__"


  return (
    <div className="bg-background p-4 rounded-md">
      <div className="flex justify-between items-center">
        <h2 className='font-bold'>Hourly forecast</h2>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className='bg-white/10 hover:bg-white/10'>{ day } <ChevronDown /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuRadioGroup value={weekDay} onValueChange={setWeekDay}>
                  {weekDays && weekDays.map(item => (
                    <DropdownMenuRadioItem key={item} value={item}>
                      {new Date(item).toLocaleString('US-en', {weekday: 'long'})}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="mt-2">
        <ScrollArea className='w-full h-115'>
          {Array.from({ length: 24 }).map((_, i: number) => (
            <div key={i} className="flex justify-between px-2 py-3 border my-2 rounded-md bg-white/5 hover:bg-white/5 min-h-12">
              <span className='font-bold flex items-center gap-1.5'>
                {tempDay.times.length !== 0 && <img src={imageWeather[Math.round(Math.random() * 7)]} alt="imageWeather" className="size-8" />}
                {tempDay.times.length !== 0 ? new Date(tempDay.times[i]).toLocaleTimeString('US-en', { hour: 'numeric', hour12: true }) : "  "}
              </span>
              <span className='text-sm'>{ tempDay.temp.length !== 0 ? tempDay.temp[i] + '°' : "  " }</span>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};

export default HourlyForecast;
