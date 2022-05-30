import React, { useState } from "react";
import { useEffect } from 'react';
import AuthAPI from "../services/authAPI";
import { useTranslation } from "react-i18next";
import hospital from "../../images/hospital.jpg";




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
      <div className="bg-gray-200">
        <div className="main-content  mt-0">
            <div className="page-header align-items-start min-vh-100 FlexContainer"> <img src={hospital} className='page-header align-items-start min-vh-100 FlexContainer Overlay' alt="hospital"></img>
                <span className="mask bg-gradient-dark opacity-6"></span>
                <div className="container my-auto">
                    <div className="row">
                        <div className="col-lg-4 col-md-8 col-12 mx-auto">
                            <div className="card z-index-0 fadeIn3 fadeInBottom">
                                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                    <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                                        <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Connexion</h4>
                                    </div>
                                </div>
                                <div className="card-body">
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
                                        <button type="submit" className="btn bg-gradient-primary w-100 my-4 mb-2"> {t("submit")}</button>
                                      </div>
                                    </form>

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
export default login;

