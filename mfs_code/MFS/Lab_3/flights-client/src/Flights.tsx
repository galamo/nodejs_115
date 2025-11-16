import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

export type FlightClient = {
  id: number;
  flightNumber: string;
  airlineCompany: string;
  status: string;
  destinationAlphaCode: string;
  destinationCountry: string;
  country: string;
};

const INCREASE_LIMIT = 10;

export default function FlightsPage() {
  const [flights, setFlights] = useState<Array<FlightClient>>([]);
  const [isLoadingFlights, setIsLoadingFlights] = useState(false);
  const [isErrorFlights, setIsErrorFlights] = useState(false);
  const [paginationLimit, setPaginationLimit] = useState(INCREASE_LIMIT);

  useEffect(() => {
    async function getFlights() {
      try {
        setIsLoadingFlights(true);
        const result = await getFlightsApi(paginationLimit);
        setFlights(result);
      } catch {
        setIsErrorFlights(true);
        setFlights([]);
      } finally {
        setIsLoadingFlights(false);
      }
    }
    getFlights();
  }, [paginationLimit]);

  return (
    <div className="container mt-5">
      <h1>Flights</h1>
      {isErrorFlights && (
        <div className="alert alert-danger" role="alert">
          Something went wrong!
        </div>
      )}
      <button
        className="btn btn-primary mb-3"
        onClick={() => setPaginationLimit(paginationLimit + INCREASE_LIMIT)}
      >
        Load More
      </button>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Airline</th>
              <th>Flight Number</th>
              <th>Destination Code</th>
              <th>Destination</th>
              <th>Status</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {isLoadingFlights ? (
              <tr>
                <td colSpan={7} className="text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              flights.map((flight) => (
                <tr key={flight.id}>
                  <td>{flight.id}</td>
                  <td>{flight.airlineCompany}</td>
                  <td>{flight.flightNumber}</td>
                  <td>{flight.destinationAlphaCode}</td>
                  <td>{flight.destinationCountry}</td>
                  <td>{flight.status}</td>
                  <td>{flight.country}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const url =
  "https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit";

async function getFlightsApi(
  paginationLimit: number
): Promise<Array<FlightClient>> {
  const result = await axios.get<{
    result: { records: Array<Record<string, any>> };
  }>(`${url}=${paginationLimit}`);
  const data = result?.data?.result?.records;
  return data.map((item) => {
    return {
      id: item._id,
      flightNumber: item.CHFLTN,
      airlineCompany: item.CHOPERD,
      status: item.CHLOC1,
      destinationAlphaCode: item.CHLOC1T,
      destinationCountry: item.CHSTOL,
      country: item.CHLOCCT,
    };
  });
}
