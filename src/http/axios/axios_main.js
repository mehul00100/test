import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import BadRequestComponent from "../../pages/badrequest/BadRequestComponent"

const axiosMain = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_END_POINT_URL_DEV
      : process.env.REACT_APP_END_POINT_URL_PROD,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response Interceptor to handle common error codes
axiosMain.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 404) {
        // Render the BadRequestComponent when 400 error occurs
        ReactDOM.render(<BadRequestComponent />, document.getElementById("root"));
      }
    }
    return Promise.reject(error);
  }
);

export default axiosMain;
