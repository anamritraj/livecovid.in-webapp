import React, { useState, useEffect } from "react";
import StateWiseRow from "./StateWiseRow";
import { getDistrictWiseData } from "../../services/patients.service";
import SortIcon from "./SortIcon";
import { sendEventToGA } from '../../services/analytics.service'
import { idb } from "../../services/idb.service";
import useNotificationsPermission from "../../hooks/useNotificationsPermissions";
import Modal from "../Modal";
import { askUserPermissions } from "../../services/subscription.service";

const promptMsg = <p>You need to allow permissions to get Notifications. When prompted click 'Allow' to get notifications</p>;
const blockedMsg = <p>Seems like you have denied the message permissions, you need to click "Allow" to give permissions for notifications. <a href="https://support.google.com/chrome/answer/3220216?co=GENIE.Platform%3DAndroid&hl=en&oco=1" target="_blank" rel="noopener noreferrer">Follow the instructions here</a></p>
const errorMsg = <p>There was an error, please try again.</p>
const unsupportedMsg = <p>Seems like your browser doesn't support notifications, it is possible you are in a private window.</p>
const successMsg = <p>Congratulations you have enabled notifications! <span role="img" aria-label="tada"> 🎉 </span></p>

const StatewiseTable = ({ statewise, isMobile }) => {
  const [states, setStates] = useState(Object.keys(statewise));
  const [districts, setDistricts] = useState(Object.keys({}));
  const [activeSorting, setActiveSorting] = useState("");
  const [currentOrder, setCurrentOrder] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(promptMsg);
  const [showGetNotificationButtons, setShowGetNotificationButtons] = useState(true);

  // For the intial sorting when it renders the first time, empty array as second parameters ensures this effect is run one time.
  useEffect(() => {
    sortStates("confirmed");
  }, []);

  const getNotificationPermissions = () => {
    askUserPermissions().then(msg => {
      setModalContent(successMsg);
      setShowGetNotificationButtons(false);
    }).catch(err => {
      switch (err.msg) {
        case 'blocked': setModalContent(blockedMsg); setShowGetNotificationButtons(false);
          break;
        case 'browser_unsupported': setModalContent(unsupportedMsg); setShowGetNotificationButtons(false);
          break;
        default: setModalContent(errorMsg); setShowGetNotificationButtons(true);
      }
    })
  }

  const hasNotificationPermissions = useNotificationsPermission();
  if (hasNotificationPermissions === false) {
    idb.clear();
  }

  useEffect(() => {
    getDistrictWiseData().then(response => {
      if (response.status === 200) {
        setDistricts(response.data);
      } else {
        console.log("Error in API");
      }
      setIsLoading(false);
    });
  }, []);

  const category = "User";
  const action = "Clicked Sorting";

  const sortStates = key => {
    let currentOrderNew = currentOrder;
    if (activeSorting === key) {
      currentOrderNew = currentOrderNew * -1;
    } else {
      currentOrderNew = 1;
    }
    let keys = Object.keys(statewise);
    keys.sort((a, b) => {
      return (
        currentOrderNew *
        (parseInt(statewise[b][key]) - parseInt(statewise[a][key]))
      );
    });
    setStates(keys);
    setActiveSorting(key);
    setCurrentOrder(currentOrderNew);
  };

  return isLoading ? null : (
    <div>
      <table className="statewise-cases table card">
        <thead>
          <tr>
            <th></th>
            <th>State</th>
            <th onClick={e => { sortStates("confirmed"); sendEventToGA(category, action, "confirmed") }}>
              <div className="heading">
                <div>Confirmed</div>
                <div className="sortIcon">
                  {activeSorting === "confirmed"
                    ? SortIcon(currentOrder)
                    : null}
                </div>
              </div>
            </th>
            <th onClick={e => { sortStates("recovered"); sendEventToGA(category, action, "recovered") }}>
              <div className="heading">
                <div>Recovered </div>
                <div className="sortIcon">
                  {activeSorting === "recovered"
                    ? SortIcon(currentOrder)
                    : null}
                </div>
              </div>
            </th>
            <th onClick={e => { sortStates("deaths"); sendEventToGA(category, action, "deaths") }}>
              <div className="heading">
                <div>Deaths </div>{" "}
                <div className="sortIcon">
                  {activeSorting === "deaths" ? SortIcon(currentOrder) : null}
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {states.map((stateCode, index) => {
            return (
              <StateWiseRow
                state={statewise[stateCode]}
                districts={districts[stateCode]}
                index={index + 1}
                key={stateCode}
                showNotificationModal={() => setShowModal(true)}
              ></StateWiseRow>
            );
          })}
        </tbody>
      </table>
      {showModal && <Modal>
        <div className="modal text-center">
          {modalContent}
          <div className="modal-button-wrapper">
            {showGetNotificationButtons && <button className="btn" onClick={getNotificationPermissions}>Okay</button>}
            <button className="btn" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      </Modal>}
    </div>
  );
};

export default StatewiseTable;
