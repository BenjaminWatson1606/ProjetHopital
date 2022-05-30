import React, { useState, useEffect, useRef } from 'react';
import AuthAPI from "../services/authAPI";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Moment from "moment";
import { toast } from "react-toastify";
import Select from 'react-select';
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
    const [modalChange, setModalChange] = useState(false)
    let [newPatient, setNewPatient] = useState({
      id: undefined,
      NomPatient: undefined,
      PrenomPatient: undefined,
      DateDepart: undefined,
      DateArrivee: undefined,
      AgePatient: undefined,
      AdressePatient: undefined,
      TypePatient: undefined
    })
    const [selectedOption, setSelectedOption] = useState(null)
    const options = [
      { value: 'Hospitalisation', label: 'Hospitalisation' },
      { value: 'Vaccination', label: 'Vaccination' },
    ]
  

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
  
    const handleModify = (patient) => {
      newPatient.id = patient.id
      newPatient.NomPatient = patient.NomPatient
      newPatient.PrenomPatient = patient.PrenomPatient
      newPatient.DateDepart = patient.DateDepart
      newPatient.DateArrivee = patient.DateArrivee
      newPatient.AgePatient = patient.AgePatient
      newPatient.AdressePatient = patient.AdressePatient
      newPatient.TypePatient = patient.TypePatient
      setSelectedOption(patient.TypePatient)
      setModalChange(true)
    }

    const changePatient = (patient) => {
      console.log(newPatient.NomPatient)
      console.log(newPatient.PrenomPatient)
      console.log(newPatient.DateDepart)
      console.log(newPatient.DateArrivee)
      console.log(newPatient.AgePatient)
      console.log(newPatient.AdressePatient)
      try {
        axios.patch("http://localhost:8000/api/patients/" + newPatient.id, {
          NomPatient: newPatient.NomPatient,
          PrenomPatient: newPatient.PrenomPatient,
          DateDepart: newPatient.DateDepart,
          DateArrivee: newPatient.DateArrivee,
          AgePatient: newPatient.AgePatient,
          AdressePatient: newPatient.AdressePatient,
          TypePatient: selectedOption.value
        })
        toast.success("Patient modifié")
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
        toast.error(t("errorOccured"))
      }

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
                    <th>Modifier</th>
                  </tr>
              </thead>
              <tbody>
                {patients.map(patient => (
                  <tr>
                    <td>{patient.NomPatient}</td>
                    <td>{patient.PrenomPatient}</td>
                    <td>{toIsoString(patient.DateArrivee)}</td>
                    <td>{toIsoString(patient.DateDepart)}</td>
                    <td>{patient.AgePatient}</td>
                    <td>{patient.AdressePatient}</td>
                    <td>{patient.TypePatient}</td>
                    <td><Button color="success" onClick={() => handleModify(patient)}>Modifier</Button></td> 

                  </tr>))}
              </tbody>

            </table>
          </div>
          <Modal
            isOpen={modalChange}
            toggle={() => setModalChange(false)}
            className="modal-dialog-centered modal-secondary"
          >
            <div className="modal-body">
                <Form className="edit-event--form">
                  <FormGroup>
                    <label className="form-control-label">Nom du Patient</label>
                    <Input
                      className="form-control-alternative edit-event--title"
                      placeholder="Nom du Patient"
                      type="text"
                      onChange={e => {
                        newPatient.NomPatient = e.target.value
                      }
                      }
                      defaultValue={newPatient.NomPatient}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label">Prénom du Patient</label>
                    <Input
                      className="form-control-alternative edit-event--title"
                      placeholder="Prénom du Patient"
                      type="text"
                      onChange={e => {
                        newPatient.PrenomPatient = e.target.value
                      }
                      }
                      defaultValue={newPatient.PrenomPatient}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label">Date d'arrivée du Patient</label>
                    <Input
                      className="form-control-alternative edit-event--title"
                      placeholder="Date d'arrivée du Patient"
                      type="date"
                      onChange={e => {
                        newPatient.DateArrivee = e.target.value
                      }
                      }
                      defaultValue={Moment(newPatient.DateArrivee).format("YYYY-MM-DD")}
                    />
                  </FormGroup>

                  <FormGroup>
                    <label className="form-control-label">Date de départ du Patient</label>
                    <Input
                      className="form-control-alternative edit-event--title"
                      placeholder="Date de départ du Patient"
                      type="date"
                      onChange={e => {
                        newPatient.DateDepart = e.target.value
                      }
                      }
                      defaultValue={Moment(newPatient.DateDepart).format("YYYY-MM-DD")}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label">Âge du Patient</label>
                    <Input
                      className="form-control-alternative edit-event--title"
                      placeholder="Âge du Patient"
                      type="text"
                      onChange={e => {
                        newPatient.AgePatient = e.target.value
                      }
                      }
                      defaultValue={newPatient.AgePatient}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label">Type de Patient</label>
                    <Select
                    options={options}
                    onChange={setSelectedOption}
                    name="AbsenceType"
                    value={selectedOption}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 0,
                      colors: {
                        ...theme.colors,
                        primary25: '#8dd7cf',
                        primary: '#c3cfd9'

                      },
                    })}
                  />
                  </FormGroup>

                  <input className="edit-event--id" type="hidden" />
                </Form>
              </div>
              <div className="modal-footer">
                <Button color="primary" onClick={changePatient} >
                  Update
                </Button>
                <Button
                  color="danger"
                  onClick={() =>
                    setModalChange(false)
                      
                  }
                > 
                  Delete
                </Button> 
                <Button
                  className="ml-auto"
                  color="link"
                  onClick={() => setModalChange(false)}
                >
                  Close
                </Button>
              </div>

          </Modal>
        </>
    )

  }

export default Patient;