import React from "react";
import "./Footer.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Benjamin Rasoli. All Rights Reserved.</p>
        <ul className="footer-links">
          <li>
            <a
              href="https://www.linkedin.com/in/benjamin-rasoli-2948ab300"
              target="_blank"
            >
              <FaLinkedin size={30} />
            </a>
          </li>
          <li>
            <a href="https://github.com/BenjaminRasoli" target="_blank">
              <FaGithub size={30} />
            </a>
          </li>
          <li>
            <a href="mailto:benjaminrasoli05@gmail.com">
              <IoMdMail size={30} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
