import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ShowSnackbar = (type, message) => {
  switch (type) {
    case "success": {
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      break;
    }
    case "error": {
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      break;
    }
    default:
      break;
  }
};

const Snackbar = () => {
  return (
    <>
      <ToastContainer
        newestOnTop
        pauseOnFocusLoss
        pauseOnHover
        draggable
        closeOnClick
        limit={1}
      />
    </>
  );
};
export default Snackbar;
