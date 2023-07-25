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

    case ACTIONS.addProduct:
      return { ...state, products: [...state.products, action.payload] };

    default:
      return state;
  }
}

function ProductContext({ children }) {
  const [state, dispatch] = useReducer(reducer, init);

  async function getProducts() {
    const { data } = await axios.get(API);
    dispatch({
      type: ACTIONS.products,
      payload: data,
    });
  }

  async function addProduct(newProduct) {
    const { data } = await axios.post(API, newProduct);
    dispatch({
      type: ACTIONS.addProduct,
      payload: data,
    });
  }

  const value = {
    products: state.products,
    product: state.product,
    getProducts,
    addProduct,
  };

  return (
    <productContext.Provider value={value}>{children}</productContext.Provider>
  );
}

export default ProductContext;
