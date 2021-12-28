import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";
import {faLongArrowAltUp} from '@fortawesome/free-solid-svg-icons'

//dates collection
export const fetchEventDates = () => (dispatch) => {
  dispatch(eventDatesLoading(true));
  console.log("fetch dates 1");

  return fetch(baseUrl + "dates")  
    .then(      
      (response) => {
        console.log("fetch dates 2: ", response);
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((dates) => dispatch(addEventDates(dates)))
    .catch((error) => {
      console.log("fetch eventDates 3", error.message);
      dispatch(eventDatesFailed(error.message))}
      );
};

export const eventDatesLoading = () => ({
  type: ActionTypes.EVENTDATES_LOADING,
});

export const eventDatesFailed = (errmess) => ({
  type: ActionTypes.EVENTDATES_FAILED,
  payload: errmess,
});

export const addEventDates = (eventDates) => ({  
  type: ActionTypes.ADD_EVENTDATES,
  payload: eventDates,
});


//sportEvent collection
export const fetchSportEvents = () => (dispatch) => {
  dispatch(sportEventsLoading(true));
  console.log("fetch sportEvents 1");

  return fetch(baseUrl + "sportEvents")  
    .then(      
      (response) => {
        console.log("fetch sportEvents 2");
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((sportEvents) => dispatch(addSportEvents(sportEvents)))
    .catch((error) => {
      console.log("fetch sportEvents 3", error.message);
      dispatch(sportEventsFailed(error.message))}
      );
};

export const sportEventsLoading = () => ({
  type: ActionTypes.SPORTEVENTS_LOADING,
});

export const sportEventsFailed = (errmess) => ({
  type: ActionTypes.SPORTEVENTS_FAILED,
  payload: errmess,
});

export const addSportEvents = (sportEvents) => ({
  type: ActionTypes.ADD_SPORTEVENTS,
  payload: sportEvents,
});

//Sports collection
export const fetchSports = () => (dispatch) => {
  dispatch(sportsLoading(true));
  console.log("fetch sports 1");

  return fetch(baseUrl + "sports")
    .then(
      (response) => {
        console.log("fetch sports 2");
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((response) => response.json())
    .then((sports) => dispatch(addSports(sports)))
    .catch((error) => {
      console.log("fetch sports 3", error.message);
      dispatch(sportsFailed(error.message));
    });
};

export const sportsLoading = () => ({
  type: ActionTypes.SPORTS_LOADING,
});

export const sportsFailed = (errmess) => ({
  type: ActionTypes.SPORTS_FAILED,
  payload: errmess,
});

export const addSports = (sports) => ({
  type: ActionTypes.ADD_SPORTS,
  payload: sports,
});

//Login and logout actions
export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}
  
export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}
  
export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (creds) => (dispatch) => {
  console.log("from ActionCreators loginUser: ", JSON.stringify(creds));
  // We dispatch requestLogin to kickoff the call to the API
  dispatch(requestLogin(creds));

  return fetch(baseUrl + "users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  })
    .then(
      (response) => {
        console.log("from ActionCreators: ", JSON.stringify(creds));
        console.log("from ActionCreators: ", response);
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      if (response.success) {
        // If login was successful, set the token in local storage
        localStorage.setItem("token", response.token);
        localStorage.setItem("creds", JSON.stringify(creds));
        // Dispatch the success action
        dispatch(receiveLogin(response));
      } else {
        var error = new Error("Error " + response.status);
        error.response = response;
        throw error;
      }
    })
    .catch((error) => dispatch(loginError(error.message)));
};

//Logout
export const requestLogout = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST,
  };
};

export const receiveLogout = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS,
  };
};

// Logs the user out
export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout());
  localStorage.removeItem("token");
  localStorage.removeItem("creds");
  dispatch(receiveLogout());
};

export const postFavourite = (dishId) => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");

  return fetch(baseUrl + "favourites/" + dishId, {
    method: "POST",
    body: JSON.stringify({ _id: dishId }),
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
};
