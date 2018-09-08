import { font } from "./font";
import { value } from "./value";
import { events } from "./events";
import { commands } from "./commands";

export function initActions(Sonalus) {
  font(Sonalus);
  value(Sonalus);
  events(Sonalus);
  commands(Sonalus);
}
