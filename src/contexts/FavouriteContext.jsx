import React, { createContext, useContext } from "react";

const favouriteContext = createContext();

export function useFavouriteContext() {
  return useContext(favouriteContext);
}

// todo --------------------------------------------------------------------------------
function FavouriteContext({ children }) {
  const value = {};

  return (
    <favouriteContext.Provider value={value}>
      {children}
    </favouriteContext.Provider>
  );
}

export default FavouriteContext;
