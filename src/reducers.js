import {
  REQUEST_URL,
  RECEIVE_URL,
  REQUEST_FAILED,
  SEARCHBOX_CHANGE,
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

    case (SEARCHBOX_CHANGE):
      const text = action.text.toLowerCase();
      if (text == '')
        return Object.assign({}, state, {
          items: state.all_items,
        });
      const items = state.all_items || state.items;

      const filteredEvents = items.filter((e) =>
        e.title.toLowerCase().startsWith(text)
      );
      return Object.assign({}, state, {
        items: filteredEvents,
        all_items: state.items,
      });

    case (REQUEST_URL):
      return Object.assign({}, state, {isFetching: true});
      break;

    case REQUEST_FAILED:
      console.log('failed to fetch: ');
      console.log(action);
      return Object.assign({}, state, {isFetching: false});

    default:
  }
  return state;
}

export { events };
