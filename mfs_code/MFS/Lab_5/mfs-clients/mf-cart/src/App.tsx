import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import Cart from "./Cart";

const App = () => (
  <div>
    <Cart />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
