import { useState } from "react";
import "./PopUp.css";

export default function PopUp({ onClose }) {
  return (
    <div className="popup-inner">
      <h1>You did it!</h1>
      <h2>Congratulations!</h2>
      <button className="close-btn" onClick={onClose}>
        X
      </button>
    </div>
  );
}
