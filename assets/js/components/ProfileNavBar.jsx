import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ProfileNavBar = (props) => {
  const { t } = useTranslation();

  return (
    <div className="row user-tabs m-2">
      <div className="col-lg-6 col-md-9 col-sm-9">
        <ul className="nav nav-tabs tabs" style={{ width: "175%" }}>
          <li className="tab" style={{ width: "25%" }}>
            <Link
              style={{
                color: "inherit",
                textDecoration: "inherit",
              }}
              to={{
                pathname: "/profileView",
              }}
            >
              <span className="visible-xs">
                <i className="fa fa-home"></i>
              </span>
              <span className="hidden-xs">{t("about")}</span>
            </Link>
          </li>
          <li className="tab" style={{ width: "25%" }}>
            <Link
              style={{
                color: "inherit",
                textDecoration: "inherit",
              }}
              to={{
                pathname: "/profileEducation",
              }}
            >
              <span className="visible-xs">
                <i className="fa fa-user"></i>
              </span>
              <span className="hidden-xs">{t("education")}</span>
            </Link>
          </li>
          <li className="tab" style={{ width: "25%" }}>
            <a href="#messages-2" data-toggle="tab" aria-expanded="true">
              <span className="visible-xs">
                <i className="fa fa-envelope-o"></i>
              </span>
              <span className="hidden-xs">{t("experience")}</span>
            </a>
          </li>

          <li className="tab" style={{ width: "25%" }}>
            <Link
              style={{
                color: "inherit",
                textDecoration: "inherit",
              }}
              to={{
                pathname: "/profileModification",
              }}
            >
              <span className="visible-xs">
                <i className="fa fa-cog"></i>
              </span>
              <span className="hidden-xs">{t("modify")}</span>
            </Link>
          </li>

          <div
            className="indicator"
            style={{ right: "476px", left: "0px" }}
          ></div>
          <div
            className="indicator"
            style={{ right: "476px", left: "0px" }}
          ></div>
        </ul>
      </div>
    </div>
  );
};

export default ProfileNavBar;
