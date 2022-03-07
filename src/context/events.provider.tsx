import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { Event } from "../models";
import { EventStorage } from "../services";
import { uuid_v4 } from "../utils";
import { updateEventSchema } from "../utils/schemas";

type UseEventsManagerReturn = ReturnType<typeof useEventsManager>;

const EventsContext = createContext<UseEventsManagerReturn>({
  events: [],
  upsertEvent: () => {},
  addEvents: () => {},
});

function useEventsManager(evts: Event[] = []) {
  const [events, setEvents] = useState(evts);
  const eventStorage = useMemo(() => {
    return new EventStorage();
  }, []);

  /**
   * If an entity with that ID exists, it will perform
   * a shallow update and the specified fields will be
   * merged into the existing entity, with any matching
   * fields overwriting the existing values. If the entity
   * does not exist, it will be added.
   */
  const upsertEvent = useCallback(
    (evt: Event) => {
      let eventFound = false;
      const payload = events.reduce((acc, item) => {
        if (item.resource.id === evt.resource?.id) {
          eventFound = true;
          acc.push({ ...item, ...evt });
        } else {
          acc.push({ ...item });
        }
        return acc;
      }, [] as Event[]);
      if (!eventFound) {
        evt.resource = {
          id: uuid_v4(),
        };
        payload.push(evt);
      }
      setEvents([...payload]);
      eventStorage.setEvents(payload);
    },
    [events, eventStorage],
  );

  /**
   * accepts an array of entities or an object in the shape
   * of Record<EntityId, T>, and adds them if not already present.
   */
  const addEvents = useCallback((evts: Event[]) => {
    const payload = evts.reduce((acc, event) => {
      if (updateEventSchema.isValidSync(event)) {
        acc.push(new Event(event));
      }
      return acc;
    }, [] as Event[]);
    setEvents([...payload]);
  }, []);

  return { events, upsertEvent, addEvents };
}

export const EventsProvider: React.FC<
  Pick<UseEventsManagerReturn, "events">
> = ({ children, events }) => {
  return (
    <EventsContext.Provider value={useEventsManager(events)}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => {
  const ctx = useContext(EventsContext);
  return ctx;
};
