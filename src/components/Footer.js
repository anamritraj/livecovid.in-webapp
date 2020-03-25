import React from "react";
import { Link } from "react-router-dom";

const Footer = props => {
  return (
    <footer className="footer">
      <span>
        <a
          href="https://github.com/anamritraj/livecovid.in-webapp/issues/new"
          target="_blank"
          rel="noopener noreferrer"
        >
          Report an error
        </a>
      </span>
      |
      <span>
        <Link to="/help">Help</Link>
      </span>
      |
      <span>
        <a
          href="http://twitter.com/anamritraj"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by anamritraj
        </a>
      </span>
    </footer>
  );
};

export default Footer;
