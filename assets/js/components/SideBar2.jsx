import React from "react";
import { NavLink } from "react-router-dom";
import man from "../../images/man-silhouette.png";
import adressBook from "../../images/adress-book.png";
import graph from "../../images/bar-graph.png";
import calendar from "../../images/calendar.png";
import chat from "../../images/chat.png";
import cup from "../../images/cup.png";
import mail from "../../images/gmail.png";
import market from "../../images/marketplace.png";
import SideBarIcon from "../components/SideBarIcon";

const SideBar = () => {
  return (
    <>
     <nav className="sidenav navbar navbar-vertical  fixed-left  navbar-expand-xs navbar-light bg-white" id="sidenav-main">
      <div className="sidenav-header  align-items-center">
        <a className="sideLink navbar-brand items" href="javascript:void(0)">
        <img src={Tailor} text="Home" alt="Tailor"></img>
        </a>
      </div>
      <div className="navbar-inner">
        <div className="collapse navbar-collapse" id="sidenav-collapse-main">
        
          <ul className="navbar-nav">
            <li className="nav-item">
            <NavLink className="sideLink navbar-brand items" to="/rh">
                    <SideBarIcon src={man} text="Rh" alt="man icon" />
                <i className="ni ni-tv-2 text-primary"></i>
                <span className="nav-link-text">RH</span>
                </NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="sideLink navbar-brand items" to="/">
                <SideBarIcon src={calendar} text="Calendrier" alt="calendar icon" />
                <i className="ni ni-planet text-orange"></i>
                <span className="nav-link-text">Calendar</span>
                </NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="sideLink navbar-brand items" to="/">
                    <SideBarIcon src={chat} text="Chat" alt="Chat icon" />  
                <i className="ni ni-pin-3 text-primary"></i>
                <span className="nav-link-text">Chat</span>
                </NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="sideLink navbar-brand items" to="/">
                    <SideBarIcon src={cup} text="Restauration" alt="cup icon" />
                <i className="ni ni-single-02 text-yellow"></i>
                <span className="nav-link-text">Restauration</span>
                </NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="sideLink navbar-brand items" to="/">
                    <SideBarIcon src={graph} text="Statistiques" alt="graph icon" />
                <i className="ni ni-bullet-list-67 text-default"></i>
                <span className="nav-link-text">Tables</span>
                </NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="sideLink navbar-brand items" to="/">
                    <SideBarIcon src={mail} text="Mails" alt="email icon" />  
                <i className="ni ni-key-25 text-info"></i>
                <span className="nav-link-text">Login</span>
                </NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="sideLink navbar-brand items" to="/">
                    <SideBarIcon
                      src={adressBook}
                      text="Carnet"
                      alt="adressBook icon"
                    />
                  
                <i className="ni ni-circle-08 text-pink"></i>
                <span className="nav-link-text">Register</span>
                </NavLink>
            </li>
          </ul>
        </div>
      </div>

  </nav>
    </>
  );
};

export default SideBar;
