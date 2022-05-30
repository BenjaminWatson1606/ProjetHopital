import React from 'react';

import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import useState from "react-usestateref";
import Field from "../components/forms/Field";
import axios from "axios";
import hospital from "../../images/hospital.jpg";

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
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      }
    }

  };

  return (
    <section className="bg-gray-200" >
      <div className="main-content  mt-0"></div>
        <div className="page-header align-items-start min-vh-100 FlexContainer"> <img src={hospital} className='page-header align-items-start min-vh-100 FlexContainer Overlay' alt="hospital"></img>
          <span className="mask bg-gradient-dark opacity-6"></span>
            <div className="container my-auto">
              <div className="row">
                <div className="col-lg-4 col-md-8 col-12 mx-auto">
                 <div className="card z-index-0 fadeIn3 fadeInBottom">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                      <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Créer Compte</h4>
                    </div>
                  </div>
                      <div className="card-body">
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
                              <button type="submit" className="btn bg-gradient-primary w-100 my-4 mb-2">{t("Register")}</button>
                            </div>
                            <p className="text-sm mt-3 mb-0 montserrat">{t("haveAccount")} <a href="#/login" className="text-dark font-weight-bolder">{t("logIn")}</a></p>
                          </form>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
        </section>
  )
}