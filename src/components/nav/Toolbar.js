import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './nav.css';
import DrawerToggleButton from './DrawerToggleButton';
import SideDrawer from './SideDrawer';
import Backdrop from './BackDrop';

const Toolbar = (props) => {
  const [isSideDrawerOpen, setSideDrawerOpen] = useState(false);

  return (
    <header className="toolbar">
      <nav className="toolbar__navigation">
        <div className="toolbar__toggle-button">
          <DrawerToggleButton click={() => setSideDrawerOpen(true)} />
        </div>
        <div className="toolbar__logo">
          <Link to="/">
            <span className="covid">COVID-19</span>
            <span className="india">India</span>
          </Link>
        </div>
        <div className="spacer" />
        <div className="toolbar_navigation-items">
          <ul>
            <li>
              <Link to="/help">Help</Link>
            </li>
            <li>
              <Link to="/faqs">FAQs</Link>
            </li>
            <li>
              <Link to="credits">Credits</Link>
            </li>
          </ul>
        </div>
        <div className="dark-mode-toggle">
          <label className="dayNight">
            <input type="checkbox" onChange={props.handleDarkModeClick} checked={props.theme === 'light'} />
            <div />
          </label>
        </div>
      </nav>
      <SideDrawer
        show={isSideDrawerOpen}
        click={() => setSideDrawerOpen(false)}
      />
      {isSideDrawerOpen ? (
        <Backdrop click={() => setSideDrawerOpen(false)} />
      ) : null}
    </header>
  );
};

export default Toolbar;
