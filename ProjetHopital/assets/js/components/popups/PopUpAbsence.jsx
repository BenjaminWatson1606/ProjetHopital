import React, { useEffect } from "react";
import useState from "react-usestateref";
import Popup from "../Popup";
import { useTranslation } from "react-i18next";
import Field from "../../components/forms/Field";
import Moment from "moment";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import axios from "axios";
import Select from 'react-select';

const token = window.localStorage.getItem("authToken");
const { Id: identifiant } = jwtDecode(token);

function PopUpAbsence() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const [absence, setAbsence, absenceRef] = useState({
    StartAbsenceDate: "",
    EndAbsenceDate: "",
    AbsenceReason: "",
    AbsenceStatus: "En cours de validation",
  })

  const [currentUser, setCurrentUser] = useState({});

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };


  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      await axios.get("http://localhost:8000/api/profils?utilisateur.id=" + identifiant)
        .then((response) => setCurrentUser(response.data["hydra:member"]))
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post("http://localhost:8000/api/absences", {
        StartAbsenceDate: absence.StartAbsenceDate,
        EndAbsenceDate: absence.EndAbsenceDate,
        AbsenceReason: absence.AbsenceReason,
        AbsenceStatus: absence.AbsenceStatus,
        AbsenceType: selectedOption.value,
        profil: "/api/profils/" + currentUser[0].id,
      })
      toast.success(t("addedAbsence"))
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
  };

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setAbsence({ ...absence, [name]: value });
    console.log(absence)
  };
  const [selectedOption, setSelectedOption] = useState(null)

  const options = [
    { value: 'RTT', label: 'RTT' },
    { value: 'Arrêt maladie', label: 'Arrêt maladie' },
    { value: 'Congés maternité', label: 'Congés maternité' }
  ]

  return (
    <>
      <button onClick={togglePopup} className="btn-primary mt-2" id="absenceReport">{t("absencetitle")}</button>
      {isOpen && (
        <Popup
          content={
            <>
              <form role="form" onSubmit={handleSubmit}>
                <h1>{t("absencetitle")}</h1>
                <Field
                  label={t("startabsencedate")}
                  name="StartAbsenceDate"
                  placeholder={t("startabsencedate")}
                  value={Moment(absence.StartAbsenceDate).format(
                    "YYYY-MM-DD"
                  )}
                  onChange={handleChange}
                  type="date"
                />
                <Field
                  label={t("endabsencedate")}
                  name="EndAbsenceDate"
                  placeholder={t("endabsencedate")}
                  value={Moment(absence.EndAbsenceDate).format(
                    "YYYY-MM-DD"
                  )}
                  onChange={handleChange}
                  type="date"
                />
                <Field
                  label={t("absencereason")}
                  name="AbsenceReason"
                  placeholder={t("absencereason")}
                  value={absence.AbsenceReason}
                  onChange={handleChange}
                />
                <label>{t("absencetype")}</label>
                <Select
                  options={options}
                  onChange={setSelectedOption}
                  name="AbsenceType"
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
                <button type="submit" className="btn-primary button-form">
                  {t("submit")}
                </button>
              </form>
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </>
  );
}

export default PopUpAbsence;
