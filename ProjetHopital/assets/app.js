import React, { useState } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import RoleBasedRouting from "./js/components/authorization/RoleBasedRouting";
import HomePage from "./js/pages/HomePage";
import Login from "./js/pages/Login";
import AuthAPI from "./js/services/authAPI";
import Popup from "react-popup";
import NavBar from "./js/components/Navbar";
import "./i18nextConf";

/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import "./styles/app.css";
import { toast, ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import 'react-toastify/dist/ReactToastify.css';
import Register from "./js/pages/Register";
import Patient from "./js/pages/Patient";
import Lit from "./js/pages/Lit";
import Chambre from "./js/pages/Chambre";
import Service from "./js/pages/Service";
import Infirmier from "./js/pages/Infirmier";
import Compte from "./js/pages/Compte";

const token = window.localStorage.getItem("authToken");
const { roles: roles } = jwtDecode(token);

AuthAPI.setup();
//permet de rediriger vers le login quand on veut accéder à certaines page
const PrivateRoute = ({ path, isAuthenticated, component }) =>
  isAuthenticated ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to="/login" />
  );

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthAPI.isAuthenticated()
  );
  let CompteComponent = <></>
  if (roles) {
    if (roles.find(role => role == "ROLE_ADMIN")) {
      CompteComponent = <PrivateRoute path="/compte" isAuthenticated={isAuthenticated} component={Compte}/>
    } else {
      CompteComponent = <PrivateRoute path="/compte" isAuthenticated={isAuthenticated} component={HomePage}/>
    }
  }
  return (
    <>
      <HashRouter>
        <Popup />
        <div className="row">

          <div className="col container-fluid p-0">
            <NavBar
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
            

            <Switch>
            
              <Route
                path="/login"
                render={(props) => (
                  <Login onLogin={setIsAuthenticated} {...props} />
                )}
              />

              <PrivateRoute
                path="/patient"
                isAuthenticated={isAuthenticated}
                component={Patient}
              />

              <PrivateRoute
                path="/lit"
                isAuthenticated={isAuthenticated}
                component={Lit}
              />

              <PrivateRoute
                path="/chambre"
                isAuthenticated={isAuthenticated}
                component={Chambre}
              />

              <PrivateRoute
                path="/service"
                isAuthenticated={isAuthenticated}
                component={Service}
              />

              <PrivateRoute
                path="/infirmier"
                isAuthenticated={isAuthenticated}
                component={Infirmier}
              />

              {CompteComponent}


              <Route
                path="/register"
                component={Register}
              />

              <Route
                path="/"
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                component={HomePage}
              />
            </Switch >
          </div >
        </div >
      </HashRouter >
      <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />

    </>

  );
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);

const blackBox = {
  initial: {
    height: "100vh",
    bottom: 0,
  },
  animate: {
    height: 0,
  },
};

const InitialTransition = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="relative z-50 w-full bg-black"
        initial="initial"
        animate="animate"
        variants={blackBox}
      />
    </div>
  );
};

// useEffect(() => {
//   const script = document.createElement('script');

//   script.src = "js/soft-ui-dashboard.js";
//   script.async = true;

//   document.body.appendChild(script);

//   return () => {
//     document.body.removeChild(script);
//   }
// }, []);
