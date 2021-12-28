import * as ActionTypes from "./ActionTypes";

export const EventDates = (state = {
    isLoading: true,
    errMess: null,
    eventDates: []
  }, action) => {
  switch (action.type) {
    case ActionTypes.EVENTDATES_LOADING:
      return {...state, isLoading: true, errMess: null, eventDates: []}

    case ActionTypes.EVENTDATES_FAILED:
      return {...state, isLoading: false, errMess: action.payload, eventDates: []}

    case ActionTypes.ADD_EVENTDATES:
      return {...state, isLoading: false, errMess: null, eventDates: action.payload}

    default:
      return state;
  }
};