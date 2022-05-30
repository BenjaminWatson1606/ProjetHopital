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
    let [currentPatient, setcurrentPatient] = useState({
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

    const deleteEventSweetAlert = () => {
      console.log("ouais")
      setAlert(
        <ReactBSAlert
          warning
          style={{ display: "block", marginTop: "0px" }}
          title="Are you sure?"
          onConfirm={deleteEvent}
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

    const deleteEvent = () => {
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
      currentPatient.DateDepart= undefined,
      currentPatient.DateArrivee= undefined,
      currentPatient.AgePatient= undefined,
      currentPatient.AdressePatient= undefined,
      currentPatient.TypePatient= undefined
    }

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
      currentPatient.id = patient.id
      currentPatient.NomPatient = patient.NomPatient
      currentPatient.PrenomPatient = patient.PrenomPatient
      currentPatient.DateDepart = patient.DateDepart
      currentPatient.DateArrivee = patient.DateArrivee
      currentPatient.AgePatient = patient.AgePatient
      currentPatient.AdressePatient = patient.AdressePatient
      currentPatient.TypePatient = patient.TypePatient
      setSelectedOption({label:[patient.TypePatient], value: [patient.TypePatient]})
      console.log(selectedOption)
      setModalChange(true)
    }

    const changePatient = () => {
      console.log(currentPatient.NomPatient)
      console.log(currentPatient.PrenomPatient)
      console.log(currentPatient.DateDepart)
      console.log(currentPatient.DateArrivee)
      console.log(currentPatient.AgePatient)
      console.log(currentPatient.AdressePatient)
      const headers = { 'Content-Type': 'application/merge-patch+json' }
      try {
        axios.patch("http://localhost:8000/api/patients/" + currentPatient.id, {
          NomPatient: currentPatient.NomPatient,
          PrenomPatient: currentPatient.PrenomPatient,
          DateDepart: currentPatient.DateDepart,
          DateArrivee: currentPatient.DateArrivee,
          AgePatient: parseInt(currentPatient.AgePatient),
          AdressePatient: currentPatient.AdressePatient,
          TypePatient: selectedOption.value
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

    return (
        <>
          {alert}
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
                  Update
                </Button>
                <Button
                  color="danger"
                  onClick={deleteEventSweetAlert}
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
        </>
    )

  }

export default Patient;