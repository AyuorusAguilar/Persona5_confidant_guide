import { state } from "/js/state.js"
import "./js/confidants.js";
import "./js/ui_listeners.js";
import bar from "./js/scrollbar_v2.js";

state.confitandsBar = new bar('.confidants-row', '.custom-scrollbar-container', '.custom-scrollbar', 'h')
state.bodyBar = new bar('.content-body', '.confidant-scroll-bg', '.confidant-scroll-thumb', 'v', 12)