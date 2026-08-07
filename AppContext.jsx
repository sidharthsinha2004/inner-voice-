import { createContext, useContext, useState } from "react";

import thoughtsData from "../store/thoughts";
import alertsData from "../store/alerts";
import moderatorQueue from "../store/moderatorQueue";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [thoughts, setThoughts] = useState(thoughtsData);

  const [alerts, setAlerts] = useState(alertsData);

  const [reports, setReports] = useState(moderatorQueue);

  const [username, setUsername] = useState("Anonymous Owl");

  function addNotification(title, message) {
    const notification = {
      id: Date.now(),
      type: title,
      message,
      time: "Just now",
      read: false,
    };

    setAlerts([notification, ...alerts]);
  }

  return (
    <AppContext.Provider
      value={{
        thoughts,
        setThoughts,

        alerts,
        setAlerts,

        reports,
        setReports,

        username,
        setUsername,

        addNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);