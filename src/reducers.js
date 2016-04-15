import initialEvents from './init_data'

import { REQUEST_EVENTS, RECEIVE_EVENTS, FAILED_FETCH_EVENTS} from './actions'

const initialEventState = initialEvents;

const eventReducer = (state = initialEventState, action) => {
  return state
}

const initialApiState = {
  data: [],
}

const events = (state = initialApiState, action) => {
  switch (action.type) {
    case (RECEIVE_EVENTS):
      return {
        events: action.data
      }
    case (REQUEST_EVENTS):
      console.log('got request action');
      return state;
    case FAILED_FETCH_EVENTS:
      console.log('failed to fetch');
      break;
    default:
      return state;
  }
}

export { eventReducer, events };
