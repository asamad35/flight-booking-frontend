// IndexedDB utility for offline flight data storage
import { Flight, SearchParams } from "@/types/flight";

const DB_NAME = "flightBookingDB";
const DB_VERSION = 1;
const FLIGHTS_STORE = "flights";

// Initialize the database
export const initializeDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error("IndexedDB error:", event);
      reject("Could not open IndexedDB");
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(FLIGHTS_STORE)) {
        // Create a store for flight data
        const store = db.createObjectStore(FLIGHTS_STORE, { keyPath: "id" });
      }
    };
  });
};

// Store flight data
export const storeFlights = (flights: Flight[]): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME);

    request.onerror = () => reject("Error opening database");

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(FLIGHTS_STORE, "readwrite");
      const store = transaction.objectStore(FLIGHTS_STORE);

      // Clear existing data
      store.clear();

      // Add new flights
      flights.forEach((flight) => {
        store.add(flight);
      });

      transaction.oncomplete = () => {
        resolve();
      };

      transaction.onerror = () => {
        reject("Error storing flights");
      };
    };
  });
};

// Get flights with search parameters
export const getFlights = (searchParams?: SearchParams): Promise<Flight[]> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME);

    request.onerror = () => reject("Error opening database");

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(FLIGHTS_STORE, "readonly");
      const store = transaction.objectStore(FLIGHTS_STORE);
      const request = store.getAll();

      request.onsuccess = () => {
        const flights = request.result;
        console.log(flights, "in getFlights");

        // If search params are provided, filter the results
        if (searchParams) {
          const filteredFlights = flights.filter((flight) => {
            // Basic filtering based on common search parameters
            const matchesFrom =
              !searchParams.from ||
              flight.departure_airport === searchParams.from;
            const matchesTo =
              !searchParams.to || flight.arrival_airport === searchParams.to;

            return matchesFrom && matchesTo;
          });

          resolve(filteredFlights);
        } else {
          resolve(flights);
        }
      };

      request.onerror = () => {
        reject("Error retrieving flights");
      };
    };
  });
};

// Check if IndexedDB has data
export const hasFlightData = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME);

    request.onerror = () => reject("Error opening database");

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(FLIGHTS_STORE, "readonly");
      const store = transaction.objectStore(FLIGHTS_STORE);
      const countRequest = store.count();

      countRequest.onsuccess = () => {
        resolve(countRequest.result > 0);
      };

      countRequest.onerror = () => {
        reject("Error checking flight data");
      };
    };
  });
};

// Delete the database (for cleanup/testing)
export const deleteDatabase = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(DB_NAME);

    request.onerror = () => reject("Error deleting database");
    request.onsuccess = () => resolve();
  });
};
