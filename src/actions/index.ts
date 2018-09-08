import { font } from "./font";
import { value } from "./value";
import { events } from "./events";

export function initActions(Sonalus) {
  font(Sonalus);
  value(Sonalus);
  events(Sonalus);
}
