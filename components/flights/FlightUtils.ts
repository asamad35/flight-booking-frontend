import { Flight } from "@/types/flight";

export const generateFlights = (
  from: string,
  to: string,
  date: string,
  count = 10
): Flight[] => {
  const airlines = [
    { name: "Delta", logo: "https://placehold.co/30x30?text=DL" },
    { name: "United", logo: "https://placehold.co/30x30?text=UA" },
    { name: "American", logo: "https://placehold.co/30x30?text=AA" },
    { name: "Spirit", logo: "https://placehold.co/30x30?text=NK" },
    { name: "JetBlue", logo: "https://placehold.co/30x30?text=B6" },
  ];

  const stopLocations = [
    "ATL",
    "ORD",
    "DFW",
    "DEN",
    "LAX",
    "JFK",
    "MIA",
    "SFO",
    "CLT",
    "LAS",
  ];

  return Array.from({ length: count }, (_, i) => {
    const airline = airlines[Math.floor(Math.random() * airlines.length)];
    const airlineCode = airline.name.slice(0, 2).toUpperCase();
    const flightNumber = `${airlineCode}${
      Math.floor(Math.random() * 1000) + 1000
    }`;
    const durationMinutes = Math.floor(Math.random() * 240) + 60; // 1-5 hours
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    const duration = `${hours}h ${minutes}m`;

    const departureHour = Math.floor(Math.random() * 20) + 4; // 4 AM to 11 PM
    const departureMinute = Math.floor(Math.random() * 60);
    const departureTime = `${departureHour
      .toString()
      .padStart(2, "0")}:${departureMinute.toString().padStart(2, "0")}`;

    const arrivalHourRaw =
      departureHour + hours + (departureMinute + minutes >= 60 ? 1 : 0);
    const arrivalHour = arrivalHourRaw % 24;
    const arrivalMinute = (departureMinute + minutes) % 60;
    const arrivalTime = `${arrivalHour
      .toString()
      .padStart(2, "0")}:${arrivalMinute.toString().padStart(2, "0")}`;

    const stops = Math.floor(Math.random() * 3); // 0, 1, or 2 stops
    const price = Math.floor(Math.random() * 600) + 200; // $200-$800

    return {
      id: `flight-${i}`,
      airline: airline.name,
      airlineCode,
      airlineLogo: airline.logo,
      flightNumber,
      departureAirport: from,
      arrivalAirport: to,
      departureTime,
      arrivalTime,
      departureDate: date,
      duration,
      durationMinutes,
      stops,
      stopLocations: stops > 0 ? stopLocations.slice(0, stops) : [],
      price,
    };
  });
};

export const applyFilters = (flights: Flight[], filterState: any) => {
  return flights.filter((flight) => {
    if (
      flight.price < filterState.priceRange[0] ||
      flight.price > filterState.priceRange[1]
    ) {
      return false;
    }

    if (
      (flight.stops === 0 && !filterState.stops.direct) ||
      (flight.stops === 1 && !filterState.stops.oneStop) ||
      (flight.stops >= 2 && !filterState.stops.multiStop)
    ) {
      return false;
    }

    const airlineLowerCase = flight.airline.toLowerCase().replace(" ", "");
    const airlineKey =
      airlineLowerCase === "jetblue" ? "jetBlue" : airlineLowerCase;
    if (!filterState.airlines[airlineKey]) {
      return false;
    }

    const hour = parseInt(flight.departureTime.split(":")[0]);
    const isMorning = hour >= 5 && hour < 12;
    const isAfternoon = hour >= 12 && hour < 17;
    const isEvening = hour >= 17 || hour < 5;

    if (
      (isMorning && !filterState.departureTime.morning) ||
      (isAfternoon && !filterState.departureTime.afternoon) ||
      (isEvening && !filterState.departureTime.evening)
    ) {
      return false;
    }

    return true;
  });
};

export const sortFlights = (
  flightsToSort: Flight[],
  sortBy: string
): Flight[] => {
  const sortedFlights = [...flightsToSort];

  switch (sortBy) {
    case "price_asc":
      return sortedFlights.sort((a, b) => a.price - b.price);
    case "price_desc":
      return sortedFlights.sort((a, b) => b.price - a.price);
    case "duration_asc":
      return sortedFlights.sort(
        (a, b) => a.durationMinutes - b.durationMinutes
      );
    case "departure_asc":
      return sortedFlights.sort((a, b) =>
        a.departureTime.localeCompare(b.departureTime)
      );
    case "departure_desc":
      return sortedFlights.sort((a, b) =>
        b.departureTime.localeCompare(a.departureTime)
      );
    case "arrival_asc":
      return sortedFlights.sort((a, b) =>
        a.arrivalTime.localeCompare(b.arrivalTime)
      );
    default:
      return sortedFlights;
  }
};
