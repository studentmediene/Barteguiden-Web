import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class EventPage extends Component {
  render() {
    console.log(this.props);
    const eventId = this.props.routeParams.id;
    const showingEvent = this.props.events.items
      .filter((e) => e._id == eventId)[0];
    return (
        <div>
        <Link to='/' >back</Link>
        <h1>{showingEvent.title}</h1>
        <p> eventpage :) </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

const VisibleEventPage = connect(mapStateToProps)(EventPage)

export { VisibleEventPage }
