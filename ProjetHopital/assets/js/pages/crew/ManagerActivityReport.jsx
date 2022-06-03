import React from "react";
import classnames from "classnames";
// // JavaScript library that creates a callendar with events
// import { Calendar } from "@fullcalendar/core";
import { useState, useEffect, useRef } from 'react';
// import interaction from "@fullcalendar/interaction";


// import "react-perfect-scrollbar/dist/css/styles.css";
// import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "select2/dist/css/select2.min.css";
import "quill/dist/quill.core.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import DayPicker from 'react-day-picker';
import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/fr';
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import interactionPlugin from '@fullcalendar/interaction';
// import axios from "axios";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faDotCircle } from '@fortawesome/free-regular-svg-icons'

// react component used to create sweet alerts
import ReactBSAlert from "react-bootstrap-sweetalert";
import axios from "axios";
import jwtDecode from "jwt-decode";
// // reactstrap components
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

const token = window.localStorage.getItem("authToken");
const { Id: identifiant } = jwtDecode(token);

// import { events } from "../variables/general.js";

const ManagerActivityReport = (props) => {

  const calendarRef = useRef(null)

  const [selectedDay, setSelectedDay] = useState(new Date())
  const [modalAdd, setModalAdd] = useState()
  const { t } = useTranslation();
  const [modalChange, setModalChange] = useState()
  const [radios, setRadios] = useState("")
  const [alert, setAlert] = useState()
  let [event, setEvent] = useState({
    id: undefined,
    title: undefined,
    description: "Description",
    start: undefined,
    end: undefined,
    allDay: undefined
  })
  let currentUser = {}
  let [events, setEvents] = useState({})


  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {

    try {
      await axios.get("http://localhost:8000/api/profils?utilisateur.id=" + identifiant)
        .then((response) => currentUser = response.data["hydra:member"][0])
    } catch (error) {
      console.log(error);
    }

    try {
      const data = await axios
        .get("http://localhost:8000/api/events")
        .then((response) => setEvents(response.data["hydra:member"]))
    } catch (error) {
      console.log(error);
    }
  };

  const addNewEvent = () => {
    const api = calendarRef.current.getApi();
    // var newEvents = events;
    // newEvents.push({
    //   title: event.title,
    //   start: event.start,
    //   end: event.end,
    //   className: radios,
    //   allDay: event.allDay,
    //   description: event.description,
    //   id: parseInt(events.length + 1),
    //   profil:"/api/profils/" + identifiant
    // });
    // console.log(newEvents)
    console.log(currentUser)
    api.addEvent({
      title: event.title,
      start: event.start,
      end: event.end,
      description: event.description,
      className: radios,
      id: parseInt(events.length + 1)
    });
    try {
      axios.post("http://localhost:8000/api/events", {
        title: event.title,
        start: event.start,
        end: event.end,
        allDay: true,
        className: radios,
        description: event.description,
        profil: "/api/profils/" + currentUser.id
      })
      toast.success(t("addedEvent"))
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
    setModalAdd(false),
      console.log(events)
    console.log(event)
    // events = newEvents,
    event.start = undefined,
      event.end = undefined,
      event.description = undefined,
      setRadios("bg-info"),
      event.title = undefined
    event.allDay = undefined
    console.log(events)
  };

  const changeEvent = () => {
    const api = calendarRef.current.getApi();
    events.map((prop, key) => {
      console.log(prop)
      console.log(event)
      if (prop.id + "" === event.id + "") {
        var matchingEvent = api.getEventById(event.id);
        console.log(matchingEvent)
        matchingEvent.remove();
        api.addEvent({
          ...prop,
          title: event.title,
          className: radios,
          description: event.description
        });
        try {
          axios.patch("http://localhost:8000/api/events/" + event.id, {
            title: event.title,
            start: event.start,
            end: event.end,
            allDay: true,
            className: radios,
            description: event.description,
            profil: "/api/profils/" + currentUser.id
          })
          toast.success(t("modifiedEvent"))
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
        return {
          ...prop,
          title: event.title,
          className: radios,
          description: event.description
        };
      } else {
        return prop;
      }
    });
    setModalChange(false),
      // events = newEvents,
      setRadios("bg-info"),
      event.title = undefined,
      event.description = "Description",
      event.allDay = undefined,
      event.id = undefined
  };

  const deleteEventSweetAlert = () => {
    console.log(events)

    setAlert(
      <ReactBSAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
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
    // var newEvents = events.filter(
    //   prop => prop.id + "" !== event.id
    // );
    const api = calendarRef.current.getApi();
    events.map((prop, key) => {
      if (prop.id + "" === event.id + "") {
        var matchingEvent = api.getEventById(event.id);
        console.log(event)
        matchingEvent.remove();
        try {
          axios.delete("http://localhost:8000/api/events/" + event.id)
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
            style={{ display: "block", marginTop: "-100px" }}
            title="Success"
            onConfirm={() => setAlert(null)}
            confirmBtnBsStyle="primary"
            confirmBtnText="Ok"
            btnSize=""
          >
            Event deleted !
          </ReactBSAlert>
        )
      } else {
        return prop;
      }
    })
    setModalChange(false),
      // events: newEvents,
      setRadios("bg-info"),
      event.title = undefined,
      event.description = "Description",
      event.id = undefined,
      event.allDay = undefined
  }

  return (
    <>
      {alert}
      <div className="row">
        <div className="lg-9 md-8 sm-12">
          <div className="card">
            <FullCalendar
              plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: 'prev,next',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              ref={calendarRef}
              locale="fr"
              slotMinTime="07:00:00"
              slotMaxTime="20:00:00"
              height={700}
              editable={true}
              events={events}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              select={(info) => {
                setModalAdd(true),
                  event.start = info.startStr,
                  event.end = info.endStr,
                  setRadios("bg-info")
              }}
              eventClick={(item) => {
                console.log(item)
                event.id = parseInt(item.event.id),
                  event.title = item.event.title,
                  event.description = item.event.extendedProps.description,
                  event.allDay = item.event.allDay,
                  event.start = item.event.startStr,
                  event.end = item.event.endStr,
                  setRadios("bg-info"),
                  console.log(event)
                setModalChange(true)
              }
              }
              eventChange={(item) => {
                event.id = parseInt(item.event.id),
                  event.title = item.event.title,
                  event.description = item.event.extendedProps.description,
                  event.allDay = item.event.allDay,
                  event.start = item.event.startStr,
                  event.end = item.event.endStr
                try {
                  axios.post("http://localhost:8000/api/events", {
                    title: event.title,
                    start: event.start,
                    end: event.end,
                    allDay: true,
                    className: radios,
                    description: event.description,
                    profil: "/api/profils/" + currentUser.id
                  })
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
              }
            />
            <Modal
              isOpen={modalAdd}
              toggle={() => setModalAdd(false)}
              className="modal-dialog-centered modal-secondary"
            >
              <div className="modal-body">
                <form className="new-event--form">
                  <FormGroup>
                    <label className="form-control-label">Event title</label>
                    <Input
                      className="form-control-alternative new-event--title"
                      placeholder="Event Title"
                      type="text"
                      onChange={e =>
                        event.title = e.target.value
                      }
                    />
                  </FormGroup>
                  <FormGroup className="mb-0">
                    <label className="form-control-label d-block mb-3">
                      Status color
                    </label>
                    <ButtonGroup
                      className="btn-group-toggle btn-group-colors event-tag"
                      data-toggle="buttons"
                    >
                      <Button
                        className={classnames("bg-info", {
                          active: radios === "bg-info"
                        })}
                        color=""
                        type="button"
                        onClick={() => setRadios("bg-info")}
                      />
                      <Button
                        className={classnames("bg-warning", {
                          active: radios === "bg-warning"
                        })}
                        color=""
                        type="button"
                        onClick={() =>
                          setRadios("bg-warning")
                        }
                      />
                      <Button
                        className={classnames("bg-danger", {
                          active: radios === "bg-danger"
                        })}
                        color=""
                        type="button"
                        onClick={() => setRadios("bg-danger")}
                      />
                      <Button
                        className={classnames("bg-success", {
                          active: radios === "bg-success"
                        })}
                        color=""
                        type="button"
                        onClick={() =>
                          setRadios("bg-success")
                        }
                      />
                      <Button
                        className={classnames("bg-default", {
                          active: radios === "bg-default"
                        })}
                        color=""
                        type="button"
                        onClick={() =>
                          setRadios("bg-default")
                        }
                      />
                      <Button
                        className={classnames("bg-primary", {
                          active: radios === "bg-primary"
                        })}
                        color=""
                        type="button"
                        onClick={() => {
                          setRadios("bg-primary");
                        }}
                      />
                    </ButtonGroup>
                  </FormGroup>
                </form>
              </div>
              <div className="modal-footer">
                <Button
                  className="new-event--add"
                  color="primary"
                  type="button"
                  onClick={addNewEvent}
                >
                  Add event
                </Button>
                <Button
                  className="ml-auto"
                  color="link"
                  type="button"
                  onClick={() => setModalAdd(false)}
                >
                  Close
                </Button>
              </div>
            </Modal>
            <Modal
              isOpen={modalChange}
              toggle={() => setModalChange(false)}
              className="modal-dialog-centered modal-secondary"
            >
              <div className="modal-body">
                <Form className="edit-event--form">
                  <FormGroup>
                    <label className="form-control-label">Event title</label>
                    <Input
                      className="form-control-alternative edit-event--title"
                      placeholder="Event Title"
                      type="text"
                      onChange={e => {
                        event.title = e.target.value
                      }
                      }
                      defaultValue={event.title}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label d-block mb-3">
                      Status color
                    </label>
                    <ButtonGroup
                      className="btn-group-toggle btn-group-colors event-tag mb-0"
                      data-toggle="buttons"
                    >
                      <Button
                        className={classnames("bg-info", {
                          active: radios === "bg-info"
                        })}
                        color=""
                        type="button"
                        onClick={() => setRadios("bg-info")}
                      />
                      <Button
                        className={classnames("bg-warning", {
                          active: radios === "bg-warning"
                        })}
                        color=""
                        type="button"
                        onClick={() =>
                          setRadios("bg-warning")
                        }
                      />
                      <Button
                        className={classnames("bg-danger", {
                          active: radios === "bg-danger"
                        })}
                        color=""
                        type="button"
                        onClick={() => setRadios("bg-danger")}
                      />
                      <Button
                        className={classnames("bg-success", {
                          active: radios === "bg-success"
                        })}
                        color=""
                        type="button"
                        onClick={() =>
                          setRadios("bg-success")
                        }
                      />
                      <Button
                        className={classnames("bg-default", {
                          active: radios === "bg-default"
                        })}
                        color=""
                        type="button"
                        onClick={() =>
                          setRadios("bg-default")
                        }
                      />
                      <Button
                        className={classnames("bg-primary", {
                          active: radios === "bg-primary"
                        })}
                        color=""
                        type="button"
                        onClick={() => {
                          setRadios("bg-primary");
                        }}
                      />
                    </ButtonGroup>
                  </FormGroup>
                  <FormGroup>
                    <label className="form-control-label">Description</label>
                    <Input
                      className="form-control-alternative edit-event--description textarea-autosize"
                      placeholder="Event Desctiption"
                      type="textarea"
                      defaultValue={event.description}
                      onChange={e =>
                        event.description = e.target.value
                      }
                    />
                    <i className="form-group--bar" />
                  </FormGroup>
                  <input className="edit-event--id" type="hidden" />
                </Form>
              </div>
              <div className="modal-footer">
                <Button color="primary" onClick={changeEvent}>
                  Update
                </Button>
                <Button
                  color="danger"
                  onClick={() => {
                    setModalChange(false), () =>
                      deleteEventSweetAlert()
                  }}
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
          </div>
        </div>
      </div>
    </>
  )

}

export default ManagerActivityReport;