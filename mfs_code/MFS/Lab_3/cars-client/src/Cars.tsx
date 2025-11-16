import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

export type Car = {
  id: number;
  make: string;
  model: string;
  year: number;
  color: string;
  price: number;
};

const INCREASE_LIMIT = 10;

export default function Cars() {
  const carsData: Car[] = [
    {
      id: 1,
      make: "Toyota",
      model: "Camry",
      year: 2022,
      color: "Silver",
      price: 24000,
    },
    {
      id: 2,
      make: "Honda",
      model: "Civic",
      year: 2021,
      color: "Blue",
      price: 22000,
    },
    {
      id: 3,
      make: "Ford",
      model: "Mustang",
      year: 2023,
      color: "Red",
      price: 35000,
    },
    {
      id: 4,
      make: "Chevrolet",
      model: "Malibu",
      year: 2020,
      color: "White",
      price: 21000,
    },
    {
      id: 5,
      make: "Tesla",
      model: "Model 3",
      year: 2022,
      color: "Black",
      price: 40000,
    },
    {
      id: 6,
      make: "BMW",
      model: "3 Series",
      year: 2021,
      color: "Gray",
      price: 42000,
    },
    {
      id: 7,
      make: "Audi",
      model: "A4",
      year: 2022,
      color: "White",
      price: 41000,
    },
    {
      id: 8,
      make: "Mercedes-Benz",
      model: "C-Class",
      year: 2023,
      color: "Silver",
      price: 45000,
    },
    {
      id: 9,
      make: "Nissan",
      model: "Altima",
      year: 2020,
      color: "Blue",
      price: 23000,
    },
    {
      id: 10,
      make: "Hyundai",
      model: "Elantra",
      year: 2021,
      color: "Red",
      price: 20000,
    },
  ];

  const [cars, setCars] = useState<Car[]>(carsData.slice(0, INCREASE_LIMIT));
  const [paginationLimit, setPaginationLimit] = useState(INCREASE_LIMIT);

  const loadMore = () => {
    const newLimit = paginationLimit + INCREASE_LIMIT;
    setCars(carsData.slice(0, newLimit));
    setPaginationLimit(newLimit);
  };

  return (
    <div className="container mt-5">
      <h1>Cars</h1>
      <button className="btn btn-primary mb-3" onClick={loadMore}>
        Load More
      </button>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Make</th>
              <th>Model</th>
              <th>Year</th>
              <th>Color</th>
              <th>Price ($)</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id}>
                <td>{car.id}</td>
                <td>{car.make}</td>
                <td>{car.model}</td>
                <td>{car.year}</td>
                <td>{car.color}</td>
                <td>{car.price.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
