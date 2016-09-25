/* @flow */
'use strict'
import React from 'react'
import { Link } from 'react-router'

import { Loading } from './Loading'
import { categoryIcon } from './Category'

const EventContentStyle = {
  margin: '10px',
};

const EventImageStyle = {
  'display': 'flex',
  'flex-direction': 'column',
  'align-items': 'center',
};

type Props = {
  category: string,
  imageUrl: string,
  title: string,
  description: string,
  _id: string
}

class EventListItem extends React.Component {
    props: Props;

    render() {
      const {
        category,
        imageUrl,
        _id,
        title,
        description,
      } = this.props;
      return (
        <div className='eventbox'>
          <img className='icon' src={categoryIcon(category)} />
          <p className='event-header'><Link to={ '/events/' + _id }>
            { title }
            </Link>
            </p>
          <div className='event-image' style={EventImageStyle}>
            <img src={ imageUrl } />
          </div>
          <div style={EventContentStyle} className='eventContent'>
            <p> { description } </p>
          </div>
        </div>
      )
    }
}

export const EventList = props => {
  const { events, isFetching } = props;
  if (isFetching) {
    return (
      <div className='content'>
        <Loading />
      </div>
    )
  }
  return (
    <div className="content">
      <ul>
        {events.map((e, i) => <EventListItem key={i} {...e}/>)}
      </ul>
    </div>
  )
}
