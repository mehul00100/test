/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import { ICON, LOGINBG } from "../../assets/images";
import { Navigate, useLocation } from "react-router-dom";

import { userRoutes, authRoutes } from "../../routes/mainRoutes/mainRoutes";
const Login = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  console.log(currentPath);

  return (
    <div>
      <div class="LoginBox">
        <div className="container-fluid">
          <div class="row">
            <div class="col-md-6 p-0">
              <div class="LoginBg">
                <img src={LOGINBG} class="img-fluid" />
              </div>
            </div>
            <div class="col-md-6 p-0">
              <div class="LoginForm">
                <div class="row g-4">
                  <div class="col-md-12 mb-3">
                    <span className="LoginTitle">
                      <img src={ICON} className="img-fluid Logo" /> Tea Auction
                      Organiser
                    </span>
                  </div>
                  <h6>Welcome to e-Auction system</h6>
                  <div class="col-12 mt-2">
                    <h1>Login</h1>
                  </div>
                  <div class="col-lg-12 mt-2">
                    <input
                      type="text"
                      name=""
                      class="form-control"
                      placeholder="User Code"
                    />
                  </div>
                  <div class="col-lg-12 mt-2">
                    <div class="PasswordBox">
                      <input
                        id="password-field"
                        name="Password"
                        type="password"
                        class="form-control"
                        placeholder="Password"
                      />
                      <span
                        toggle="#password-field"
                        class="fa fa fa-eye field-icon toggle-password"
                      ></span>
                    </div>
                  </div>

                  <div class="col-lg-12 mt-3">
                    <input
                      type="submit"
                      name=""
                      value="Login"
                      class="LoginBtn"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
