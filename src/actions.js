import fetch from 'isomorphic-fetch'

export const REQUEST_EVENTS = 'REQUEST_EVENTS'
export const RECEIVE_EVENTS = 'RECEIVE_EVENTS'
export const FAILED_FETCH_EVENTS = 'FAILED_FETCH_EVENTS'

const URL = 'http://barteguiden.no/api/events'

export function request() {
  return {
    type: REQUEST_EVENTS,
  }
}

export function receive(json) {
  return {
    type: RECEIVE_EVENTS,
    data: json,
  }
}

export function fetchEvents() {
  return dispatch => {
    dispatch(request());
    return fetch(URL)
      .then(res => res.json())
      .then(json => dispatch(receive(json)))
      .catch(err => dispatch({
        type: FAILED_FETCH_EVENTS,
        error: err,
      }))
  }
}

