import fetch from 'isomorphic-fetch'

export const REQUEST_EVENTS = 'REQUEST_EVENTS'
export const RECEIVE_EVENTS = 'RECEIVE_EVENTS'
export const FAILED_FETCH_EVENTS = 'FAILED_FETCH_EVENTS'

const URL = 'http://www.barteguiden.no/api/events'

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
  console.log('calling fetchEvents');
  return dispatch => {
    dispatch(request());
    console.log('fetching ' + URL);
    return fetch(URL)
      .then(res => res.json())
      .then(json => dispatch(receive(json)))
      .catch(err => dispatch({type: FAILED_FETCH_EVENTS}))
  }
}

