import React from 'react'
import { EventList } from './components'
import initialEvents from './init_data'

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>martin er kul</h1>
        <EventList events={initialEvents}/>
      </div>
    )
  }
}

export default App;
