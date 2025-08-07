import React from "react";
import "./Thanks.css";
import pttlogo from "../components/pttlogo.png";

const Thanks = () => {
  return (
    <div className="thanks-page">
      <div className="thanks-card">
        <div className="thanks-header">
          <img src={pttlogo} alt="PTT Logo" />
          <h2>Teşekkürler!</h2>
        </div>
        <p className="thanks-message">
          Formunuz başarıyla alınmıştır. Katkınız için teşekkür ederiz.
        </p>
      </div>
    </div>
  );
};

export default Thanks;
