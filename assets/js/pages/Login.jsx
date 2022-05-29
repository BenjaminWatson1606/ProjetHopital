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
                                    <form method="post">

                                        <label for="inputUsername">Nom d'utilisateur</label>
                                        <input type="text" name="username" id="inputUsername" className="form-control" autocomplete="username" required autofocus></input>
                                        <label for="inputPassword">Mot de passe</label>
                                        <input type="password" name="password" id="inputPassword" className="form-control" autocomplete="current-password" required></input>

                                        <input type="hidden" name="_csrf_token"
                                              value="{{ csrf_token('authenticate') }}"
                                        ></input>


                                        <button className="btn bg-gradient-primary w-100 my-4 mb-2" type="submit">
                                            Connexion
                                        </button>
                                    </form>

                                    <a href="#/register"><button className="btn bg-gradient-primary w-100 my-4 mb-2" type="button">
                                        Inscription
                                    </button></a>

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

