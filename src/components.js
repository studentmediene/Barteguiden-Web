import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { fetchEvents, searchbox_change } from './actions'

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
  }
  componentWillMount() {
    const { dispatch } = this.props;
    fetchEvents()(dispatch);
  }

  handleSearchBoxClick(evt) {
    const text = evt.target.value;
    this.props.dispatch(searchbox_change(text))
  }

  render() {
    const { dispatch } = this.props;
    return (
      <div>
        <h1>martin er kul</h1>
        <SearchBox onChange={this.handleSearchBoxClick} />
        <EventList events={this.props.events} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state;
}


export default connect(mapStateToProps)(App);
