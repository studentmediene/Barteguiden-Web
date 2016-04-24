import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { fetchEvents, searchboxChange, dateSelect } from './actions'
import RangeCalendar from 'rc-calendar'

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


class App extends React.Component {
  constructor() {
    super();
    // Jadascript.
    this.handleSearchBoxClick = this.handleSearchBoxClick.bind(this);
    this.handleCalendarChange = this.handleCalendarChange.bind(this);
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
    const { fields } = evt;
    const year  = fields[1],
          month = fields[2],
          day   = fields[3];
    const date = new Date(year, month, day);
    this.props.dispatch(dateSelect(date));
  }

  render() {
    const { dispatch } = this.props;
    return (
      <div>
        <h1>martin er kul</h1>
        <RangeCalendar onChange={this.handleCalendarChange}/>
        <SearchBox onChange={this.handleSearchBoxClick} />
        <EventList events={this.props.events} />
      </div>
    )
  }
}

const t = (e) => true;
function mapStateToProps(state) {
  const events = Object.assign({}, state.events, {
    items: state.events.items
      .filter(state.events.calendarFilter || t)
      .filter(state.events.searchBoxFilter || t)
      ,
  });

  return Object.assign({}, state, {
    events,
  });
}


export default connect(mapStateToProps)(App);
