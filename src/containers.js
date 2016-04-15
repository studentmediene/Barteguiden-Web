import React, { Component } from 'react'

import { connect } from 'react-redux'

class EventPage extends Component {
  render() {
    return (
      <p>
        eventpage :)
      </p>
    );
  }
}

const VisibleEventPage = connect()(EventPage)

export { VisibleEventPage }
