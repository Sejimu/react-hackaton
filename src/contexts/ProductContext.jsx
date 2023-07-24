import React, { createContext, useContext, useReducer } from "react";
import { ACTIONS } from "../utils/consts";

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
  const value = {};
  return (
    <productContext.Provider value={value}>{children}</productContext.Provider>
  );
}

export default ProductContext;
