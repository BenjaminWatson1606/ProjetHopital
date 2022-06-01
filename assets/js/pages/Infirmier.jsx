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

  const Infirmier = (props) => {
    
    const { t } = useTranslation();
    const [Infirmiers, setInfirmiers] = useState([]);
    const [alert, setAlert] = useState()
    const [modalChange, setModalChange] = useState(false)
    const [modalAdd, setModalAdd] = useState(false)
    let [currentInfirmier, setCurrentInfirmier] = useState({
        id: undefined,
        NomInfirmier: undefined,
        PrenomInfirmier: undefined,
    })
    let [newInfirmier, setNewInfirmier] = useState({
        id: undefined,
        NomInfirmier: undefined,
        PrenomInfirmier: undefined,
    })
    let [options, setOptions] = useState([])
    const [selectedOption, setSelectedOption] = useState(null)
  

    useEffect(() => {
      fetchInfirmiers(),
      fetchServices()
    }, [])

    const fetchInfirmiers = async () => {
      try {
        await axios
          .get("http://localhost:8000/api/infirmiers")
          .then((response) => setInfirmiers(response.data["hydra:member"]))
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

    const fetchServices = async () => {
      try {
        await axios
          .get("http://localhost:8000/api/services")
          .then((response) => response.data["hydra:member"].map(Service => (options.push({value: Service.id, label: Service.NomService}))))
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

    const addInfirmier = () => {
      try {
        axios.post("http://localhost:8000/api/infirmiers", {
          NomInfirmier: newInfirmier.NomInfirmier,
          PrenomInfirmier: newInfirmier.PrenomInfirmier,
          Service: "/api/services/" + selectedOption.value
        })
        toast.success("Infirmier ajouté")
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

    const handleModify = (Infirmier) => {
      currentInfirmier.id = Infirmier.id
      currentInfirmier.NomInfirmier = Infirmier.NomInfirmier
      currentInfirmier.PrenomInfirmier = Infirmier.PrenomInfirmier
      if (Infirmier.Service){
        setSelectedOption({label:[Infirmier.Service.NomService], value: [Infirmier.Service.id]})
      } else {
        setSelectedOption(null)
      }
      setModalChange(true)
    }

    const changeInfirmier = () => {
      const headers = { 'Content-Type': 'application/merge-patch+json' }
      try {
        axios.patch("http://localhost:8000/api/infirmiers/" + currentInfirmier.id, {
          NomInfirmier: currentInfirmier.NomInfirmier,
          PrenomInfirmier: currentInfirmier.PrenomInfirmier,
          Service: "/api/services/" + selectedOption.value
        }, 
        {headers} )
        toast.success("Infirmier modifié")
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

    const deleteInfirmierSweetAlert = () => {
      setAlert(
        <ReactBSAlert
          warning
          style={{ display: "block", marginTop: "0px" }}
          title="Are you sure?"
          onConfirm={deleteInfirmier}
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

    const deleteInfirmier = () => {

      try {
        axios.delete("http://localhost:8000/api/infirmiers/" + currentInfirmier.id)
        toast.success("Infirmier supprimé")
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
          Infirmier supprimé !
        </ReactBSAlert>
      )
      setModalChange(false),
      currentInfirmier.id= undefined,
      currentInfirmier.NomInfirmier= undefined,
      currentInfirmier.PrenomInfirmier= undefined,
      setSelectedOption(null)
    }

    return (
        <>
          {alert}
          <div className="HopitalArray">
            <table id="InfirmiersTable" className="table table-dark">

              <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>Service</th>
                    <th>Modifier</th>
                  </tr>
              </thead>
              <tbody>
                  {console.log(options)}
                {Infirmiers.map(Infirmier => (
                  <tr>
                    <td>{Infirmier.NomInfirmier}</td>
                    <td>{Infirmier.PrenomInfirmier}</td>
                    {Infirmier.Service &&
                        <td>{Infirmier.Service.NomService}</td>
                    }
                    {!Infirmier.Service &&
                        <td>/</td>
                    }
                    <td><Button color="success" onClick={() => handleModify(Infirmier)}>Modifier / Supprimer</Button></td> 

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
                    <label className="form-control-label">Nom de l'Infirmier</label>
                    <Input
                      className="form-control-alternative edit-event--title"
                      placeholder="Nom de l'Infirmier"
                      type="text"
                      onChange={e => {
                        currentInfirmier.NomInfirmier = e.target.value
                      }
                      }
                      defaultValue={currentInfirmier.NomInfirmier}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label">Prénom de l'Infirmier</label>
                    <Input
                      className="form-control-alternative edit-event--title"
                      placeholder="Prénom de l'Infirmier"
                      type="text"
                      onChange={e => {
                        currentInfirmier.PrenomInfirmier = e.target.value
                      }
                      }
                      defaultValue={currentInfirmier.PrenomInfirmier}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label">Service de l'Infirmier</label>
                    <Select
                      options={options}
                      onChange={setSelectedOption}
                      name="ServiceInfirmier"
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
                <Button color="primary" onClick={changeInfirmier} >
                  Modifier
                </Button>
                <Button
                  color="danger"
                  onClick={deleteInfirmierSweetAlert}
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
                    <label className="form-control-label">Nom de l'Infirmier</label>
                    <Input
                      className="form-control-alternative edit-event--title"
                      placeholder="Nom de l'Infirmier"
                      type="text"
                      onChange={e => {
                        newInfirmier.NomInfirmier = e.target.value
                      }
                      }
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label">Prénom de l'Infirmier</label>
                    <Input
                      className="form-control-alternative edit-event--title"
                      placeholder="Prénom de l'Infirmier"
                      type="text"
                      onChange={e => {
                        newInfirmier.PrenomInfirmier = e.target.value
                      }
                      }
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label">Service de l'Infirmier</label>
                    <Select
                      options={options}
                      onChange={setSelectedOption}
                      name="ServiceInfirmier"
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
                <Button color="primary" onClick={addInfirmier} >
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

export default Infirmier;