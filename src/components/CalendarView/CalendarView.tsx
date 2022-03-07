import format from "date-fns/format";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import {
  Calendar,
  CalendarProps,
  dateFnsLocalizer,
  Event,
  SlotInfo,
  Views,
} from "react-big-calendar";

import { useEventDrawer, useEvents } from "../../context";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export interface ICalendarView extends Omit<CalendarProps, "localizer"> {}

const CalendarView: React.FC<ICalendarView> = (props) => {
  const { events } = useEvents();
  const { openDrawer } = useEventDrawer();

  const onSelectSlotOrEvent = (evt: Event) => {
    openDrawer(evt);
  };

  return (
    <Calendar
      {...props}
      selectable
      events={events}
      localizer={localizer}
      startAccessor="start"
      endAccessor="end"
      defaultView={Views.WEEK}
      onSelectSlot={(evt: SlotInfo) => {
        onSelectSlotOrEvent({
          title: "",
          start: evt.start as Date,
          end: evt.end as Date,
        });
      }}
      onSelectEvent={(evt) => {
        onSelectSlotOrEvent(evt);
      }}
    ></Calendar>
  );
};

export { CalendarView };
