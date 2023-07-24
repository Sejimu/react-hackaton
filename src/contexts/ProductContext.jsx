import React, { createContext, useContext, useReducer } from "react";
import { ACTIONS, API } from "../utils/consts";
import axios from "axios";

const productContext = createContext();

export function useProductContext() {
  return useContext(productContext);
}

const init = {
  products: [],
  product: null,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.products:
      return { ...state, products: action.payload };

    case ACTIONS.product:
      return { ...state, product: action.payload };

    default:
      return state;
  }
}

//todo ------------------------------------------------------------------------------------
function ProductContext({ children }) {
  const [state, dispatch] = useReducer(reducer, init);

  async function getProducts() {
    const { data } = await axios.get(API);
    dispatch({
      type: "products",
      payload: data,
    });
  }

  const value = {
    products: state.products,
    getProducts,
  };
  return (
    <productContext.Provider value={value}>{children}</productContext.Provider>
  );
}

export default ProductContext;
