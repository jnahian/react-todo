import React, {useState, useEffect} from 'react';
import "../assets/Confirm.css";

const Confirm = ({show, title, body, confirmButton, closeButton, confirmAction}) => {
  const [open, setOpen] = useState(false);

  const closeConfirm = (e) => {
    e.preventDefault();
    setOpen(false);
  }

  useEffect(() => {
    setOpen(show);
  }, [show]);

  return (
    <div className={`App-confirm-container ${open ? 'open' : ''}`}>
      <div className="confirm-body">
        <div className="confirm-head">
          <h1>{title}</h1>
        </div>
        <div className="confirm-content">
          <p>{body}</p>
        </div>
        <div className="confirm-actions">
          <button type="button" className={closeButton.classNames} onClick={closeConfirm}>{closeButton.title}</button>
          <button type="button" className={confirmButton.classNames} onClick={confirmAction}>{confirmButton.title}</button>
        </div>

      </div>
    </div>
  );
};

Confirm.defaultProps = {
  show: false,
  title: 'Confirm',
  body: 'Are you sure, you want to perform this actions?',
  closeButton: {
    title: "Close",
    classNames: "small-button warning"
  },
  confirmButton: {
    title: "Confirm",
    classNames: "small-button danger"
  },
  confirmAction: () => {
    console.log("Confirm");
  }
}

export default Confirm;
