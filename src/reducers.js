import {
  REQUEST_EVENT,
  RECEIVE_EVENT,
  FAILED_FETCH_EVENT,
  REQUEST_EVENTS,
  RECEIVE_EVENTS,
  FAILED_FETCH_EVENTS,

  REQUEST_URL,
  RECEIVE_URL,
  REQUEST_FAILED,
} from './actions'

const initialEventState = {
  items: [],
}

/** 
 * Here, we get the action that is fired with `dispatch`.
 * For our use, this means getting the data out of the objects
 * returned by the receiveEvent* functions.
 */
const events = (state = initialEventState, action) => {
  switch (action.type) {
    case (RECEIVE_URL):
      // set the data to the state, and flag
      // that we're not fetching anymore.
      const s = Object.assign({}, state, {});
      if (action.data.constructor === Array) {
        // @NOTE: do we need to clone the array?
        s.items = action.data.slice();
      } else  {
        s.item = action.data;
      }
      s.isFetching = false;
      return s;
    case (REQUEST_URL):
      return Object.assign({}, state, {isFetching: true});
      break;
    case FAILED_FETCH_EVENTS:
      console.log('failed to fetch: ');
      console.log(action);
    // @TODO: add some kind of error handing, if the fetch fails
      return Object.assign({}, state, {isFetching: false});
    default:
  }
  return state;
}

export { events };
