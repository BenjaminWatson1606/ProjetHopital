import React, { useState, useEffect, useRef } from 'react';
import AuthAPI from "../services/authAPI";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { toast } from "react-toastify";
import ReactBSAlert from "react-bootstrap-sweetalert";
import Select from 'react-select';
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

  const Lit = (props) => {
    
    const { t } = useTranslation();
    const [lits, setLits] = useState([]);
    const [alert, setAlert] = useState();
    const [modalChange, setModalChange] = useState(false);
    const [modalAdd, setModalAdd] = useState(false);
    let [currentLit, setCurrentLit] = useState({
      id: undefined
    });
    let addPatientLit;
    let addChambreLit;
    let [optionsPatient, setOptionsPatient] = useState([])
    const [selectedOptionPatient, setSelectedOptionPatient] = useState({value: "NoPatient", label: "Patient non défini"})
    let [optionsChambre, setOptionsChambre] = useState([])
    const [selectedOptionChambre, setSelectedOptionChambre] = useState(null)

    useEffect(() => {
      fetchLits(), 
      fetchChambres(), 
      fetchPatients()
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

    const fetchChambres = async () => {
      try {
        await axios
          .get("http://localhost:8000/api/chambres")
          .then((response) => response.data["hydra:member"].map(Chambre => (optionsChambre.push({value: Chambre.id, label: Chambre.id}))))
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
      }}

      const fetchPatients = async () => {
        optionsPatient.push({value: "NoPatient", label: "Patient non défini"})
        try {
          await axios
            .get("http://localhost:8000/api/patients?exists[Lit]=false")
            .then((response) => response.data["hydra:member"].map(Patient => (optionsPatient.push({value: Patient.id, label: Patient.NomPatient + " " + Patient.PrenomPatient}))))
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
        }}

    const addLit = () => {
      if (selectedOptionPatient.value == "NoPatient"){
        addPatientLit = null
      } else {
        addPatientLit = "/api/patients/" + selectedOptionPatient.value
      }
      if (selectedOptionChambre.value == null){
        addChambreLit = null
      } else {
        addChambreLit = "/api/chambres/" + selectedOptionChambre.value
      }
      try {
        axios.post("http://localhost:8000/api/lits", {
          Chambre: addChambreLit,
          Patient: addPatientLit
        })
        toast.success("Lit ajouté")
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

    const handleModify = (lit) => {
      currentLit.id = lit.id
      setSelectedOptionChambre({label:[lit.Chambre.id], value: [lit.Chambre.id]})
      if (lit.Patient){
        setSelectedOptionPatient({label:[lit.Patient.NomPatient + " " + lit.Patient.PrenomPatient], value: [lit.Patient.id]})
      } else {
        setSelectedOptionPatient({value: "NoPatient", label: "Patient non défini"})
      }
      setModalChange(true)
    }

    const changeLit = () => {
      if (selectedOptionPatient.value == "NoPatient"){
        addPatientLit = null
      } else {
        addPatientLit = "/api/patients/" + selectedOptionPatient.value
      }
      if (selectedOptionChambre.value == null){
        addChambreLit = null
      } else {
        addChambreLit = "/api/chambres/" + selectedOptionChambre.value
      }
      const headers = { 'Content-Type': 'application/merge-patch+json' }
      try {
        axios.patch("http://localhost:8000/api/lits/" + currentLit.id, {
          Chambre: addChambreLit,
          Patient: addPatientLit
        }, 
        {headers} )
        toast.success("Lit modifié")
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

    const deleteLitSweetAlert = () => {
      setAlert(
        <ReactBSAlert
          warning
          style={{ display: "block", marginTop: "0px" }}
          title="Are you sure?"
          onConfirm={deleteLit}
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

    const deleteLit = () => {

      try {
        axios.delete("http://localhost:8000/api/lits/" + currentLit.id)
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
          Lit supprimé !
        </ReactBSAlert>
      )
      setModalChange(false),
      currentLit.id = undefined
      setSelectedOptionChambre(null)
      setSelectedOptionPatient({value: "NoPatient", label: "Patient non défini"})
    }
  
    return (
        <>
          {alert}
          <div className="HopitalArray">
            <table id="patientsTable" className="table table-dark">

              <thead>
                  <tr>
                    <th>Numero</th>
                    <th>Chambre</th>
                    <th>Patient</th>
                    <th>Disponibilité</th>
                    <th>Modifier</th>
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
                        <td>{lit.Patient.NomPatient} {lit.Patient.PrenomPatient}</td>
                    }
                    {lit.Disponibilite == true &&
                        <td>Oui</td>
                    }
                    {lit.Disponibilite == false &&
                        <td>Non</td>
                    }
                    <td><Button color="success" onClick={() => handleModify(lit)}>Modifier / Supprimer</Button></td> 
                  </tr>))}
              </tbody>

            </table>
          </div>
          <div>
            <Button className="centre" color="success" onClick={() => setModalAdd(true)}>Ajouter</Button>
          </div>
          <Modal
            isOpen={modalChange}
            toggle={() => {setModalChange(false), setSelectedOptionPatient({value: "NoPatient", label: "Patient non défini"}), setSelectedOptionChambre(null)}}
            className="modal-dialog-centered modal-secondary"
          >
            <div className="modal-body">
                <Form className="edit-event--form">
                  <FormGroup>
                    <label className="form-control-label">Chambre associée</label>
                    <Select
                      options={optionsChambre}
                      onChange={setSelectedOptionChambre}
                      name="ChambreLit"
                      defaultValue={selectedOptionChambre}
                      value={selectedOptionChambre}
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
                  <FormGroup>
                    <label className="form-control-label">Patient associé</label>
                    <Select
                      options={optionsPatient}
                      onChange={setSelectedOptionPatient}
                      name="PatientLit"
                      defaultValue={selectedOptionPatient}
                      value={selectedOptionPatient}
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
                <Button color="primary" onClick={changeLit} >
                  Modifier
                </Button>
                <Button
                  color="danger"
                  onClick={deleteLitSweetAlert}
                > 
                  Supprimer
                </Button> 
                <Button
                  className="ml-auto"
                  color="link"
                  onClick={() => {setModalChange(false), setSelectedOptionPatient({value: "NoPatient", label: "Patient non défini"}), setSelectedOptionChambre(null)}}
                >
                  Close
                </Button>
              </div>

          </Modal>
          <Modal
            isOpen={modalAdd}
            toggle={() => {setModalAdd(false), setSelectedOptionPatient({value: "NoPatient", label: "Patient non défini"}), setSelectedOptionChambre(null)}}
            className="modal-dialog-centered modal-secondary"
          >
            <div className="modal-body">
                <Form className="edit-event--form">
                  <FormGroup>
                    <label className="form-control-label">Chambre associée</label>
                    <Select
                      options={optionsChambre}
                      onChange={setSelectedOptionChambre}
                      name="ChambreLit"
                      defaultValue={selectedOptionChambre}
                      value={selectedOptionChambre}
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
                  <FormGroup>
                    <label className="form-control-label">Patient associé</label>
                    <Select
                      options={optionsPatient}
                      onChange={setSelectedOptionPatient}
                      name="PatientLit"
                      value={selectedOptionPatient}
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
                <Button color="primary" onClick={addLit} >
                  Ajouter
                </Button>
                <Button
                  className="ml-auto"
                  color="link"
                  onClick={() => {setModalAdd(false), setSelectedOptionPatient({value: "NoPatient", label: "Patient non défini"}), setSelectedOptionChambre(null)}}
                >
                  Close
                </Button>
              </div>

          </Modal>
        </>
    )

  }

export default Lit;