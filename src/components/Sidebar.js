'use strict'

import React from 'react'
import RangeCalendar from 'rc-calendar'
import Toggle from 'react-toggle'

import { categories } from './Category'


export const SearchBox = props => {
  return (
    <div className='event-search'>
      <input type="text" placeholder="Søk etter events"
        onChange={props.onChange}>
      </input>
    </div>
  );
}

export const CategoryItem = props => {
  const { category, onClick } = props;
  return (
    <div>
      <Toggle id={category} onChange={onClick({category})} />
      <span>{ category }</span>
    </div>
  )
}

export const CategoryList = props => {
  const { onClick } = props;
  return (
    <div className='category-list'>
      <ul>
        {categories.map((c, i) => (
          <li key={i}>
            <CategoryItem category={c} onClick={onClick}/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const ButtonLink = props => {
  return (
    <div>
      <a onClick={props.onClick}> { props.label } </a>
    </div>
  )
}

export const Sidebar = props => {
  const { calendarChange,
          calendarReset,
          isCalendarReset,
          searchChange,
          categoryChange
  } = props;
  return (
    <div className='sidebar'>
    {isCalendarReset ?
      <RangeCalendar onChange={calendarChange} selectedValue={[undefined, undefined]}/>
    :
      <RangeCalendar onChange={calendarChange} />
    }
      <ButtonLink onClick={calendarReset} label='reset' />
      <SearchBox onChange={searchChange} />
      <CategoryList onClick={categoryChange} />
    </div>
  )
}


