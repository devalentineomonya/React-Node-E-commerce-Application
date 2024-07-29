import React from 'react';
import ReactDOM from 'react-dom';
import "./customalert.css";
import PropTypes from "prop-types"
import { BsX } from 'react-icons/bs';
const CustomAlert = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
<div className="modal-overlay">

    <div className="modal-wrapper custom-alert-danger" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="modal">
        <div className="modal-header">
          <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
            <BsX size={40} />
          </button>
        </div>
       <div className="modal-contant">
        
       </div>
      </div>
    </div>
</div>
  </React.Fragment>, document.body
) : null;

CustomAlert.propTypes = {
  isShowing:PropTypes.bool,
  hide:PropTypes.func
}

export default CustomAlert;