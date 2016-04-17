import fetch from 'isomorphic-fetch'

export const REQUEST_EVENT = 'REQUEST_EVENT'
export const RECEIVE_EVENT = 'RECEIVE_EVENT'
export const FAILED_FETCH_EVENT = 'FAILED_FETCH_EVENT'

export const REQUEST_EVENTS = 'REQUEST_EVENTS'
export const RECEIVE_EVENTS = 'RECEIVE_EVENTS'
export const FAILED_FETCH_EVENTS = 'FAILED_FETCH_EVENTS'

const URL = 'http://barteguiden.no/api/events'

// NOTE: do we really need all these functions? 
export function requestEvents() {
  return {
    type: REQUEST_EVENTS,
  }
}

export function requestEvent(id) {
  return {
    type: REQUEST_EVENTS,
    data: id
  }
}

export function receiveEvent(json) {
  return {
    type: RECEIVE_EVENT,
    data: json,
  }
}

export function receiveEvents(json) {
  return {
    type: RECEIVE_EVENTS,
    data: json,
  }
}

export function fetchEvent(id) {
  console.log('want to fetch event ' + id);
  return dispatch => {
    dispatch(requestEvent(id));
    return fetch(URL + '/' + id)
      .then(res => res.json())
      .then(json => dispatch(receiveEvent(json)))
      .catch(err => dispatch({
        type: FAILED_FETCH_EVENT,
        error: err,
      }))
  }
}

export function fetchEvents() {
  console.log('want to fetch all events');
  return dispatch => {
    dispatch(requestEvents());
    return fetch(URL)
      .then(res => res.json())
      .then(json => dispatch(receiveEvents(json)))
      .catch(err => dispatch({
        type: FAILED_FETCH_EVENTS,
        error: err,
      }))
  }
}
