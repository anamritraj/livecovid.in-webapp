import { useState, useEffect } from "react";

function useNotificationsPermission() {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    navigator.permissions.query({ name: "notifications" }).then(result => {
      return result;
    }).then(result => {
      result.onchange = () => {
        if (result.state === "granted") {
          setHasPermission(true);
        } else {
          setHasPermission(false);
        }
      }
      switch (result.state) {
        case "granted":
          setHasPermission(true);
          break;

        default: {
          setHasPermission(false);
        }
      }
    })
  }, [])
  return hasPermission;
}

export default useNotificationsPermission;