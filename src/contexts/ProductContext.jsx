import React, { createContext, useContext, useReducer } from "react";
import { ACTIONS, API } from "../utils/consts";
import axios from "axios";
import { notify } from "../components/Toastify";

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
    try {
      const { data } = await axios.get(API);
      dispatch({
        type: ACTIONS.products,
        payload: data,
      });
    } catch (e) {
      notify(`${e.response.status}: ${e.response.statusText}`, "error");
    }
  }
  async function getOneProduct(id) {
    try {
      const { data } = await axios.get(`${API}/${id}`);
      dispatch({
        type: ACTIONS.product,
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
  async function deleteProduct(id) {
    try {
      await axios.delete(`${API}/${id}`);
      getProducts();
      notify("Successfully deleted");
    } catch (e) {
      notify(`${e.response.status}: ${e.response.statusText}`, "error");
      console.log(e);
    }
  }

  async function updateProduct(id, newData) {
    try {
      await axios.patch(`${API}/${id}`, newData);
      getProducts();
    } catch (e) {
      notify(`${e.response.status}: ${e.response.statusText}`, "error");
    }
  }

  const value = {
    products: state.products,
    product: state.product,
    getProducts,
    addProduct,
    deleteProduct,
    updateProduct,
    getOneProduct,
  };

  return (
    <productContext.Provider value={value}>{children}</productContext.Provider>
  );
}

export default ProductContext;
