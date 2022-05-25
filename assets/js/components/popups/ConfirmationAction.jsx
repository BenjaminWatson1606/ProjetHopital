import React from "react";
import { useEffect } from "react";
import Popup from "../Popup";
import useState from "react-usestateref";
import { useTranslation } from "react-i18next";

function ConfirmationAction({ action, message, style, setCrewToDelete, id }) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {}, []);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const actionToMake = () => {
    action;
  };

  return (
    <>
      <span className={style} onClick={togglePopup}>
        X
      </span>

      {isOpen && (
        <Popup
          content={
            <>
              <p>
                {t("validationMessage1")} {message} ?<br></br>
                {t("validationMessage2")}
              </p>
              <div>
                <span
                  className="badge badge-secondary button btn-success btn-sm m-2"
                  onClick={() => {
                    setCrewToDelete(id), action(), togglePopup();
                  }}
                >
                  {t("yes")}
                </span>
                <span
                  className="badge badge-secondary button btn-danger btn-sm m-2"
                  onClick={() => togglePopup()}
                >
                  {t("no")}
                </span>
              </div>
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </>
  );
}

export default ConfirmationAction;
