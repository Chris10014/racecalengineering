import { SPORTEVENTS } from "../shared/sportEvents";
import { COUNTRIES } from "../shared/countries";
import { SPORTS } from "../shared/sports";

export const initialState = {
    sportEvents: SPORTEVENTS,
    countries: COUNTRIES,
    sports: SPORTS
};

export const Reducer = (state = initialState, action) => {
    return state;
}