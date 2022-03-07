import { Event } from "react-big-calendar";
import { AbstractLocalStorage } from "./local-storage.abstract";

export class EventStorage extends AbstractLocalStorage {
  private key = "events";
  getEvents(): Event[] {
    const payload = super.getItem(this.key);
    return (JSON.parse(payload as string) ?? []) as Event[];
  }

  setEvents(events: Event[]) {
    const payload = JSON.stringify(events);
    super.setItem(this.key, payload);
  }

  clearEvents() {
    super.clear();
  }
}
