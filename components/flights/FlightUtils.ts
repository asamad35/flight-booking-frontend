import { Flight } from "@/types/flight";

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
    const hour = parseInt(flight.departure_time.split(":")[0]);
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
        (a, b) => a.duration_minutes - b.duration_minutes
      );
    case "departure_asc":
      return sortedFlights.sort((a, b) =>
        a.departure_time.localeCompare(b.departure_time)
      );
    case "departure_desc":
      return sortedFlights.sort((a, b) =>
        b.departure_time.localeCompare(a.departure_time)
      );
    case "arrival_asc":
      return sortedFlights.sort((a, b) =>
        a.arrival_time.localeCompare(b.arrival_time)
      );
    default:
      return sortedFlights;
  }
};
