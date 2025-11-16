import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import Products from "./Products";
import SingleProduct from "./SingleProduct";

const App = () => (
  <div>
    <Products />
    <SingleProduct name="test" price={1} image={""} />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
