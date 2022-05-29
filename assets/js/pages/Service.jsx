import React, { useState, useEffect, useRef } from 'react';
import AuthAPI from "../services/authAPI";
import { useTranslation } from "react-i18next";
import axios from "axios";
import {
    Button,
    ButtonGroup,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Modal,
    Row,
    Col
  } from "reactstrap";

  const Service = (props) => {
    
    const { t } = useTranslation();
    const [services, setServices] = useState([]);
    const [litsDispo, setLitsDispo] = useState({});

    useEffect(() => {
        fetchServices()
      }, [])

    const fetchServices = async () => {
  
      try {
        await axios
          .get("http://localhost:8000/api/services")
          .then((response) => {response.data["hydra:member"].forEach(response => fetchNombreLitsDispo(response.id)), setServices(response.data["hydra:member"])})
          
          
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
    };

    const fetchNombreLitsDispo = async (idService) => {
        try {
            await axios
              .get("http://localhost:8000/api/lits?Disponibilite=true&Chambre.Service.id=" + idService)
              .then((response) => setLitsDispo (litsDispo => ({...litsDispo, [idService] : response.data["hydra:totalItems"]})))
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

    const toIsoString = (date) => {
      let correctDate = new Date(date);
      var pad = function (num) {
          var norm = Math.floor(Math.abs(num));
          return (norm < 10 ? '0' : '') + norm;
      };

      return correctDate.getFullYear() +
          '-' + pad(correctDate.getMonth() + 1) +
          '-' + pad(correctDate.getDate())
    }
  
    return (
        <>
          <div className="servicesArray">
            <table id="servicesTable" className="table table-dark">
              <thead>
                  <tr>
                    <th>Numéro</th>
                    <th>Nom</th>
                    <th>Nombre de lits disponibles</th>
                  </tr>
              </thead>
              <tbody>
                {services.map(service => (
                  <tr>
                    <td>{service.id}</td>
                    <td>{service.NomService}</td>
                    <td>{litsDispo[service.id]}</td>
                  </tr>))}
              </tbody>

            </table>
          </div>
        </>
    )

  }

export default Service;