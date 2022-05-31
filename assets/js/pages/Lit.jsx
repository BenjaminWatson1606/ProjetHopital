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
      id: undefined,
      ChambreId: undefined,
      PatientId: undefined,
    });
    let [newLit, setNewLit] = useState({
      ChambreId: undefined,
      PatientId: undefined,
    });
    let addPatientLit;

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

    const addLit = () => {
      if (newLit.PatientId != "" && newLit.PatientId != null){
        addPatientLit = "/api/patients/" + newLit.PatientId
      } else {
        addPatientLit = null
      }
      try {
        axios.post("http://localhost:8000/api/lits", {
          Chambre: "/api/chambres/" + newLit.ChambreId.toString(),
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
      currentLit.ChambreId = lit.Chambre.id
      if (lit.Patient) {
        currentLit.PatientId = lit.Patient.id
      }
      setModalChange(true)
    }

    const changeLit = () => {
      if (currentLit.PatientId != "" && currentLit.PatientId != null){
        addPatientLit = "/api/patients/" + currentLit.PatientId
      } else {
        addPatientLit = null
      }
      const headers = { 'Content-Type': 'application/merge-patch+json' }
      try {
        axios.patch("http://localhost:8000/api/lits/" + currentLit.id, {
          Chambre: "/api/chambres/" + currentLit.ChambreId.toString(),
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
      currentLit.ChambreId = undefined
      currentLit.PatientId = undefined
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
                    <th>lit</th>
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
                        <td>{lit.Patient.id}</td>
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
            toggle={() => setModalChange(false)}
            className="modal-dialog-centered modal-secondary"
          >
            <div className="modal-body">
                <Form className="edit-event--form">
                  <FormGroup>
                    <label className="form-control-label">Chambre associée</label>
                    <Input
                      className="form-control-alternative edit-event--title"
                      placeholder="Chambre associée"
                      type="number"
                      onChange={e => {
                        currentLit.ChambreId = e.target.value
                      }
                      }
                      defaultValue={currentLit.ChambreId}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label">Patient associé</label>
                    <Input
                      className="form-control-alternative edit-event--title"
                      placeholder="Patient associé"
                      type="number"
                      onChange={e => {
                        currentLit.PatientId = e.target.value
                      }
                      }
                      defaultValue={currentLit.PatientId}
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
                    <label className="form-control-label">Chambre associée</label>
                    <Input
                      className="form-control-alternative edit-event--title"
                      placeholder="Chambre associée"
                      type="number"
                      onChange={e => {
                        newLit.ChambreId = e.target.value
                      }
                      }
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label">Patient associé</label>
                    <Input
                      className="form-control-alternative edit-event--title"
                      placeholder="Patient associé"
                      type="number"
                      onChange={e => {
                        newLit.PatientId = e.target.value
                      }
                      }
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
                  onClick={() => setModalAdd(false)}
                >
                  Close
                </Button>
              </div>

          </Modal>
        </>
    )

  }

export default Lit;