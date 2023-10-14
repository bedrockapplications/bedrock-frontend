import React, { createContext, useState } from "react";

export const GlobalState = createContext(null);

const ContextProvider = (props) => {
  let listData =
    JSON.parse(localStorage.getItem("listItem"))?.length > 0
      ? JSON?.parse(localStorage.getItem("listItem"))
      : [];

  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedProjected, setSelectedProjected] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [search, setSearch] = useState("");
  const [selectedChat, setSelectedChat] = useState({});
  const [popen, setPopen] = useState(false);
  const [openUserForm, setOpenUserForm] = useState(false);
  const [list, setList] = useState([]);
  const [taskList, setTaskList] = useState([...listData]);
  const [show, setShow] = useState("Direct Contact");
  const [taskDetails, setTaskDetails] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [profKey, setProfKey] = useState(true);
  const [userRole, setUserRole] = useState("")
  const [token, setToken] = useState(localStorage.getItem("token") || "")

  return (
    <GlobalState.Provider
      value={{
        show,
        setShow,
        isLoading,
        setIsLoading,
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        selectedProjected,
        setSelectedProjected,
        userDetails,
        setUserDetails,
        search,
        setSearch,
        selectedChat,
        setSelectedChat,
        popen,
        setPopen,
        openUserForm,
        setOpenUserForm,
        list,
        setList,
        taskList,
        setTaskList,
        taskDetails,
        setTaskDetails,
        expanded,
        setExpanded,
        profKey, setProfKey,
        userRole,
        setUserRole,
        token, setToken
      }}
    >
      {props.children}
    </GlobalState.Provider>
  );
};
export default ContextProvider;
