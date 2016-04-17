import {
  REQUEST_EVENT,
  RECEIVE_EVENT,
  FAILED_FETCH_EVENT,
  REQUEST_EVENTS,
  RECEIVE_EVENTS,
  FAILED_FETCH_EVENTS,
} from './actions'

const initialEventState = {
  items: [],
}

const events = (state = initialEventState, action) => {
  switch (action.type) {
    case (RECEIVE_EVENTS):
      return {
        items: action.data.map((e) => e),
      }
    case (RECEIVE_EVENT):
      return {
        item: action.data,
      }
    case (REQUEST_EVENT):
    case (REQUEST_EVENTS):
      break;
    case FAILED_FETCH_EVENTS:
      console.log('failed to fetch: ');
      console.log(action);
    // @TODO: add some kind of error handing, if the fetch fails
    default:
  }
  return state;
}

export { events };
