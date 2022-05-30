import React from "react";
import AuthAPI from "../services/authAPI";
import { Link } from "react-router-dom";
import NavBar from "../components/Navbar";
import hospital from "../../images/hospital.jpg";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

function Index() {
  return (
    <div className="page-header align-items-start min-vh-100 FlexContainer"> <img src={hospital} className='page-header align-items-start min-vh-100 FlexContainer Overlay' alt="hospital"></img>
        <h1 id = 'accueil-titre'> Gestion de l'Hôpital </h1>
        <h1 id = "Bienvenu">Bienvenue sur notre logiciel de gestion d'Hôpital</h1>
    </div>
    );
};

export default Index;
