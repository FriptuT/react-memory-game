import { useState } from "react";
import "./PopUp.css";

export default function PopUp({ onClose }) {
  return (
    <div className="popup-inner">
      <h1>You are now bewitched!</h1>
      <button className="close-btn" onClick={onClose}>
        X
      </button>
    </div>
  );
}
