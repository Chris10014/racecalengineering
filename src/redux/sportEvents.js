// import { SPORTEVENTS } from "../shared/sportEvents";
import * as ActionTypes from "./ActionTypes";

export const SportEvents = (state = {
    isLoading: true,
    errMess: null,
    sportEvents: []
  }, action) => {
  switch (action.type) {
    case ActionTypes.SPORTEVENTS_LOADING:
      return {...state, isLoading: true, errMess: null, sportEvents: []}

    case ActionTypes.SPORTEVENTS_FAILED:
      return {...state, isLoading: false, errMess: action.payload, sportEvents: []}

    case ActionTypes.ADD_SPORTEVENTS:
      return {...state, isLoading: false, errMess: null, sportEvents: action.payload}

    default:
      return state;
  }
};
