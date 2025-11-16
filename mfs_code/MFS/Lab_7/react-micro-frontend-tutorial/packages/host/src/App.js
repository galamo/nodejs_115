import React, { Component } from "react";
import Store_App from "./Components/Store_App";
import Cart_App from "./Components/Cart_App";
import CartRegular from "cart/CartPage2";

export default () => {
  return (
    <div>
      <Store_App />
      <Cart_App />
    </div>
  );
};
