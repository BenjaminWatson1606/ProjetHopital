import React, { useState, useEffect, useRef } from 'react';
import AuthAPI from "../services/authAPI";
import { useTranslation } from "react-i18next";
import axios from "axios";
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
    const [alert, setAlert] = useState();
    const [modalChange, setModalChange] = useState(false);
    const [modalAdd, setModalAdd] = useState(false);
    let [currentChambre, setCurrentChambre] = useState({
      id: undefined,
      ServiceId: undefined
    });
    let [newChambre, setNewChambre] = useState({
      id: undefined,
      ServiceId: undefined
    });

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
      }}

      const addChambre = () => {
        try {
          axios.post("http://localhost:8000/api/chambres", {
            Service: "/api/services/" + newChambre.ServiceId.toString(),
          })
          toast.success("Chambre ajoutée")
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
  
      const handleModify = (chambre) => {
        currentChambre.id = chambre.id
        currentChambre.ServiceId = chambre.Service.id
        setModalChange(true)
      }
  
      const changeChambre = () => {
        const headers = { 'Content-Type': 'application/merge-patch+json' }
        try {
          axios.patch("http://localhost:8000/api/chambres/" + currentChambre.id, {
            Service: "/api/services/" + currentChambre.ServiceId.toString(),
          }, 
          {headers} )
          toast.success("Chambre modifiée")
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
  
      const deleteChambreSweetAlert = () => {
        setAlert(
          <ReactBSAlert
            warning
            style={{ display: "block", marginTop: "0px" }}
            title="Are you sure?"
            onConfirm={deleteChambre}
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
  
      const deleteChambre = () => {
  
        try {
          axios.delete("http://localhost:8000/api/chambres/" + currentChambre.id)
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
            Chambre supprimée !
          </ReactBSAlert>
        )
        setModalChange(false),
        currentChambre.id = undefined
        currentChambre.ServiceId = undefined
      }
    
  
    return (
        <>
          {alert}
          <div className="HopitalArray">
            <table id="chambresTable" className="table table-dark">

              <thead>
                  <tr>
                    <th>Numero</th>
                    <th>Service</th>
                    <th>Modifier</th>
                  </tr>
              </thead>
              <tbody>
                {chambres.map(chambre => (
                  <tr>
                    <td>{chambre.id}</td>
                    <td>{chambre.Service.NomService}</td>
                    <td><Button color="success" onClick={() => handleModify(chambre)}>Modifier / Supprimer</Button></td> 
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
                    <label className="form-control-label">Service associé</label>
                    <Input
                      className="form-control-alternative edit-event--title"
                      placeholder="Service associé"
                      type="number"
                      onChange={e => {
                        currentChambre.ServiceId = e.target.value
                      }
                      }
                      defaultValue={currentChambre.ServiceId}
                    />
                  </FormGroup>
                  <input className="edit-event--id" type="hidden" />
                </Form>
              </div>
              <div className="modal-footer">
                <Button color="primary" onClick={changeChambre} >
                  Modifier
                </Button>
                <Button
                  color="danger"
                  onClick={deleteChambreSweetAlert}
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
                    <label className="form-control-label">Service associé</label>
                    <Input
                      className="form-control-alternative edit-event--title"
                      placeholder="Service associé"
                      type="number"
                      onChange={e => {
                        newChambre.ServiceId = e.target.value
                      }
                      }
                    />
                  </FormGroup>
                  <input className="edit-event--id" type="hidden" />
                </Form>
              </div>
              <div className="modal-footer">
                <Button color="primary" onClick={addChambre} >
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

export default Chambre;