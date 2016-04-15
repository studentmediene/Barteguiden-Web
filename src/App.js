import React from 'react'
import { EventList } from './components'
import initialEvents from './init_data'
import { connect } from 'react-redux'

import { fetchEvents } from './actions'



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
