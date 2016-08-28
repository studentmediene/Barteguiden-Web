import {
  REQUEST_URL,
  RECEIVE_URL,
  REQUEST_FAILED,
  SEARCHBOX_CHANGE,
  DATE_SELECT,
  CATEGORY_SELECT,
} from './actions'

import moment from 'moment'

const initialEventState = {
  items: [],
  all_items: [],
  categories: [],
}

// @TODO: Split this up into multiple smaller reducers..
const events = (state = initialEventState, action) => {
  switch (action.type) {
    case RECEIVE_URL:
      // set the data to the state, and flag
      // that we're not fetching anymore.
      const s = Object.assign({}, state, {});
      if (action.data.constructor === Array) {
        // @NOTE: do we need to clone the array?
        const data = action.data.slice();
        data.sort(function (a, b) {return a.date < b.date});
        s.items = data;
      } else  {
        // what .. ?
        s.item = action.data;
      }
      s.isFetching = false;
      return s;
    case SEARCHBOX_CHANGE:
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
    case DATE_SELECT:
      const date = action.date;
      if (!date)
        return Object.assign({}, state, {
          calendarFilter: undefined,
        });
      return Object.assign({}, state, {
        calendarFilter: function(e) {
          const eventDate = moment(e.startAt);
          return eventDate.isSame(date, 'day');
        }
      });
    case CATEGORY_SELECT:
      // we get one category: true/false.
      // if true, we add it to the list of visible
      // categories. If false, we remove it from the list.
      // If the list is empty, we have no filtering
      // function (defualt behaviour).
      const { category, on } = action;
      const currentCategories = state.categories || [];

      let nextCategories;
      if (!on) {
        nextCategories = currentCategories.filter((c) => c !== category);
      } else {
        const copy = currentCategories.slice(0);
        copy.push(category);
        nextCategories = copy;
      }

      if (nextCategories.length === 0) {
        return Object.assign({}, state, {
          categories: [],
          categoryFilter: undefined,
        });
      }
      return Object.assign({}, state, {
        categories: nextCategories,
        categoryFilter: function (e) {
          return nextCategories.filter((c) => c === e.category).length > 0;
        }
      });
    case REQUEST_URL:
      return Object.assign({}, state, {isFetching: true});
    case REQUEST_FAILED:
      return Object.assign({}, state, {isFetching: false});

  }
  return state;
}

export { events };
