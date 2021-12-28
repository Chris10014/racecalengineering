import { createStore , combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { SportEvents } from "./sportEvents";
import { Countries } from "./countries";
import { Sports } from "./sports";
import { EventDates } from "./eventDates";

export const ConfigureStore = () => {
    const store = createStore(
      combineReducers({
        sportEvents: SportEvents,
        countries: Countries,
        sports: Sports,
        eventDates: EventDates
      }),
      composeWithDevTools( applyMiddleware(thunk, logger))
    );

    return store;
}