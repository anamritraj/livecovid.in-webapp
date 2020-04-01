import React, { useState, useEffect } from "react";

const updateStatusInIDB = (notificationKey, alarmStatus, confirmed, idb) => {
  if (alarmStatus === false) {
    idb.delete(notificationKey);
    return;
  }
  const districtState = {
    alarmStatus: alarmStatus,
    numberOfPatients: confirmed - 10
  };
  idb.set(notificationKey, districtState);
};

const BellIcon = ({ districtName, stateCode, confirmed, idb }) => {
  const [isBellActive, setIsBellActive] = useState(false);
  const districtKey = stateCode + "_" + districtName;

  useEffect(() => {
    idb.get(districtKey).then(bellStatus => {
      if (bellStatus) {
        setIsBellActive(bellStatus.alarmStatus);
        updateStatusInIDB(districtKey, bellStatus.alarmStatus, confirmed, idb);
      }
    });
  }, []);

  return (
    <svg
      onClick={() => {
        const newStatus = !isBellActive;
        setIsBellActive(newStatus);
        updateStatusInIDB(districtKey, newStatus, confirmed, idb);
      }}
      height="20"
      className={"bell-icon" + (isBellActive ? " active" : "")}
      viewBox="0 0 16 16"
      stroke="#000"
      fill="#fff"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m11 9.17139v-3.17139c0-2.08728-1.28815-3.87543-3.10931-4.62311-.263489-.796814-1.00653-1.37689-1.89069-1.37689-.884155 0-1.6272.580078-1.89069 1.37689-1.82117.747681-3.10931 2.53583-3.10931 4.62311v3.17188c0 .263184-.106934.520508-.292969.707031l-.706543.706543-.0004882 2.41455h4.27814c.346863.59491.984741 1 1.72186 1 .737122 0 1.375-.40509 1.72186-1h4.27814v-2.41455l-.707031-.706055c-.188965-.189453-.292969-.440918-.292969-.708008z"
        transform="translate(2 1)"
      />
      <path
        d="m.669922 0c-.444336 1.01611-.669922 2.09277-.669922 3.2002 0 1.10742.225586 2.18408.669922 3.2002l.916016-.400391c-.388672-.88916-.585938-1.83154-.585938-2.7998 0-.968262.197266-1.91064.585938-2.7998l-.916016-.400391z"
        transform="translate(0 4.8)"
      />
      <path
        d="m.916016 0-.916016.400391c.388672.88916.585938 1.83154.585938 2.7998 0 .968262-.197266 1.91064-.585938 2.7998l.916016.400391c.444336-1.01611.669922-2.09277.669922-3.2002 0-1.10742-.225586-2.18408-.669922-3.2002z"
        transform="translate(14.414 4.8)"
      />
    </svg>
  );
};

export default BellIcon;
