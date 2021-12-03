import * as ActionTypes from "./ActionTypes";

export const Sports = (state = {
    isLoading: true,
    errMess: null,
    sports: []
  }, action) => {
  switch (action.type) {
    case ActionTypes.SPORTS_LOADING:
      return {...state, isLoading: true, errMess: null, sports: []}

    case ActionTypes.SPORTS_FAILED:
      return {...state, isLoading: false, errMess: action.payload, Sports: []}

    case ActionTypes.ADD_SPORTS:
      return {...state, isLoading: false, errMess: null, sports: action.payload}

    default:
      return state;
  }
};