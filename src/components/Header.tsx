import React, { useEffect, useRef, useState } from "react";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Button } from "./ui/button";
import { error, retry } from "../assets/images";


interface types {
  setCity: React.Dispatch<React.SetStateAction<string>>,
  setCountry: React.Dispatch<React.SetStateAction<string>>,
  city: string,
}

const API_key = import.meta.env.VITE_API_KEY;

const Header = ({setCity, setCountry, city}: types) => {
  const [allCountries, setAllCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [URL, setURL] = useState("https://api.countrystatecity.in/v1/countries");
  const [isFocus, setIsFocus] = useState(false);
  const [isFetch, setIsFetch] = useState(false);
  const [isFound, setIsFound] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);


  
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          URL,
          {
            headers: { "X-CSCAPI-KEY": API_key },
          }
        );

        const countries = await response.json();
        
          setIsFetch(true);
          setAllCountries(countries);
      } catch {
        setIsFetch(false);
      }
    };

    fetchCountries();

  }, [URL]);

  useEffect(() => {
    inputRef.current?.value === "" ? setIsFocus(false) : setIsFocus(true);
    setIsFound(false);
  }, [inputRef.current?.value, isFetch]);

  useEffect(() => {
    addEventListener('click', () => {
      setIsFocus(false);
    })
  }, [])


    useEffect(() => {
      const item = allCountries.find(it => city === it['capital']);
      setCountry(item ? item['name'] : "");
    }, [city])

  return (
    <header className="flex flex-col w-full items-center justify-center gap-8">
      {isFetch ? (
        <>
          <h2 className="text-3xl font-extrabold text-center">How's the sky looking today?</h2>

          <div className="flex flex-col sm:flex-row sm:items-start justify-center gap-4">
            <Command className="max-w-md lg:w-sm rounded-lg border">
              <CommandInput placeholder="Type a command or search..." ref={inputRef} value={search} onValueChange={setSearch} />
              {isFound ? (
                <>
                  <h2 className="mt-2 text-2xl font-extrabold text-center">No search result found!</h2>
                </>
              ) : (
                <CommandList>
                  {isFocus && (
                    <>
                      {allCountries.map((country) => (
                          <CommandItem key={country['id']} value={country['capital']} onSelect={(value) => {
                            setSearch(value)
                            setIsFocus(false);
                          }} className="cursor-pointer">
                            <span>{country['capital']}</span>
                          </CommandItem>
                        ))
                      }
                          
                      <button className="absolute bg-transparent z-20 top-0 right-2 cursor-pointer h-0" onClick={() => setIsFocus(false)}
                      >x</button>
                    </>
                    )
                    }
              </CommandList>
              )}
            </Command>
            <Button className="search-btn"
              onClick={() => {
              const item = allCountries.find(it => inputRef.current?.value === it['capital']);
              setCity(item ? item['capital'] : city);
              setIsFound(!(allCountries.some(it => (inputRef.current?.value === it['capital'] && it['capital'] !== ''))));
              setIsFocus(false);
            }}>Search</Button>
          </div>
        </>
      ) : (
          <>
            <img src={error} alt="Error" className="size-10" />
            <h2 className="text-3xl font-extrabold text-center">
              Something Went Wrong
            </h2>
            <p className="w-sm text-center">We couldn't connect to the server (API error). Please try again in a few moments.</p>
            <Button onClick={() => setURL("https://api.countrystatecity.in/v1/countries")}>
              <img src={retry} alt="Retry" /> Retry
            </Button>
          </>
      )}
    </header>
  );
};

export default Header;

