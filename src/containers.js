import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { fetchEvent } from './actions'

class EventPage extends Component {
  componentWillMount() {
    const id = this.props.params.id;
    const { dispatch } = this.props;
    fetchEvent(id)(dispatch);
  }

  render() {
    const event = this.props.events.item;
    console.log(event);
    if (!event) {
      return (
        <div>
          Could not find event {this.props.params.id}.
        </div>
      );
    }
    return (
        <div>
        <Link to='/' >back</Link>
        <h1>{event.title}</h1>
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
