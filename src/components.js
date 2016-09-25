'use strict'
require('../node_modules/react-toggle/style.css')

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
  resetCalendar,
} from './actions'

const LoadingStyle = {
  'width': '600px',
}

export const Loading = _ => {
  return (
      <div style={LoadingStyle}>
        <p>Loading ...</p>
      </div>
  );
}

export const BarteHeader = () => {
  return (
    <header>
      <h1>
        Barteguiden Er Best :)
      </h1>
    </header>
  )
}

const EventContentStyle = {
  margin: '10px',
};

const EventImageStyle = {
  'display': 'flex',
  'flex-direction': 'column',
  'align-items': 'center',
};

export const Event = props => {
  const e = props.evt
  return (
    <div className='eventbox'>
      <img className='icon' src={categoryIcon(e.category)} />
      <p className='event-header'><Link to={ '/events/' + e._id }>
        { e.title }
        </Link>
        </p>
      <div className='event-image' style={EventImageStyle}>
        <img src={ e.imageUrl } />
      </div>
      <div style={EventContentStyle} className='eventContent'>
        <p> { e.description } </p>
      </div>
    </div>
  )
}

export const EventList = props => {
  const { items, isFetching } = props.events;
  if (isFetching) {
    return (
      <div className='content'>
        <Loading />
      </div>
    )
  }
  return (
    <div className="content">
      <ul>
        {items.map((e, i) => <Event key={i} evt={e}/>)}
      </ul>
    </div>
  )
}

export const SearchBox = props => {
  return (
    <div className='event-search'>
      <input type="text" placeholder="Søk etter events"
        onChange={props.onChange}>
      </input>
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

export const categoryIcon = category => {
  if (categories.find(c => c == category) === undefined) {
    console.log(`Tried to find category of unknown category: ${category}`)
  }
  return `http://www.barteguiden.no/images/${category}.png`
}

export const CategoryList = props => {
  const { onClick } = props;
  return (
    <div className='category-list'>
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

export const ButtonLink = props => {
  return (
    <div>
      <a onClick={props.onClick}> { props.label } </a>
    </div>
  )
}

export const SideBar = props => {
  const { calendarChange,
          calendarReset,
          isCalendarReset,
          searchChange,
          categoryChange
  } = props;
  return (
    <div className='sidebar'>
    {isCalendarReset ?
      <RangeCalendar onChange={calendarChange} selectedValue={[undefined, undefined]}/>
    :
      <RangeCalendar onChange={calendarChange} />
    }
      <ButtonLink onClick={calendarReset} label='reset' />
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
        <EventList events={events} />
        <SideBar calendarChange={this.handleCalendarChange}
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
