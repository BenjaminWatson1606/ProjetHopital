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

  const Service = (props) => {
    
    const { t } = useTranslation();
    const [services, setServices] = useState([]);
    const [litsDispo, setLitsDispo] = useState({});
    const [alert, setAlert] = useState();
    const [modalChange, setModalChange] = useState(false);
    const [modalAdd, setModalAdd] = useState(false);
    let [currentService, setCurrentService] = useState({
      id: undefined,
      NomService: undefined,
    });
    let [newService, setNewService] = useState({
      NomService: undefined,
    });

    useEffect(() => {
        fetchServices()
      }, [])

    const fetchServices = async () => {
  
      try {
        await axios
          .get("http://localhost:8000/api/services")
          .then((response) => {response.data["hydra:member"].forEach(response => fetchNombreLitsDispo(response.id)), setServices(response.data["hydra:member"])})
          
          
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

    const fetchNombreLitsDispo = async (idService) => {
        try {
            await axios
              .get("http://localhost:8000/api/lits?Disponibilite=true&Chambre.Service.id=" + idService)
              .then((response) => setLitsDispo (litsDispo => ({...litsDispo, [idService] : response.data["hydra:totalItems"]})))
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
    }

    const addService = () => {
      try {
        axios.post("http://localhost:8000/api/services", {
          NomService: newService.NomService
        })
        toast.success("Service ajouté")
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

    const handleModify = (service) => {
      currentService.id = service.id
      currentService.NomService = service.NomService
      setModalChange(true)
    }

    const changeService = () => {
      const headers = { 'Content-Type': 'application/merge-patch+json' }
      try {
        axios.patch("http://localhost:8000/api/services/" + currentService.id, {
          NomService: currentService.NomService
        }, 
        {headers} )
        toast.success("Service modifié")
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

    const deleteServiceSweetAlert = () => {
      setAlert(
        <ReactBSAlert
          warning
          style={{ display: "block", marginTop: "0px" }}
          title="Are you sure?"
          onConfirm={deleteService}
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

    const deleteService = () => {

      try {
        axios.delete("http://localhost:8000/api/services/" + currentService.id)
        toast.success("Service supprimé")
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
          Service supprimé !
        </ReactBSAlert>
      )
      setModalChange(false),
      currentService.id = undefined
      currentService.NomService = undefined
    }
  
    return (
        <>
          {alert}
          <div className="HopitalArray">
            <table id="servicesTable" className="table table-dark">
              <thead>
                  <tr>
                    <th>Numéro</th>
                    <th>Nom</th>
                    <th>Nombre de lits disponibles</th>
                    <th>Infirmiers</th>
                    <th>Modifier</th>
                  </tr>
              </thead>
              <tbody>
              {console.log(services)}
                {services.map(service => (
                  <tr>
                    <td>{service.id}</td>
                    <td>{service.NomService}</td>
                    <td>{litsDispo[service.id]}</td>
                    {service.Infirmiers &&
                    <td>{service.Infirmiers.map(infirmier =>( infirmier.NomInfirmier + " " + infirmier.PrenomInfirmier))}</td>
                    }
                    {!service.Infirmiers &&
                    <td>/</td>
                    }
                    <td><Button color="success" onClick={() => handleModify(service)}>Modifier / Supprimer</Button></td> 
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
                    <label className="form-control-label">Nom du Service</label>
                    <Input
                      className="form-control-alternative edit-event--title"
                      placeholder="Nom du Service"
                      type="text"
                      onChange={e => {
                        currentService.NomService = e.target.value
                      }
                      }
                      defaultValue={currentService.NomService}
                    />
                  </FormGroup>

                  <input className="edit-event--id" type="hidden" />
                </Form>
              </div>
              <div className="modal-footer">
                <Button color="primary" onClick={changeService} >
                  Modifier
                </Button>
                <Button
                  color="danger"
                  onClick={deleteServiceSweetAlert}
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
                    <label className="form-control-label">Nom du Service</label>
                    <Input
                      className="form-control-alternative edit-event--title"
                      placeholder="Nom du Service"
                      type="text"
                      onChange={e => {
                        newService.NomService = e.target.value
                      }
                      }
                    />
                  </FormGroup>

                  <input className="edit-event--id" type="hidden" />
                </Form>
              </div>
              <div className="modal-footer">
                <Button color="primary" onClick={addService} >
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

export default Service;