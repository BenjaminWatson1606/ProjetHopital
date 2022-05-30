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

  const Lit = (props) => {
    
    const { t } = useTranslation();
    const [lits, setLits] = useState([]);

    useEffect(() => {
      fetchLits()
    }, [])

    const fetchLits = async () => {
  
      try {
        await axios
          .get("http://localhost:8000/api/lits")
          .then((response) => setLits(response.data["hydra:member"]))
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
          <div className="litsArray">
            <table id="litsTable" className="table table-dark">

              <thead>
                  <tr>
                    <th>Numero</th>
                    <th>Chambre</th>
                    <th>Patient</th>
                    <th>Disponibilité</th>
                  </tr>
              </thead>
              <tbody>
                {lits.map(lit => (
                  <tr>
                    <td>{lit.id}</td>
                    <td>{lit.Chambre.id}</td>
                    {!lit.Patient &&
                        <td>/</td>
                    }
                    {lit.Patient &&
                        <td>{lit.Patient.id}</td>
                    }
                    <td>{lit.disponibilite}</td>
                  </tr>))}
              </tbody>

            </table>
          </div>
        </>
    )

  }

export default Lit;