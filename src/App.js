import React, { Suspense, useState, useEffect } from "react";
import "./App.scss";
import { Helmet } from "react-helmet";
import { getStateWiseData, getStats, getTestingData } from "./services/patients.service";
import { BrowserRouter as Router } from "react-router-dom";

import Toolbar from "./components/nav/Toolbar";
import Footer from "./components/Footer";
import { schemaMarkup } from "./components/SEO";
import SocialFooter from "./components/SocialFooter";
import Routes from "./Routes";
import Alert from "./components/Alert";
import { useDarkMode } from "./hooks/useDarkMode";
import { sendEventToGA } from "./services/analytics.service";

const Notification = React.lazy(() => import("./components/Notification"));
const showContentUpdatedHTML = <span>Website was updated in background, please reload to load the lastest version. <a href="#" onClick={() => window.location.reload()}>Click Here</a></span>

const Loading = () =>{
  return <div className="text-center">Loading...</div>;
}

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [statewise, setStatewise] = useState({});
  const [total, setTotal] = useState({});
  const [tested, setTested] = useState({});
  const [statewiseTestingData, setTestingData] = useState({})
  const [dayChange, setDayChange] = useState({});
  const [isMobile] = useState(document.documentElement.clientWidth < 768);
  const [ageGroup, setAgeGroup] = useState({});
  const [nationality, setNationality] = useState({});
  const [gender, setGender] = useState({});
  const [hospitalizationStatus, setHospitalizationStatus] = useState({});
  const [showContentUpdatedAlert, setShowContentUpdatedAlert] = useState(false);
  const [theme, toggleTheme, componentMounted] = useDarkMode();


  useEffect(()=>{
    (theme === 'dark') ? 
      document.querySelector('body').classList.add('dark') : 
        document.querySelector('body').classList.remove('dark');
  }, [theme]);

  useEffect(() => {
    window.addEventListener('contentUpdated', () => {
      setShowContentUpdatedAlert(true);
    })
    return () =>{
      window.removeEventListener('contentUpdated', null);
    }
  }, [])

  useEffect(() => {
    getStateWiseData().then(({ data }) => {
      setStatewise(data.statewise);
      setTotal(data.total);
      setDayChange(data.dayChange);
      setTested(data.tested);
      setIsLoading(false);
    });
    getTestingData().then(({data}) => setTestingData(data))
  }, []);

  if (!componentMounted || isLoading)
    return <Loading/>

  return (
    <>
      <Helmet>
        <script type="application/json">
          {JSON.stringify(schemaMarkup())}
        </script>
      </Helmet>
      <Router>
        <Suspense fallback={<Loading></Loading>}>
          <>
            <Toolbar 
              handleDarkModeClick={() => { toggleTheme(); sendEventToGA('User', 'Dark/Mode', theme)}}
              theme={theme}
            />
            <Notification></Notification>
            {!isLoading && <Routes
              isLoading={isLoading}
              statewise={statewise}
              statewiseTestingData = {statewiseTestingData}
              total={total}
              tested={tested}
              dayChange={dayChange}
              isMobile={isMobile}
              ageGroup={ageGroup}
              nationality={nationality}
              gender={gender}
              theme={theme}
              hospitalizationStatus={hospitalizationStatus}></Routes>}
            <SocialFooter></SocialFooter>
            <Footer></Footer>
          </>
          <Alert show={showContentUpdatedAlert} content={showContentUpdatedHTML}></Alert>
        </Suspense>
      </Router>
    </>)
}

export default App;
