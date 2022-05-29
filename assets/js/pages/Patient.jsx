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

  const Patient = (props) => {
    
    const { t } = useTranslation();
    const [patients, setPatients] = useState([]);

    useEffect(() => {
      fetchPatients()
    }, [])

    const fetchPatients = async () => {
  
      try {
        await axios
          .get("http://localhost:8000/api/patients")
          .then((response) => setPatients(response.data["hydra:member"]))
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
          <div className="patientsArray">
            <table id="patientsTable" className="table table-dark">

              <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>Date d'arrivée</th>
                    <th>Date de départ</th>
                    <th>Âge</th>
                    <th>Adresse</th>
                    <th>Type</th>
                  </tr>
              </thead>
              {console.log(patients)}
              <tbody>
                {patients.map(patient => (
                  <tr>
                    <td>{patient.NomPatient}</td>
                    <td>{patient.PrenomPatient}</td>
                    <td>{toIsoString(patient.DateDepart)}</td>
                    <td>{toIsoString(patient.DateArrivee)}</td>
                    <td>{patient.AgePatient}</td>
                    <td>{patient.AdressePatient}</td>
                    <td>{patient.TypePatient}</td>
                  </tr>))}
              </tbody>

            </table>
          </div>
        </>
    )

  }

export default Patient;