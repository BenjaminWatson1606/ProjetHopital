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

  const Patient = (props) => {
    
    const { t } = useTranslation();
    const [patients, setPatients] = useState([]);
    const [alert, setAlert] = useState()
    const [modalChange, setModalChange] = useState(false)
    const [modalAdd, setModalAdd] = useState(false)
    let [currentPatient, setCurrentPatient] = useState({
      id: undefined,
      NomPatient: undefined,
      PrenomPatient: undefined,
      NumSecuriteSociale: undefined,
      DateDepart: undefined,
      DateArrivee: undefined,
      AgePatient: undefined,
      AdressePatient: undefined,
      TypePatient: undefined
    })
    let [newPatient, setNewPatient] = useState({
      id: undefined,
      NomPatient: undefined,
      PrenomPatient: undefined,
      NumSecuriteSociale: undefined,
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

    const addPatient = () => {
      try {
        axios.post("http://localhost:8000/api/patients", {
          NomPatient: newPatient.NomPatient,
          PrenomPatient: newPatient.PrenomPatient,
          NumSecuriteSociale: parseInt(newPatient.NumSecuriteSociale),
          DateDepart: newPatient.DateDepart,
          DateArrivee: newPatient.DateArrivee,
          AgePatient: parseInt(newPatient.AgePatient),
          AdressePatient: newPatient.AdressePatient,
          TypePatient: selectedOption.value
        })
        toast.success("Patient ajouté")
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

    const handleModify = (patient) => {
      currentPatient.id = patient.id
      currentPatient.NomPatient = patient.NomPatient
      currentPatient.PrenomPatient = patient.PrenomPatient
      currentPatient.NumSecuriteSociale = patient.NumSecuriteSociale
      currentPatient.DateDepart = patient.DateDepart
      currentPatient.DateArrivee = patient.DateArrivee
      currentPatient.AgePatient = patient.AgePatient
      currentPatient.AdressePatient = patient.AdressePatient
      currentPatient.TypePatient = patient.TypePatient
      setSelectedOption({label:[patient.TypePatient], value: [patient.TypePatient]})
      setModalChange(true)
    }

    const changePatient = () => {
      const headers = { 'Content-Type': 'application/merge-patch+json' }
      try {
        axios.patch("http://localhost:8000/api/patients/" + currentPatient.id, {
          NomPatient: currentPatient.NomPatient,
          PrenomPatient: currentPatient.PrenomPatient,
          NumSecuriteSociale: parseInt(currentPatient.NumSecuriteSociale),
          DateArrivee: currentPatient.DateArrivee,
          DateDepart: currentPatient.DateDepart,
          AgePatient: parseInt(currentPatient.AgePatient),
          AdressePatient: currentPatient.AdressePatient,
          TypePatient: selectedOption.value.toString()
        }, 
        {headers} )
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

    const deletePatientSweetAlert = () => {
      setAlert(
        <ReactBSAlert
          warning
          style={{ display: "block", marginTop: "0px" }}
          title="Are you sure?"
          onConfirm={deletePatient}
          onCancel={() =>
            setAlert(null)
          }
          confirmBtnCssClass="danger"
          cancelBtnBsStyle="btn-secondary"
          confirmBtnText="Yes, delete it"
          cancelBtnText="Cancel"
          showCancel
          btnSize=""
        >
          You won't be able to revert this!
        </ReactBSAlert>
      )
    };

    const deletePatient = () => {

      try {
        axios.delete("http://localhost:8000/api/patients/" + currentPatient.id)
        toast.success(t("deletedEvent"))
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
      setAlert(
        <ReactBSAlert
          success
          style={{ display: "block" }}
          title="Success"
          onConfirm={() => setAlert(null)}
          confirmBtnBsStyle="primary"
          confirmBtnText="Ok"
          btnSize=""
        >
          Patient supprimé !
        </ReactBSAlert>
      )
      setModalChange(false),
      currentPatient.id= undefined,
      currentPatient.NomPatient= undefined,
      currentPatient.PrenomPatient= undefined,
      currentPatient.NumSecuriteSociale= undefined,
      currentPatient.DateDepart= undefined,
      currentPatient.DateArrivee= undefined,
      currentPatient.AgePatient= undefined,
      currentPatient.AdressePatient= undefined,
      currentPatient.TypePatient= undefined
    }

    return (
        <>
          {alert}
          <div className="HopitalArray">
            <table id="patientsTable" className="table table-dark">

              <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>Numéro de Sécurité Sociale</th>
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
                    <td>{patient.NumSecuriteSociale}</td>
                    <td>{toIsoString(patient.DateArrivee)}</td>
                    <td>{toIsoString(patient.DateDepart)}</td>
                    <td>{patient.AgePatient}</td>
                    <td>{patient.AdressePatient}</td>
                    <td>{patient.TypePatient}</td>
                    <td><Button color="success" onClick={() => handleModify(patient)}>Modifier / Supprimer</Button></td> 

                  </tr>))}
              </tbody>

            </table>
          </div>
          <div>
            <Button className="centre" color="success" onClick={() => setModalAdd(true)}>Ajouter</Button>
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
                        currentPatient.NomPatient = e.target.value
                      }
                      }
                      defaultValue={currentPatient.NomPatient}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label">Prénom du Patient</label>
                    <Input
                      className="form-control-alternative edit-event--title"
                      placeholder="Prénom du Patient"
                      type="text"
                      onChange={e => {
                        currentPatient.PrenomPatient = e.target.value
                      }
                      }
                      defaultValue={currentPatient.PrenomPatient}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label">Numéro de Sécurité Sociale</label>
                    <Input
                      className="form-control-alternative edit-event--title"
                      placeholder="Numéro de Sécurité Sociale du Patient"
                      type="text"
                      onChange={e => {
                        currentPatient.NumSecuriteSociale = e.target.value
                      }
                      }
                      defaultValue={currentPatient.NumSecuriteSociale}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label">Date d'arrivée du Patient</label>
                    <Input
                      className="form-control-alternative edit-event--title"
                      placeholder="Date d'arrivée du Patient"
                      type="date"
                      onChange={e => {
                        currentPatient.DateArrivee = e.target.value
                      }
                      }
                      defaultValue={Moment(currentPatient.DateArrivee).format("YYYY-MM-DD")}
                    />
                  </FormGroup>

                  <FormGroup>
                    <label className="form-control-label">Date de départ du Patient</label>
                    <Input
                      className="form-control-alternative edit-event--title"
                      placeholder="Date de départ du Patient"
                      type="date"
                      onChange={e => {
                        currentPatient.DateDepart = e.target.value
                      }
                      }
                      defaultValue={Moment(currentPatient.DateDepart).format("YYYY-MM-DD")}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label">Âge du Patient</label>
                    <Input
                      className="form-control-alternative edit-event--title"
                      placeholder="Âge du Patient"
                      type="text"
                      onChange={e => {
                        currentPatient.AgePatient = e.target.value
                      }
                      }
                      defaultValue={currentPatient.AgePatient}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label">Adresse du Patient</label>
                    <Input
                      className="form-control-alternative edit-event--title"
                      placeholder="Adresse du Patient"
                      type="text"
                      onChange={e => {
                        currentPatient.AdressePatient = e.target.value
                      }
                      }
                      defaultValue={currentPatient.AdressePatient}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label">Type de Patient</label>
                    <Select
                      options={options}
                      onChange={setSelectedOption}
                      name="AbsenceType"
                      defaultValue={selectedOption}
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
                  Modifier
                </Button>
                <Button
                  color="danger"
                  onClick={deletePatientSweetAlert}
                > 
                  Supprimer
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
          <Modal
            isOpen={modalAdd}
            toggle={() => setModalAdd(false)}
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
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label">Numéro de Sécurité Sociale</label>
                    <Input
                      className="form-control-alternative edit-event--title"
                      placeholder="Numéro de Sécurité Sociale du Patient"
                      type="text"
                      onChange={e => {
                        newPatient.NumSecuriteSociale = e.target.value
                      }
                      }
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
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label">Adresse du Patient</label>
                    <Input
                      className="form-control-alternative edit-event--title"
                      placeholder="Adresse du Patient"
                      type="text"
                      onChange={e => {
                        newPatient.AdressePatient = e.target.value
                      }
                      }
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label">Type de Patient</label>
                    <Select
                      options={options}
                      onChange={setSelectedOption}
                      name="AbsenceType"
                      defaultValue={{value:"Hospitalisation", label:"Hospitalisation"}}
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
                <Button color="primary" onClick={addPatient} >
                  Ajouter
                </Button>
                <Button
                  className="ml-auto"
                  color="link"
                  onClick={() => setModalAdd(false)}
                >
                  Close
                </Button>
              </div>

          </Modal>
        </>
    )

  }

export default Patient;