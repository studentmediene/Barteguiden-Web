import initialEvents from './init_data'

import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { fetchEvents } from './actions'

const Event = props => {
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

const EventList = props => {
  const { items } = props.events;
  return (
    <div className="eventlist">
      <ul>
        {items.map((e, i) => <Event key={i} evt={e}/>)}
      </ul>
    </div>
  )
}


class App extends React.Component {

  componentWillMount() {
    const { dispatch } = this.props;
    fetchEvents()(dispatch);
  }

  render() {
    return (
      <div>
        <h1>martin er kul</h1>
        <EventList events={this.props.events} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state
}


export default connect(mapStateToProps)(App);
export { EventList, Event }

