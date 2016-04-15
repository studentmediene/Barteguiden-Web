import {
  REQUEST_EVENTS,
  RECEIVE_EVENTS,
  FAILED_FETCH_EVENTS
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
    case (REQUEST_EVENTS):
      console.log('got request action');
      break;
    case FAILED_FETCH_EVENTS:
      console.log('failed to fetch: ');
      console.log(action);
    default:
  }
  return state;
}

export { events };
