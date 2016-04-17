import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import { Loading } from './components'

import { fetchEvent } from './actions'

class EventPage extends Component {
  componentWillMount() {
    const id = this.props.params.id;
    const { dispatch } = this.props;
    fetchEvent(id)(dispatch);
  }

  render() {
    const { item, isFetching } = this.props.events;
    if (isFetching) {
      return (
        <Loading />
      )
    }
    if (!item) {
      return (
        <div>
          Could not find event {this.props.params.id}.
        </div>
      );
    }
    return (
        <div>
        <Link to='/' >back</Link>
        <h1>{item.title}</h1>
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
