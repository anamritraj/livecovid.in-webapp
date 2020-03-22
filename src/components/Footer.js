import React from "react";
import { Link } from "react-router-dom";

const Footer = props => {
  return (
    <footer className="footer">
      <span>
        <a href="http://twitter.com/anamritraj">Report an Error</a>
      </span>
      |
      <span>
        <Link to="/credits">Credits</Link>
      </span>
      |
      <span>
        <a href="http://twitter.com/anamritraj">Created by anamritraj</a>
      </span>
    </footer>
  );
};

export default Footer;
