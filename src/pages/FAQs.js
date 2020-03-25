import React from "react";
import HelpResources from "../components/HelpResources";

const FAQs = () => {
  return (
    <div className="container credits">
      <div className="helpful-resources faqs">
        <h2>Frequently asked questions</h2>
        <ul>
          <li className="question">Is this government offical website?</li>
          <li className="answer">
            NO. This is not associated with goverment. This is a crowdsourced
            application created by citizens like you. Please visit{" "}
            <a href="https://www.mohfw.gov.in/">MoHFW</a> website for official
            updates.
          </li>

          <li className="question">
            Why do you have higher count than MoH website?
          </li>
          <li className="answer">
            MoH data refreshes after scheduled time, the data on this website is
            collected from State Press Bulletins and Reliable news channels. The
            data is verified by volunteers.
          </li>

          <li className="question">
            How is the data gathered for this project?
          </li>
          <li className="answer">
            Data is collected from each State Press release, official government
            links and reputable news channel as source. Data is validated by
            group of volunteers and pushed into{" "}
            <a
              href="https://docs.google.com/spreadsheets/d/e/2PACX-1vSc_2y5N0I67wDU38DjDh35IZSIS30rQf7_NYZhtYYGU1jJYT6_kDx4YpF-qw0LSlGsBYP8pqM_a1Pd/pubhtml#"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Sheets
            </a>
          </li>

          <li className="question">How can I contribute?</li>
          <li className="answer">
            It's all open-source, please feel free to raise a pull-request. They
            are always welcome! <br></br>
            <a
              href="https://github.com/anamritraj/livecovid.in-webapp/issues/new"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://github.com/anamritraj/livecovid.in-webapp
            </a>{" "}
          </li>
          <li className="question">Do you accept donations/monetary help?</li>
          <li className="answer">
            Not really. As for the server costs, I had a spare server where the
            API is hosted. The webapp is hosted on Netlify which has a decent
            enough free tier. <br></br>
            <strong>
              If you have some extra cash/resources please consider donating to
              state/central relief funds.
            </strong>
          </li>

          <li className="question">How can I contact the creator?</li>
          <li className="answer">
            Create an issue{" "}
            <a
              href="https://github.com/anamritraj/livecovid.in-webapp/issues/new"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>{" "}
            , we will get back to you. Or you can send a DM{" "}
            <a
              href="https://twitter.com/anamritraj"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            .
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FAQs;
