'use strict'
require('../node_modules/react-toggle/style.css')

import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import moment from 'moment'

import { Event, EventList } from './components/Event'
import { Sidebar } from './components/Sidebar'

import {
  fetchEvents,
  searchboxChange,
  dateSelect,
  categorySelect,
  resetCalendar,
} from './actions'

export const BarteHeader = () => {
  return (
    <header>
      <h1>
        Barteguiden Er Best :)
      </h1>
    </header>
  )
}

class App extends React.Component {

  constructor() {
    super();
    // Jadascript.
    this.handleSearchBoxClick = this.handleSearchBoxClick.bind(this);
    this.handleCalendarChange = this.handleCalendarChange.bind(this);
    this.handleToggleButtonChange = this.handleToggleButtonChange.bind(this);
    this.resetCalendar = this.resetCalendar.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    fetchEvents()(dispatch);
  }

  handleSearchBoxClick(evt) {
    const text = evt.target.value;
    this.props.dispatch(searchboxChange(text))
  }

  handleCalendarChange(evt) {
    this.props.dispatch(dateSelect(evt));
  }

  resetCalendar() {
    this.props.dispatch(resetCalendar());
    this.props.dispatch(dateSelect(undefined));
  }

  handleToggleButtonChange(evt, props) {
    const { target: {checked} } = evt;
    const { category } = props;
    this.props.dispatch(categorySelect(category, checked));
  }

  render() {
    const {
      dispatch,
      events,
    } = this.props;
    return (
      <div>
        <BarteHeader />
        <EventList isFetching={events.isFetching} events={events.items} />
            <Sidebar calendarChange={this.handleCalendarChange}
                 calendarReset={this.resetCalendar}
                 isCalendarReset={events.resetCalendar}
                 searchChange={this.handleSearchBoxClick}
                 categoryChange={(props) =>
                    (e) => this.handleToggleButtonChange(e, props)} />
      </div>
    )
  }
}

// We will filter the events by all possible filter functions,
// no matter wether they are undefined or not. In order to do this,
// we || it together with a function that always returns true,
// so that if the function is undefined, no events are removed.
const t = _ => true;

function mapStateToProps(state) {
  const events = Object.assign({}, state.events, {
    items: state.events.items
      .filter(state.events.calendarFilter  || t)
      .filter(state.events.searchBoxFilter || t)
      .filter(state.events.categoryFilter  || t)
      ,
  });

  return Object.assign({}, state, {
    events,
  });
}

// TODO: clean up dispatch stuff, and use mapDispatchToProps


export default connect(mapStateToProps)(App);
