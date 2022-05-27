import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AuthAPI from "../services/authAPI";


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
          </header>
          <div className="l-navbar" id="nav-bar">
              <nav className="nav">
                  <div> <a href="http://localhost:8000{{ path('accueil') }}" className="nav_logo"> <i className='bx bx-layer nav_logo-icon'></i> <span
                      className="nav_logo-name">Accueil</span> </a>

                      <div className="nav_list"> <a href="http://127.0.0.1:8000{{ path('hospitalisation_index') }}" className="nav_link active"> <i className='bx bx-grid-alt nav_icon'></i>
                          <span className="nav_name">Hospitalisation</span> </a> <a href="http://localhost:8000{{ path('patient_index') }}" className="nav_link"> <i
                              className='bx bx-user nav_icon'></i> <span className="nav_name">Patients</span> </a> <a href="http://localhost:8000{{ path('service_index') }}"
                                  className="nav_link"> <i className='bx bx-message-square-detail nav_icon'></i> <span
                                      className="nav_name">Services</span> </a> <a href="http://localhost:8000{{ path('chambre_index') }}" className="nav_link"> <i
                                          className='bx bx-bookmark nav_icon'></i> <span className="nav_name">Chambres</span> </a> <a href="http://localhost:8000{{ path('compte_index') }}" className="nav_link"></a> <i
                                              className='bx bx-user nav_icon'></i> <span className="nav_name">Comptes</span>


                          </div>
                    
                  </div> <a href="http://localhost:8000/logout" className="nav_link"> <i className='bx bx-log-out nav_icon'></i> <span className="nav_name">Se déconnecter</span> </a>
              </nav>
          </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script type="text/Javascript" src="{{asset('JS/index.js')}}"></script>
    </div>
    );
};

export default NavBar;