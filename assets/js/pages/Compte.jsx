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

  const Compte = (props) => {
    
    const { t } = useTranslation();
    const [comptes, setComptes] = useState([]);

    useEffect(() => {
      fetchComptes()
    }, [])

    const fetchComptes = async () => {
  
      try {
        await axios
          .get("http://localhost:8000/api/comptes")
          .then((response) => setComptes(response.data["hydra:member"]))
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
          <div className="comptesArray">
            <table id="comptesTable" className="table table-dark">

              <thead>
                  <tr>
                    <th>Numero</th>
                    <th>Nom d'utilisateur</th>
                    <th>Mot de passe</th>
                    <th>Rôles</th>
                  </tr>
              </thead>
              <tbody>
                {comptes.map(compte => (
                  <tr>
                    <td>{compte.id}</td>
                    <td>{compte.username}</td>
                    <td>{compte.password}</td>
                    <td>{compte.roles}</td>
                  </tr>))}
              </tbody>

            </table>
          </div>
        </>
    )

  }

export default Compte;