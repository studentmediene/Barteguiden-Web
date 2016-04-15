import React from 'react'
import { Link } from 'react-router'


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

export { EventList, Event }
