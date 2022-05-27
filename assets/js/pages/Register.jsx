import React from 'react';

import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import useState from "react-usestateref";
import Field from "../components/forms/Field";
import axios from "axios";

export default function Register() {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const { t } = useTranslation();
  const [user, setUser, userRef] = useState({
    Username: "",
    Password: "",
    IsConditionsChecked: false,
  });

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setUser({ ...user, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    user.IsConditionsChecked = e.target.checked;
    console.log(user)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let error = false;

    if (user.IsConditionsChecked === false) {
      toast.error(t("conditionsNotChecked"))
      error = true;
    }

    if (user.Password.length < 8 || user.Password.length > 20) {
      toast.error(t("passwordLength"))
      error = true;
    }

    if ((user.Password.toUpperCase() == user.Password) || (user.Password.toLowerCase() == user.Password)) {
      toast.error(t("passwordCharacter"))
      error = true;
    }

    if (!(/\d/.test(user.Password))) {
      toast.error(t("passwordNumber"))
      error = true;
    }

    if (!(specialChars.test(user.Password))) {
      toast.error(t("passwordSpecialCharacter"))
      error = true;
    }


    if (error === false) {
      try {
        await axios.post("http://localhost:8000/api/comptes", {
          username: user.Username,
          password: user.Password
        });
        toast.success(t("addedUser"))
      } catch (error) {
        console.log(error);
        toast.error(t("errorOccured"))
      }
    }

  };

  return (
    <div style={{ marginLeft: "40%"}} className="g-sidenav-show  bg-gray-100 montserrat body1">
      <section className="min-vh-100 mb-8" >

        <div className="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg">
          <div className="container">

            <div className="row justify-content-center">
              <div className="col-lg-5 text-center mx-auto">

                <h1 className=" mb-2 mt-5">{t("register")}</h1>
              </div>
            </div>
          </div>
        </div>


        <div className="container">
          <div className="row mt-lg-n10 mt-md-n11 mt-n10">
            <div className="col-xl-4 col-lg-5 col-md-7 mx-auto">
              <div className="card z-index-0">
                <div className="card-body montserrat">
                  <form role="form text-left" onSubmit={handleSubmit}>
                    <Field
                      label={t("username")}
                      name="Username"
                      placeholder={t("username")}
                      value={user.Username}
                      onChange={handleChange}
                    />
                    <Field
                      label={t("password")}
                      name="Password"
                      type="password"
                      placeholder={t("password")}
                      value={user.Password}
                      minlength="3"
                      maxlength="20"
                      onChange={handleChange}
                    />
                    <div className="form-check form-check-info text-left">
                      <input name="IsConditionsChecked" className="form-check-input" type="checkbox" onChange={handleCheckboxChange} id="flexCheckDefault" />
                      <label className="form-check-label montserrat" for="flexCheckDefault">
                        {t("agree")} <a href="/#/CGU" className="text-dark font-weight-bolder montserrat"> {t("conditions")} </a>
                      </label>
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn1 bg-gradient-info w-100 my-4 mb-2 montserrat">{t("register")}</button>
                    </div>
                    <p className="text-sm mt-3 mb-0 montserrat">{t("haveAccount")} <a href="#/login" className="text-dark font-weight-bolder">{t("logIn")}</a></p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}