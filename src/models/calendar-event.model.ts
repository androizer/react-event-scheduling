import { Event as IEvent } from "react-big-calendar";

export class Event implements IEvent {
  allDay?: boolean | undefined;
  title?: React.ReactNode | undefined;
  start?: Date | undefined;
  end?: Date | undefined;
  resource?: any;

  constructor(data: Partial<Event> = {}) {
    this.allDay = data.allDay;
    this.title = data.title;
    this.start = data.start
      ? data.start instanceof Date
        ? data.start
        : new Date(data.start)
      : new Date();
    this.end = data.end
      ? data.end instanceof Date
        ? data.end
        : new Date(data.end)
      : new Date();
    this.resource = data.resource;
  }
}
