import "./Footer.css";
import React from "react";

function Footer() {
  return (
    <footer className="mt-5">
      <div className="main">
        <p>
          <i>Mentions légales</i>
        </p>
        <p>
          <i>Contact: contact@friendnet.com </i>
        </p>
        <p>
          <i>Téléphone: </i>
        </p>
      </div>
      <div className="Copyright">
        <p>
          <i>© Copyright Friend Net 2023</i>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
