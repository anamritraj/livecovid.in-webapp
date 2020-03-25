import React from "react";
import { withRouter } from "react-router-dom";

class GoogleAnalytics extends React.Component {
  constructor() {
    super();
    this.GA_TRACKING_ID = "UA-83719221-8";
  }

  componentWillUpdate({ location, history }) {
    const gtag = window.gtag;

    if (location.pathname === this.props.location.pathname) {
      // don't log identical link clicks (nav links likely)
      return;
    }
    if (history.action === "PUSH" && typeof gtag === "function") {
      gtag("config", this.GA_TRACKING_ID, {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname
      });
    }
  }

  render() {
    return null;
  }
}

export default withRouter(GoogleAnalytics);
