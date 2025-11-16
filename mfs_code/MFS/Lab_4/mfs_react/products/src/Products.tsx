import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await axios.get("https://dummyjson.com/products");
        const { data } = res;
        setProducts(data.products);
      } catch (error) {
        alert("something went wrong!");
      }
    }
    getProducts();

    return () => {
      console.log("Unmount");
    };
  }, []);

  return (
    <div>
      <h2> Products </h2>
      {products.map((p: { title: string; price: string }) => {
        return (
          <div key={p.title + p.price}>
            {p.title} {p.price}
          </div>
        );
      })}
    </div>
  );
}
