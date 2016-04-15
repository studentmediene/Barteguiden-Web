import React from 'react'
import { Link } from 'react-router'


const Event = props => {
  const e = props.evt
  return (
    <div className='eventbox'>
      <h2><Link to={'/events/' + e.externalId}>
        {e.title}
      </Link></h2>
      <img src={e.imageUrl} />
      <p>{e.description}</p>
    </div>
  )
}

const EventList = props => {
  const events = props.events;
  return (
    <div className="eventlist">
      <ul>
        {events.map((e, i) => <Event key={i} evt={e}/>)}
      </ul>
    </div>
  )
}

export { EventList, Event }
