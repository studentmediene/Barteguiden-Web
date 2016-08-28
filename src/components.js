import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import RangeCalendar from 'rc-calendar'
import Toggle from 'react-toggle'
import moment from 'moment'

import {
  fetchEvents,
  searchboxChange,
  dateSelect,
  categorySelect,
} from './actions'

export const Loading = props => {
  return (
      <div>
        <p>Loading ...</p>
      </div>
  );
}

export const Event = props => {
  const e = props.evt
  return (
    <div className='eventbox'>
      <h2><Link to={'/events/' + e._id}>
        {e.title}
      </Link></h2>
      <img src={e.imageUrl} />
      <p>{e.description}</p>
    </div>
  )
}

export const EventList = props => {
  const { items, isFetching } = props.events;
  if (isFetching) {
    return <Loading />
  }
  return (
    <div className="eventlist">
      <ul>
        {items.map((e, i) => <Event key={i} evt={e}/>)}
      </ul>
    </div>
  )
}

export const SearchBox = props => {
  return (
    <div>
      <input type="text" placeholder="Søk etter events"
       onChange={props.onChange}></input>
    </div>
  );
}

// TODO: fill inn missing categories.
const categories = ['OTHER', 'MUSIC', 'PERFORMANCE', 'NIGHTLIFE', 'DEBATE'];
export const CategoryItem = props => {
  const { category, onClick } = props;
  return (
    <div>
      <Toggle id={category} onChange={onClick({category})} />
      <span>{ category }</span>
    </div>
  )
}

export const CategoryList = props => {
  const { onClick } = props;
  return (
    <div>
      <ul>
        {categories.map((c, i) => (
          <li key={i}>
            <CategoryItem category={c} onClick={onClick}/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const SideBar = props => {
  const { calendarChange,
          searchChange,
          categoryChange
  } = props;
  return (
    <div>
      <RangeCalendar onChange={calendarChange} />
      <SearchBox onChange={searchChange} />
      <CategoryList onClick={categoryChange} />
    </div>
  )
}


class App extends React.Component {

  constructor() {
    super();
    // Jadascript.
    this.handleSearchBoxClick = this.handleSearchBoxClick.bind(this);
    this.handleCalendarChange = this.handleCalendarChange.bind(this);
    this.handleToggleButtonChange = this.handleToggleButtonChange.bind(this);
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

  handleToggleButtonChange(evt, props) {
    const { target: {checked} } = evt;
    const { category } = props;
    this.props.dispatch(categorySelect(category, checked));
  }

  render() {
    const { dispatch } = this.props;
    return (
      <div>
        <h1>martin er kul</h1>
        <div className="sidebar">
          <SideBar calendarChange={this.handleCalendarChange}
                   searchChange={this.handleSearchBoxClick}
                   categoryChange={(props) =>
                      (e) => this.handleToggleButtonChange(e, props)} />
        </div>
        <div className="event-content">
          <EventList events={this.props.events} />
        </div>
      </div>
    )
  }
}

// We will filter the events by all possible filter functions,
// no matter wether they are undefined or not. In order to do this,
// we || it together with a function that always returns true,
// so that if the function is undefined, no events are removed.
const t = (e) => true;
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
