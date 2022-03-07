import { useEffect } from "react";
import { useEvents } from "../../context";
import { EventStorage } from "../../services";

const Startup: React.FC = ({ children }) => {
  const { addEvents } = useEvents();

  useEffect(() => {
    const storage = new EventStorage();
    const events = storage.getEvents();
    if (events.length) {
      console.log("Bulk Events Found");
      addEvents(events);
    }
  }, [addEvents]);

  return <>{children}</>;
};

export { Startup };
