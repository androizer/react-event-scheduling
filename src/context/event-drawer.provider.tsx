import { createContext, useCallback, useContext, useState } from "react";
import { Event } from "react-big-calendar";

type UseEventDrawerManagerReturn = ReturnType<typeof useEventDrawerManager>;

const EventDrawerContext = createContext<UseEventDrawerManagerReturn>({
  open: false,
  currentEvent: null,
  closeDrawer: () => {},
  openDrawer: () => {},
  toggleDrawer: () => {},
});

function useEventDrawerManager(isOpened: boolean = false) {
  const [open, setOpen] = useState(isOpened);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

  const toggleDrawer = useCallback(
    (event?: Event) => {
      if (event) {
        setCurrentEvent(event ?? null);
      }
      setOpen(!open);
    },
    [open],
  );

  const openDrawer = useCallback((event: Event) => {
    setOpen(true);
    setCurrentEvent(event);
  }, []);

  const closeDrawer = useCallback(() => {
    setOpen(false);
  }, []);

  return { open, currentEvent, toggleDrawer, openDrawer, closeDrawer };
}

export const EventDrawerProvider: React.FC<
  Pick<UseEventDrawerManagerReturn, "open">
> = ({ children, open }) => {
  return (
    <EventDrawerContext.Provider value={useEventDrawerManager(open)}>
      {children}
    </EventDrawerContext.Provider>
  );
};

export const useEventDrawer = () => {
  const ctx = useContext(EventDrawerContext);
  return ctx;
};
