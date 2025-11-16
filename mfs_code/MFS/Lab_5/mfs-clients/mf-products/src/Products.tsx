import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "primereact/card";
// @ts-ignore
import css from "./style.module.css";
import "./index.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getProducts() {
      try {
        setIsLoading(true);
        const result = await axios.get("http://localhost:5000/products");
        const { data } = result;
        setProducts(data);
      } catch (error) {
        alert("Something went Wrong!");
      } finally {
        setIsLoading(false);
      }
    }
    getProducts();
    return () => {
      console.log("CleanUp");
    };
  }, []);

  return isLoading ? (
    <div className="loader"> </div>
  ) : (
    <div className={css.plist}>
      {products.map((product: any) => {
        return <ProductCard {...product} />;
      })}
    </div>
  );
}

function ProductCard(props: any) {
  return (
    <div
      className={css.card}
      style={{ padding: "10px", margin: "10px", border: "1px solid black" }}
    >
      <div className={css["card-content"]}>
        <img alt="Card" src={props.thumbnail} />
        <h2> {props.brand}</h2>
        <h2>{props.price}$</h2>
        <h3>discount: {props.discountPercentage}%</h3>
      </div>
    </div>
  );
}
