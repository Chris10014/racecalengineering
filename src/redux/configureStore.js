import { createStore , combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { SportEvents } from "./sportEvents";
import { Countries } from "./countries";
import { Sports } from "./sports";

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            sportEvents: SportEvents,
            countries: Countries,
            sports: Sports
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}