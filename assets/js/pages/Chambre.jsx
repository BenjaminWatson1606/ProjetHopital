import React, { useState, useEffect, useRef } from 'react';
import AuthAPI from "../services/authAPI";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Moment from "moment";
import { toast } from "react-toastify";
import Select from 'react-select';
import ReactBSAlert from "react-bootstrap-sweetalert";
import "sweetalert2/dist/sweetalert2.min.css";
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

  const Chambre = (props) => {
    
    const { t } = useTranslation();
    const [chambres, setChambres] = useState([]);

    useEffect(() => {
      fetchChambres()
    }, [])

    const fetchChambres = async () => {
  
      try {
        await axios
          .get("http://localhost:8000/api/chambres")
          .then((response) => setChambres(response.data["hydra:member"]))
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
          <div className="chambresArray">
            <table id="chambresTable" className="table table-dark">

              <thead>
                  <tr>
                    <th>Numero</th>
                    <th>Service</th>
                  </tr>
              </thead>
              <tbody>
                {chambres.map(chambre => (
                  <tr>
                    <td>{chambre.id}</td>
                    <td>{chambre.Service.NomService}</td>
                  </tr>))}
              </tbody>

            </table>
          </div>
        </>
    )

  }

export default Chambre;