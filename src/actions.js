import fetch from 'isomorphic-fetch'

export const REQUEST_URL = 'REQUEST_URL'
export const RECEIVE_URL = 'RECEIVE_URL'
export const REQUEST_FAILED = 'REQUEST_FAILED'

const URL = 'http://barteguiden.no/api/events'

/**
 * If the reducer needs more data, add a param here,
 * and check if it is `undefined` (for when we don't
 * supply any data).
 */
export function request() {
  return {
    type: REQUEST_URL,
  }
}

export function receive(json) {
  return {
    type: RECEIVE_URL,
    data: json,
  }
}

export function error(e) {
  return {
    type: REQUEST_FAILED,
    error: e,
  }
}

export function fetchEvent(id) {
  return dispatch => {
    dispatch(request());
    // @TODO: remove the settimeout.
    // only used for testing the Loading component
    setTimeout(() =>  {
    return fetch(URL + '/' + id)
      .then(res => res.json())
      .then(json => dispatch(receive(json)))
      .catch(err => dispatch(error(err)))
    }, 1000);
  }
}

export function fetchEvents() {
  return dispatch => {
    dispatch(request());
    // @TODO: remove the settimeout.
    // only used for testing the Loading component
    setTimeout(() => {
    return fetch(URL)
      .then(res => res.json())
      .then(json => dispatch(receive(json)))
      .catch(err => dispatch(error(err)))
    }, 1000);

  }
}

export const SEARCHBOX_CHANGE = 'SEARCHBOX_CHANGE'

export function searchbox_change(text) {
  return {
    type: SEARCHBOX_CHANGE,
    text: text
  };
}
