import React from "react";
import { useState, useEffect } from "react";
import CleoOneLoader from "../../components/loaders/addCandidateLoader";
import Moment from "moment";
import { useTranslation } from "react-i18next";

import axios from "axios";

const CollaboratorView = (props) => {
  const { t } = useTranslation();
  var id = 1;
  try {
    id = props.location.state.id;
    window.localStorage.setItem("CollaboratorId", id);
  } catch (error) {
    console.log(error);
  }
  id = window.localStorage.getItem("CollaboratorId");
  const [profilInfos, setProfilInfos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfil();
  }, []);

  const fetchProfil = async () => {
    setLoading(true);
    try {
      await axios
        .get("http://localhost:8000/api/profils/" + id)
        .then((response) => setProfilInfos(response.data));
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <>
      <div className="container">
        {!loading && (
          <div className="collab-main-body">
            <div className="row collab-gutters-sm">
              <div className="col-md-4 collab-mb-3">
                <div className="collab-card">
                  <div className="collab-card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                        alt="Admin"
                        className="rounded-circle"
                        width="150"
                      />
                      <div className="mt-3">
                        <h4>{profilInfos.Firstname}</h4>
                        <p className="text-secondary mb-1">
                          {profilInfos.Status}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="collab-card mt-3">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 className="mb-0">{t("actualRemuneration")}</h6>
                      <span className="text-secondary">
                        {profilInfos.ActualRemuneration}
                      </span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                      <h6 className="mb-0">{t("wantedRemuneration")}</h6>
                      <span className="text-secondary">
                        {profilInfos.RemunerationWanted}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-8">
                <div className="collab-card collab-mb-3">
                  <div className="collab-card-body">
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">{t("fullName")}</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {profilInfos.Firstname} {profilInfos.Lastname}
                      </div>
                    </div>
                    <hr></hr>
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">{t("birthdate")}</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {Moment(profilInfos.Datebirth).format("DD-MM-YYYY")} (
                        {Moment().diff(
                          Moment(profilInfos.Datebirth, "YYYYMMDD"),
                          "years"
                        )}{" "}
                        {t("yearsOld")})
                      </div>
                    </div>
                    <hr></hr>
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">{t("biography")}</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {profilInfos.Biography}
                      </div>
                    </div>

                    <hr></hr>
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">{t("address")}</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {profilInfos.Address}
                      </div>
                    </div>
                    <hr></hr>
                    <div className="row">
                      <div className="col-sm-12">
                        <a
                          className="btn btn-info "
                          target="__blank"
                          href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills"
                        >
                          Edit
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row collab-gutters-sm">
                  <div className="col-sm-6 collab-mb-6">
                    <div className="collab-card collab-h-100">
                      <div className="collab-card-body">
                        <h6 className="d-flex align-items-center collab-mb-3">
                        {t("skills")}
                        </h6>
                        {console.log(profilInfos.skillAssignations)}
                        {profilInfos.skillAssignations.map((skill) => (
                          <>
                            <small>{skill.IdSkillAssignation.Caption}</small>
                            <div
                              className="progress collab-mb-3"
                              style={{ height: "5px" }}
                            >
                              <div
                                className="progress-bar bg-primary"
                                role="progressbar"
                                style={{ width: "80%" }}
                                aria-valuenow="80"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                          </>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 collab-mb-6">
                    <div className="collab-card collab-h-100">
                      <div className="collab-card-body">
                        <h6 className="d-flex align-items-center collab-mb-3">
                        {t("currentProjects")}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button
                className="button btn-success w-20"
                onClick={() => console.log(profilInfos)}
              >
                crew
              </button>
              <span
                className="badge badge-secondary button btn-dark btn-sm m-2"
                onClick={console.log("hello")}
              >
                {t("modify")}
              </span>
            </div>
          </div>
        )}
      </div>
      {loading && <CleoOneLoader />}
    </>
  );
};

export default CollaboratorView;
