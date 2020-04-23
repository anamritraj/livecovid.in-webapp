import React, { useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import ReactGA from 'react-ga';
import Help from "./pages/Help";
import Home from "./pages/Home";

const Credits = React.lazy(() => import("./pages/Credits"));
const FAQs = React.lazy(() => import("./pages/FAQs"));
ReactGA.initialize("UA-83719221-8");

function usePageViews() {
  let location = useLocation();
  useEffect(
    () => {
      ReactGA.pageview(location.pathname)
    },
    [location]
  )
}

const Routes = (props) => {
  usePageViews();
  return <Switch>
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
        isLoading={props.isLoading}
        dayChange={props.dayChange}
        total={props.total}
        tested={props.tested}
        statewise={props.statewise}
        statewiseTestingData = {props.statewiseTestingData}
        isMobile={props.isMobile}
        ageGroup={props.ageGroup}
        nationality={props.nationality}
        gender={props.gender}
        hospitalizationStatus={props.hospitalizationStatus}
      ></Home>
    </Route>
  </Switch>
}

export default Routes;