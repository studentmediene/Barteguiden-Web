import React from 'react'
import { EventList } from './components'
import initialEvents from './init_data'
import { connect } from 'react-redux'

import { fetchEvents } from './actions'



class App extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props;
    console.log('will mount. props: ');
      console.log(this.props);
    fetchEvents()(this.props.dispatch);
  }

  render() {
    return (
      <div>
        <h1>martin er kul</h1>
        <EventList events={initialEvents}/>
      </div>
    )
  }
}

export default connect()(App);
