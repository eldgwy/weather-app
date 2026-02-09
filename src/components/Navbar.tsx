import { logo } from "../assets/images";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown, SettingsIcon } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";


interface units {
  temperature: string,
  wind: string,
  precipitation: string,
  setTemperature: Dispatch<SetStateAction<string>>,
  setWind: Dispatch<SetStateAction<string>>,
  setPrecipitation: Dispatch<SetStateAction<string>>,
}


const Navbar = ({temperature, wind, precipitation, setTemperature, setWind, setPrecipitation}: units) => {

  const [isImperial, setIsImperial] = useState(false);

  return (
    <nav className="flex py-8 justify-between">
      <img src={logo} alt="Logo" />
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              <SettingsIcon /> Units <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-36">
            <DropdownMenuCheckboxItem className="hover:border border-solid border-white" checked={isImperial} onCheckedChange={() => {
              setIsImperial(prev => !prev);
              (!isImperial ? setTemperature("fahrenheit") : setTemperature("celsius"));
              (!isImperial ? setWind("mph") : setWind("kmh"));
              (!isImperial ? setPrecipitation("inch") : setPrecipitation("mm"));
            }}>Imperial</DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>Temperature</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={temperature} onValueChange={setTemperature}>
                <DropdownMenuRadioItem value="celsius">{ "Celsius (°C)" }</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="fahrenheit">{ "Fahrenheit (°F)" }</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Wind Speed</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={wind} onValueChange={setWind}>
                <DropdownMenuRadioItem value="kmh">km/h</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="mph">mph</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Precipitation</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={precipitation} onValueChange={setPrecipitation}>
                <DropdownMenuRadioItem value="mm">Millimeters</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="inch">Inches</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;


