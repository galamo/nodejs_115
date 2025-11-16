import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import ProductsPage from "./Products";

const App = () => (
  <div className="container">
    <ProductsPage />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
