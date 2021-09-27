import * as ActionTypes from "./ActionTypes";
import { SPORTEVENTS } from "../shared/sportEvents";

export const fetchSportEvents = () => (dispatch) => {

    dispatch(sportEventsLoading(true));

    setTimeout(() => {
        dispatch(addSportEvents(SPORTEVENTS));
    }, 2000);
}

export const sportEventsLoading = () => ({
  type: ActionTypes.SPORTEVENTS_LOADING
});

export const sportEventsFailed = (errmess) => ({
    type: ActionTypes.SPORTEVENTS_FAILED,
    payload: errmess
});

export const addSportEvents = (sportEvents) => ({
  type: ActionTypes.ADD_SPORTEVENTS,
  payload: sportEvents
});