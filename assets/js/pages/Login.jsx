import React, { useState } from "react";
import { useEffect } from 'react';
import AuthAPI from "../services/authAPI";
import { useTranslation } from "react-i18next";




const login = ({ onLogin, history }) => {
  const { t } = useTranslation();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  //gestion des champs

  const handleChange = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;

    setCredentials({ ...credentials, [name]: value });
  };

  //gestion du submit

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await AuthAPI.authenticate(credentials);
      setError("");
      onLogin(true);
      history.replace("/");
    } catch (error) {
      setError("Aucun compte ne correpond à vos identifiants");
    }
  };



  return (
    <body className="bg-white montserrat">
      <main className="main-content  mt-0 montserrat">
        <section>
          <div className="page-header min-vh-75 montserrat">
            <div className="container montserrat">
              <div className="row montserrat">
                <div className="col-xl-4  d-flex montserrat">
                  <div className="card card-plain mt-8 montserrat">
                    <div className="card-header pb-0 bg-transparent montserrat">
                      <h3 className="text-gradient montserrat">Welcome back</h3>
                      <p className="mb-0 montserrat">Enter your email and password to sign in</p>
                    </div>
                    <div className="card-body montserrat">
                      <form role="form" onSubmit={handleSubmit}>
                        <label htmlFor="username" className="form-label mt-4 montserrat">
                          {t("username")}
                        </label>
                        <input
                          value={credentials.username}
                          onChange={handleChange}
                          type="text"
                          className={"form-control montserrat" + (error && " is-invalid")}
                          id="username"
                          name="username"
                          placeholder="Enter username"
                        />
                        {error && <p className="invalid-feedback">{error}</p>}{" "}
                        <div className="form-group">
                          <label htmlFor="password" className="form-label mt-4 montserrat">
                            {t("password")}
                          </label>
                          <input
                            value={credentials.password}
                            onChange={handleChange}
                            type="password"
                            className="form-control montserrat"
                            id="password"
                            name="password"
                            placeholder="Password"
                          />
                        </div>

                        <div className="form-check form-switch montserrat">
                          <input className="form-check-input" id=" customCheckLogin" type="checkbox" />
                          <label className="form-check-label" htmlFor=" customCheckLogin">
                            <span className="text-muted">Remember me</span>
                          </label>
                        </div>
                        <div className="text-center">
                          <button type="submit" className="btn1 bg-gradient-info w-100 mt-4 mb-0 btn-warning montserrat"> {t("submit")}</button>
                        </div>
                      </form>
                    </div>
                    <div className="card-footer text-center pt-0 px-lg-2 px-1 montserrat">
                      <p className="mb-4  mx-auto montserrat">
                        Don't have an account?
                        <a href="javascript:;" className=" text-gradient font-weight-bold montserrat" href="#/register">Sign up</a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="oblique position-absolute top-0 h-100 d-md-block d-none ">
                    <div className="oblique-image bg-cover position-absolute fixed-top  h-100  ms-n6"> <img src={curved} alt="Tailor"></img></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-5" id="footer-main">
        <div className="container">
          <div className="row align-items-center justify-content-xl-between">
            <div className="col-xl-6">
              <div className="copyright text-center text-xl-left text-muted">
                &copy; 2022 <a href="https://www.creative-tim.com" className="font-weight-bold ml-1" target="_blank">Tailor</a>
              </div>
            </div>
            <div className="col-xl-6">
              <ul className="nav nav-footer justify-content-center justify-content-xl-end">
                <li className="nav-item">
                  <a href="https://www.creative-tim.com/presentation" className="nav-link" target="_blank">About Us</a>
                </li>
                <li className="nav-item">
                  <a href="http://blog.creative-tim.com" className="nav-link" target="_blank">Blog</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>


    </body>
  )
};

export default login;

