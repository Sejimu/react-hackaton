import React, { createContext, useContext } from "react";

const commentsContext = createContext();
export async function useCommentContexts() {
  return useContext(commentsContext);
}

const CommentsContext = ({ children }) => {
  const value = {};
  return (
    <commentsContext.Provider value={value}>
      {children}
    </commentsContext.Provider>
  );
};

export default CommentsContext;
