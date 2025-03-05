"use client";

import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { useFlightContext } from "@/contexts/FlightContext";

interface City {
  code: string;
  name: string;
}

interface SearchableSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type: "origin" | "destination";
  error?: string;
}

export default function SearchableSelect({
  value,
  onChange,
  placeholder,
  type,
  error,
}: SearchableSelectProps) {
  const { originCities, destinationCities } = useFlightContext();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const cities = type === "origin" ? originCities : destinationCities;

  // Handle outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Set selected city name when value changes
  useEffect(() => {
    if (value && cities.length > 0) {
      const city = cities.find((city) => city.code === value);
      if (city) {
        setSelectedCity(city);
        setSearchTerm(city.name);
      }
    } else if (!value) {
      setSelectedCity(null);
      setSearchTerm("");
    }
  }, [value, cities]);

  // add default value for origin and destination
  useEffect(() => {
    if (type === "origin" && !value && originCities[0]) {
      setSelectedCity(originCities[0]);
      setSearchTerm(originCities[0].name);
      onChange(originCities[0].code);
    } else if (type === "destination" && !value && destinationCities[0]) {
      setSelectedCity(destinationCities[1]);
      setSearchTerm(destinationCities[1].name);
      onChange(destinationCities[1].code);
    }
  }, [originCities, destinationCities]);

  const filteredCities = cities.filter(
    (city) =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (city: City) => {
    setSelectedCity(city);
    setSearchTerm(city.name);
    onChange(city.code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (!isOpen) setIsOpen(true);
            if (selectedCity && e.target.value !== selectedCity.name) {
              setSelectedCity(null);
              onChange("");
            }
          }}
          placeholder={placeholder}
          className="w-full p-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onFocus={() => setIsOpen(true)}
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={16}
        />
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <div
                key={city.code}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(city)}
              >
                <div className="font-medium">{city.name}</div>
                <div className="text-sm text-gray-500">{city.code}</div>
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No cities found</div>
          )}
        </div>
      )}
    </div>
  );
}
