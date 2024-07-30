import React from "react";
import ReactDOM from "react-dom";
import "./customalert.css";
import PropTypes from "prop-types";
import { BsCheck, BsExclamation, BsInfo } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
const CustomAlert = ({ isShowing, hide, type, message, setSearching }) =>
  ReactDOM.createPortal(
    <React.Fragment>
      <div className={`modal-overlay ${isShowing ? "show" : ""}`}>
        <div
          className={`modal-wrapper ${isShowing ? "show" : ""}`}
          aria-modal
          aria-hidden
          tabIndex={-1}
          role="dialog"
        >
          <div
            className={`modal ${
              type === "danger"
                ? "custom-alert-danger"
                : type === "warning"
                ? "custom-alert-warning"
                : type === "info"
                ? "custom-alert-info"
                : type === "success"
                ? "custom-alert-success "
                : ""
            } `}
          >
            <div className="modal-header">
              <button
                type="button"
                className="modal-close-button"
                data-dismiss="modal"
                aria-label="Close"
                onClick={()=>{hide(), setSearching(true)}}
              >
                <RxCross1 size={25} />
                
              </button>
            </div>
            <div className="modal-content">
              <div className="icon">
                {type === "danger" ? (
                  <BsExclamation
                    size={30}
                    className="bg-red-700 rounded-full text-white"
                  />
                ) : type === "warning" ? (
                  <BsExclamation
                    size={30}
                    className="bg-orange-500 rounded-full text-white"
                  />
                ) : type === "info" ? (
                  <BsInfo
                    size={30}
                    className="bg-sky-700 rounded-full text-white"
                  />
                ) : type === "success" ? (
                  <BsCheck
                    size={30}
                    className="bg-green-700 rounded-full text-white"
                  />
                ) : null}
              </div>
              <div>{message}</div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>,
    document.body
  );

CustomAlert.propTypes = {
  isShowing: PropTypes.bool,
  hide: PropTypes.func,
  message: PropTypes.string,
  type: PropTypes.string,
  setSearching:PropTypes.func
};

export default CustomAlert;
