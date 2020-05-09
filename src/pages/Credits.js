import React from 'react';
import HelpResources from '../components/HelpResources';
import { HelmetDefault } from '../components/SEO';

const Credits = (props) => (
  <>
    <HelmetDefault title="Credits" />
    <div className="container credits">
      <div className="helpful-resources">
        <h2>Credits</h2>
        <ul>
          <li>
            <a
              href="https://docs.google.com/spreadsheets/d/e/2PACX-1vSc_2y5N0I67wDU38DjDh35IZSIS30rQf7_NYZhtYYGU1jJYT6_kDx4YpF-qw0LSlGsBYP8pqM_a1Pd/pubhtml#"
              rel="noopener noreferrer"
            >
              India Live Patient Database (CrowdSourced)
            </a>
          </li>
          <li>
            Inspired from another great project
            {' '}
            <br />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.covid19india.org/"
            >
              covid19india.org
            </a>
          </li>
          <li>
            Wanna Help? Please consider helping this project by donating some
            of your time.
            {' '}
            <br />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/anamritraj/livecovid.in-webapp"
            >
              Github
            </a>
          </li>
        </ul>
      </div>

      <HelpResources />
    </div>
  </>
);

export default Credits;
