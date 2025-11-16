import React from "react";
import ReactDOM from "react-dom";
// @ts-ignore
import ProductsPage from "products/ProductsPage";
import "./index.css";

const App = () => (
  <div className="container">
    <h1> Container App</h1>
    <ProductsPage />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
