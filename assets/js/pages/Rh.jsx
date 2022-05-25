import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Rh = (props) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="row">
        <div className="col-10 container">
          <p>{t("plugin")} Rh</p>
          <Link to="/addCandidate"> {t("addCandidate")} </Link>
          <br />
          <Link to="/crewsView">{t("crewsView")}</Link>
          <br />
          <Link to="/profilelist">{t("recruitment")}</Link>
          <br />
          <Link to="/crewsView">{t("integration")}</Link>
          <br />
          <Link to="/crewsView">{t("budget")}</Link>
          <br />
          <Link to="/timeManagement">{t("attendanceManagement")}</Link>
          <br />
          <Link to="/activityReport">{t("activityReportLink")}</Link>
        </div>
      </div>
    </>
  );
};

export default Rh;
