import {
  REQUEST_URL,
  RECEIVE_URL,
  REQUEST_FAILED,
  SEARCHBOX_CHANGE,
  DATE_SELECT,
} from './actions'

const initialEventState = {
  items: [],
  all_items: [],
}

/** 
 * Here, we get the action that is fired with `dispatch`.
 * For our use, this means getting the data out of the objects
 * returned by the receiveEvent* functions.
 */
const events = (state = initialEventState, action) => {
  if (action.type ==  RECEIVE_URL){
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

  } else if (action.type == SEARCHBOX_CHANGE) {
    const text = action.text.toLowerCase();
    if (text == '')
      return Object.assign({}, state, {
        searchBoxFilter: undefined,
      });
    return Object.assign({}, state, {
      searchBoxFilter: ((e) =>
        // @TODO: change startsWith to includes?
        e.title.toLowerCase().startsWith(text)
      ),
    });

  } else if (action.type == DATE_SELECT) {
    const date = action.date;
    if (!date)
      return Object.assign({}, state, {
        calendarFilter: undefined,
      });
    return Object.assign({}, state, {
      calendarFilter: function(e) {
        const eventDate = new Date(e.startAt);
        return eventDate.getYear() === date.getYear() &&
               eventDate.getMonth() === date.getMonth() &&
               eventDate.getDay() === date.getDay();
      }
    });

  } else if (action.type == REQUEST_URL) {
    return Object.assign({}, state, {isFetching: true});

  } else if (action.type == REQUEST_FAILED) {
    return Object.assign({}, state, {isFetching: false});

  }
  return state;
}

export { events };
