import React from "react";
import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { Calendar, view } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import PopUpAbsence from "../../components/popups/PopUpAbsence";
import "../../../styles/timeManagement.css";
import CleoOneLoader from "../../components/loaders/addCandidateLoader";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDotCircle } from '@fortawesome/free-regular-svg-icons'
import Popup from "../../components/Popup";

const token = window.localStorage.getItem("authToken");
const { Id: identifiant } = jwtDecode(token);

const TimeManagement = (props) => {
    const marksAbsences = []
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();
    const [value, onChange] = useState(new Date());
    const [loading, setLoading] = useState(true);
    const [absences, setAbsences] = useState({});
    const usedRgb = []
    let currentUser = {}

    useEffect(() => {
        fetchAbsences();
    }, []);

    const fetchAbsences = async () => {

        try {
            await axios.get("http://localhost:8000/api/profils?utilisateur.id=" + identifiant)
                .then((response) => currentUser = response.data["hydra:member"][0])
        } catch (error) {
            console.log(error);
        }

        try {
            setLoading(true);
            const data = await axios
                .get("http://localhost:8000/api/absences?profil.id=" + currentUser.id)
                .then((response) => setAbsences(response.data["hydra:member"]))
            setLoading(false);
        } catch (error) {
            console.log(error);
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

    const setMarks = (startDate, endDate, idAbsence, absence) => {
        startDate = new Date(startDate);
        endDate = new Date(endDate);
        let marksForThisAbsence = [idAbsence];
        for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
            marksForThisAbsence.push(toIsoString(d));
        }
        if (absence.color == undefined) {
            const colorForThisAbsence = getRandomColor();
            marksForThisAbsence.push(colorForThisAbsence);
            absence.color = colorForThisAbsence;
        }
        marksAbsences.push(marksForThisAbsence);
    }

    const getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        let correctRgb = false;
        while (correctRgb == false) {
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            if (!usedRgb.find(x => x === color)) {
                correctRgb = true;
            }
        }
        usedRgb.push(color);
        return color;
    }

    return (
        <>
            {!loading && (
                <div className="container">
                    <div className="calendar">
                        <Calendar
                            tileContent={({ date, view }) => {
                                for (const absence of marksAbsences) {
                                    if (absence.find(x => x === Moment(date).format("YYYY-MM-DD"))) {
                                        return <FontAwesomeIcon style={{ color: absence.slice(-1) }} icon={faDotCircle} />
                                    }
                                }

                            }}
                            onChange={onChange}
                            value={value}
                            minDetail="year"
                        />
                    </div>
                    <div className="col-md-12 text-center">
                        <PopUpAbsence />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <button className="btn-primary mt-2" id="activityReport">{t("activityReport")}</button>
                    </div>
                    <br />
                    <div className="absencesArray">
                        <table id="absencesTable" className="table table-dark">

                            <thead>
                                <tr>
                                    <th>{t("absenceprofile")}</th>
                                    <th>{t("absencetype")}</th>
                                    <th>{t("startabsencedate")}</th>
                                    <th>{t("endabsencedate")}</th>
                                    <th>{t("commentsAbsence")}</th>
                                </tr>
                            </thead>

                            <tbody>
                                {absences.map(absence => (<tr>
                                    {setMarks(absence.StartAbsenceDate, absence.EndAbsenceDate, absence.id, absence)}
                                    <td><FontAwesomeIcon style={{ color: absence.color }} icon={faDotCircle} /> {absence.profil.Lastname} {absence.profil.Firstname}</td>
                                    <td>{absence.AbsenceType}</td>
                                    <td>{toIsoString(absence.StartAbsenceDate)}</td>
                                    <td>{toIsoString(absence.EndAbsenceDate)}</td>
                                    <td>{absence.AbsenceReason}</td>
                                </tr>))}
                            </tbody>

                        </table>
                        {isOpen && (
                            <Popup
                                content={
                                    <>
                                        <h1>Hello Absence</h1>
                                    </>
                                }
                                handleClose={togglePopup}
                            />
                        )}
                    </div>
                </div>
            )}
            {loading && <CleoOneLoader />}
        </>
    );
};

export default TimeManagement;