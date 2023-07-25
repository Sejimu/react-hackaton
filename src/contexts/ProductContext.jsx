import React, { createContext, useContext, useReducer, useState } from "react";
import { ACTIONS, API, LIMIT } from "../utils/consts";
import axios from "axios";
import { notify } from "../components/Toastify";
import { useSearchParams } from "react-router-dom";

const productContext = createContext();

export function useProductContext() {
  return useContext(productContext);
}

const init = {
  products: [],
  product: null,
  pageTotalCount: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.products:
      return { ...state, products: action.payload };

    case ACTIONS.product:
      return { ...state, product: action.payload };

    case ACTIONS.addProduct:
      return { ...state, products: [...state.products, action.payload] };

    case ACTIONS.pageTotalCount:
      return { ...state, pageTotalCount: action.payload };
    default:
      return state;
  }
}

function ProductContext({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, dispatch] = useReducer(reducer, init);
  const [page, setPage] = useState(+searchParams.get("_page") || 1);

  async function getProducts() {
    try {
      const { data, headers } = await axios.get(
        `${API}${window.location.search} `
      );
      const totalCount = Math.ceil(headers["x-total-count"] / LIMIT);

      dispatch({
        type: ACTIONS.pageTotalCount,
        payload: totalCount,
      });

      dispatch({
        type: ACTIONS.products,
        payload: data,
      });
    } catch (e) {
      notify(`${e.response.status}: ${e.response.statusText}`, "error");
    }
  }

  async function addProduct(newProduct) {
    const { data } = await axios.post(API, newProduct);
    dispatch({
      type: ACTIONS.addProduct,
      payload: data,
    });
  }

  const value = {
    page,
    products: state.products,
    product: state.product,
    getProducts,
    addProduct,
    pageTotalCount: state.pageTotalCount,
    setPage,
  };

  return (
    <productContext.Provider value={value}>{children}</productContext.Provider>
  );
}

export default ProductContext;
