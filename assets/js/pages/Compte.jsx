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

  const Compte = (props) => {
    
    const { t } = useTranslation();
    const [comptes, setComptes] = useState([]);
    const [alert, setAlert] = useState()
    const [modalChange, setModalChange] = useState(false)
    const [modalAdd, setModalAdd] = useState(false)
    let [currentCompte, setCurrentCompte] = useState({
      id: undefined,
      administrateur: undefined,
      username: undefined,
      password: undefined,
      roles: undefined,
      Infirmier: undefined,
      Secretaire: undefined
    })
    let [newCompte, setNewCompte] = useState({
      id: undefined,
      username: undefined,
      password: undefined,
      roles: undefined,
    })

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

    const addCompte = () => {
      if (newCompte.administrateur == true) {
        newCompte.roles = ["ROLE_ADMIN"]
      }
      try {
        axios.post("http://localhost:8000/api/comptes", {
          username: newCompte.username,
          password: newCompte.password,
          roles: newCompte.roles
        })
        toast.success("Compte ajouté")
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

    const handleModify = (compte) => {
      currentCompte.id = compte.id
      currentCompte.username = compte.username
      currentCompte.password = compte.password
      currentCompte.roles = compte.roles
      if (compte.Infirmier){
        currentCompte.Infirmier = compte.Infirmier.id
      } else {
        currentCompte.Infirmier = undefined
      }
      if (compte.Secretaire){
        currentCompte.Secretaire = compte.Secretaire.id
      } else {
        currentCompte.Secretaire = undefined
      }
      if (compte.roles.includes('ROLE_ADMIN')) {
        currentCompte.administrateur = true
      } else {
        currentCompte.administrateur = false
      }
      setModalChange(true)
    }

    const changeCompte = () => {
      const headers = { 'Content-Type': 'application/merge-patch+json' }
      if (currentCompte.administrateur == true && !currentCompte.roles.includes('ROLE_ADMIN')) {
        currentCompte.roles = [...currentCompte.roles, "ROLE_ADMIN"]
      } else if (currentCompte.administrateur == false) {
      for( var i = 0; i < currentCompte.roles.length; i++){ 
                                   
        if ( currentCompte.roles[i] === "ROLE_ADMIN") { 
          currentCompte.roles.splice(i, 1); 
        }
      }
      }
      try {
        axios.patch("http://localhost:8000/api/comptes/" + currentCompte.id, {
          username: currentCompte.username,
          password: currentCompte.password,
          roles: currentCompte.roles
        }, 
        {headers} )
        toast.success("Compte modifié")
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

    const deleteCompteSweetAlert = () => {
      setAlert(
        <ReactBSAlert
          warning
          style={{ display: "block", marginTop: "0px" }}
          title="Are you sure?"
          onConfirm={deleteCompte}
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

    const deleteCompte = () => {

      try {
        axios.delete("http://localhost:8000/api/comptes/" + currentCompte.id)
        toast.success("Compte supprimé")
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
          Compte supprimé !
        </ReactBSAlert>
      )
      setModalChange(false),
      currentCompte.id= undefined,
      currentCompte.username= undefined,
      currentCompte.password= undefined,
      currentCompte.roles= undefined,
      currentCompte.Infirmier= undefined,
      currentCompte.Secretaire= undefined
    }
  
    return (
        <>
          {alert}
          <div className="HopitalArray">
            <table id="comptesTable" className="table table-dark">

              <thead>
                  <tr>
                    <th>Numero</th>
                    <th>Nom d'utilisateur</th>
                    <th>Mot de passe</th>
                    <th>Rôle</th>
                    <th>Modifier</th>
                  </tr>
              </thead>
              <tbody>
                {console.log(comptes)}
                {comptes.map(compte => (
                  <tr>
                    <td>{compte.id}</td>
                    <td>{compte.username}</td>
                    <td>{compte.password}</td>
                    {compte.roles.includes('ROLE_ADMIN') &&
                    <td>Administrateur</td>
                    }
                    {!compte.roles.includes('ROLE_ADMIN') &&
                    <td>Utilisateur</td>
                    }
                    <td><Button color="success" onClick={() => handleModify(compte)}>Modifier / Supprimer</Button></td> 
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
                    <label className="form-control-label">Nom d'utilisateur</label>
                    <Input
                      className="form-control-alternative edit-event--title"
                      placeholder="Nom d'utilisateur"
                      type="text"
                      onChange={e => {
                        currentCompte.username = e.target.value
                      }
                      }
                      defaultValue={currentCompte.username}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label">Mot de passe</label>
                    <Input
                      className="form-control-alternative edit-event--title"
                      placeholder="Mot de passe"
                      type="password"
                      onChange={e => {
                        currentCompte.password = e.target.value
                      }
                      }
                      defaultValue={currentCompte.password}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label">Administrateur</label>
                    <Input
                      className="form-control-alternative edit-event--title"
                      placeholder="Administrateur"
                      type="checkbox"
                      defaultChecked={currentCompte.administrateur}
                      onChange={e => {
                        currentCompte.administrateur = e.target.checked
                      }
                      }
                    />
                  </FormGroup>

                  <input className="edit-event--id" type="hidden" />
                </Form>
              </div>
              <div className="modal-footer">
                <Button color="primary" onClick={changeCompte} >
                  Modifier
                </Button>
                <Button
                  color="danger"
                  onClick={deleteCompteSweetAlert}
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
                    <label className="form-control-label">Nom d'utilisateur</label>
                    <Input
                      className="form-control-alternative edit-event--title"
                      placeholder="Nom d'utilisateur"
                      type="text"
                      onChange={e => {
                        newCompte.username = e.target.value
                      }
                      }
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label">Mot de passe</label>
                    <Input
                      className="form-control-alternative edit-event--title"
                      placeholder="Mot de passe"
                      type="password"
                      onChange={e => {
                        newCompte.password = e.target.value
                      }
                      }
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label">Administrateur</label>
                    <Input
                      className="form-control-alternative edit-event--title"
                      placeholder="Administrateur"
                      type="checkbox"
                      onChange={e => {
                        newCompte.administrateur = e.target.checked
                      }
                      }
                    />
                  </FormGroup>

                  <input className="edit-event--id" type="hidden" />
                </Form>
              </div>
              <div className="modal-footer">
                <Button color="primary" onClick={addCompte} >
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

export default Compte;