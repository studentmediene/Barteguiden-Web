import React, { Component } from 'react'

import { connect } from 'react-redux'

class EventPage extends Component {
  render() {
    console.log(this.props);
    return (
      <p>
        eventpage :)
      </p>
    );
  }
}

function mapStateToProps(state) {
  const { events } = state;
  return {
    events: items,
  }
}

const VisibleEventPage = connect(mapStateToProps)(EventPage)

export { VisibleEventPage }
