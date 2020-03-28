import React, { Component, Suspense } from "react";
import "./App.css";
import { getStateWiseData, getStats } from "./services/patients.service";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Help from "./pages/Help";
import Home from "./pages/Home";
import Toolbar from "./components/nav/Toolbar";
import Footer from "./components/Footer";
import GoogleAnalytics from "./components/GoogleAnalytics";
import WhatsappShare from "./components/whatsapp-share";

const Notification = React.lazy(() => import("./components/Notification"));
const Credits = React.lazy(() => import("./pages/Credits"));
const FAQs = React.lazy(() => import("./pages/FAQs"));
class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      statewise: {},
      total: {},
      tested: {},
      dayChange: {},
      isMobile: document.documentElement.clientWidth < 768,
      ageGroup: {},
      nationality: {},
      gender: {},
      hospitalizationStatus: {}
    };
  }

  componentDidMount() {
    getStateWiseData().then(({ data }) => {
      console.log(data);
      this.setState({
        ...this.state,
        statewise: data.statewise,
        total: data.total,
        dayChange: data.dayChange,
        tested: data.tested,
        isLoading: false
      });

      getStats().then(({ data }) => {
        this.setState({
          ...this.state,
          ageGroup: data.ageBrackets,
          hospitalizationStatus: data.hospitalizationStatus,
          gender: data.gender,
          nationality: data.nationality
        });
      });
    });
  }
  render() {
    return (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <div>
            <Toolbar />
            <Notification></Notification>
            <Switch>
              <Route exact path="/help">
                <Help></Help>
              </Route>
              <Route exact path="/credits">
                <Credits></Credits>
              </Route>
              <Route exact path="/faqs">
                <FAQs></FAQs>
              </Route>
              <Route exact path="/">
                <Home
                  isLoading={this.state.isLoading}
                  dayChange={this.state.dayChange}
                  total={this.state.total}
                  tested={this.state.tested}
                  statewise={this.state.statewise}
                  isMobile={this.state.isMobile}
                  ageGroup={this.state.ageGroup}
                  nationality={this.state.nationality}
                  gender={this.state.gender}
                  hospitalizationStatus={this.state.hospitalizationStatus}
                ></Home>
              </Route>
            </Switch>
            <Footer></Footer>
          </div>
          <GoogleAnalytics></GoogleAnalytics>
          <WhatsappShare></WhatsappShare>
        </Suspense>
      </Router>
    );
  }
}

export default App;
