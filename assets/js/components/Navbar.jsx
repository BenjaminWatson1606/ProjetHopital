import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AuthAPI from "../services/authAPI";
import logo from "../../images/hospital_logo.jpg";


const NavBar = ({ isAuthenticated, setIsAuthenticated }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [largeur, setLargeur] = useState(window.innerWidth);
  const toggleNavSmallScreen = () => {
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    const changeWidth = () => {
      setLargeur(window.innerWidth);

      if (window.innerWidth > 500) {
        setToggleMenu(false);
      }
    };

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  const handleLogout = () => {
    AuthAPI.logout();
    setIsAuthenticated(false);
  };

  return (
      <div id="body-pd">
          <header className="header" id="header">
              <div className="header_toggle"> <i className='bx bx-menu' id="header-toggle"></i> </div>
              <div className="header_img"> <img src={logo} className='header_img' alt="logo"></img> </div>
          </header>
          <div className="l-navbar" id="nav-bar">
              <nav className="nav">
                  <div> 
                    <NavLink 
                    className="nav_logo bx bx-layer nav_logo-icon nav_logo-name"
                    to="/#">
                    Accueil
                  </NavLink>

                      <div className="nav_list"> 
                          <a href="/#/patient" className="nav_link active"> <i className='bx bx-grid-alt nav_icon'></i> <span className="nav_name">Patient</span> </a> 
                          <a href="/#/lit" className="nav_link"> <i className='bx bx-user nav_icon'></i> <span className="nav_name">Lit</span> </a> 
                          <a href="/#/chambre"className="nav_link"> <i className='bx bx-message-square-detail nav_icon'></i> <span className="nav_name">Chambre</span> </a> 
                          <a href="/#/service" className="nav_link"> <i className='bx bx-bookmark nav_icon'></i> <span className="nav_name">Service</span> </a> 
                          <a href="/#/compte" className="nav_link"> <i className='bx bx-user nav_icon'></i> <span className="nav_name">Comptes</span></a>
                      </div>
                    
                  </div> 
                  {!isAuthenticated &&
                  <NavLink 
                    className="nav_link bx bx-log-out nav_icon nav_name"
                    to="/login">
                    Log in
                  </NavLink>
                  }
                  {!isAuthenticated &&
                  <NavLink 
                    className="nav_link bx bx-log-out nav_icon nav_name"
                    to="/register">
                    Register
                  </NavLink>
                  }
                  {isAuthenticated &&
                  <NavLink 
                    className="nav_link bx bx-log-out nav_icon nav_name"
                    onClick={handleLogout}
                    to="/login">
                    Log out
                  </NavLink>
                  }
              </nav>
          </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script type="text/Javascript" src="{{asset('JS/index.js')}}"></script>
    </div>
  );
};  

export default NavBar;