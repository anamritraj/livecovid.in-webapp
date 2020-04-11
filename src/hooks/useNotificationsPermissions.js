import React, { useState, useEffect} from "react";

function useNotificationsPermission(){
  const [hasPermission, setHasPermission] = useState(null);
  useEffect(() => {
    if(Notification && Notification.permission === 'granted'){
      setHasPermission(true);
    }else{
      setHasPermission(false);
    }
  }, [])
  return hasPermission;
}

export default useNotificationsPermission;