import React from "react";
import HelpResources from "../components/HelpResources";

const Credits = props => {
  return (
    <div className="container credits">
      <div className="helpful-resources">
        <h2>Credits</h2>
        <ul>
          <li>
            <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vSc_2y5N0I67wDU38DjDh35IZSIS30rQf7_NYZhtYYGU1jJYT6_kDx4YpF-qw0LSlGsBYP8pqM_a1Pd/pubhtml#">
              India Live Patient Database (CrowdSourced)
            </a>
          </li>
          <li>
            Contribute to the Github repository
            <a href="">Github</a>
          </li>
        </ul>
      </div>

      <HelpResources></HelpResources>
    </div>
  );
};

export default Credits;
