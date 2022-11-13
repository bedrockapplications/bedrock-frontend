import React, { createContext, useState } from "react";

export const GlobalState = createContext(null);

const ContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  return (
    <GlobalState.Provider
      value={{
        isLoading,
        setIsLoading,
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
      }}
    >
      {props.children}
    </GlobalState.Provider>
  );
};
export default ContextProvider;
