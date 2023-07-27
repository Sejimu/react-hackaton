import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Toastify from "./components/Toastify";
import ProductContext from "./contexts/ProductContext";
import AuthContext from "./contexts/AuthContext";
import FavouriteContext from "./contexts/FavouriteContext";
import CartContext from "./contexts/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthContext>
      <CartContext>
        <FavouriteContext>
          <ProductContext>
            <Toastify />
            <App />
          </ProductContext>
        </FavouriteContext>
      </CartContext>
    </AuthContext>
  </BrowserRouter>
);
