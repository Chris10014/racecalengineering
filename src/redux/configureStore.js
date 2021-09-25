import { createStore , combineReducers} from "redux";
import { SportEvents } from "./sportEvents";
import { Countries } from "./countries";
import { Sports } from "./sports";

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            sportEvents: SportEvents,
            countries: Countries,
            sports: Sports
        })
    );

    return store;
}