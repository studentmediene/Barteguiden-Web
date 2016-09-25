/* @flow */
'use strict'
import React from 'react'

export const categories = ['OTHER', 'MUSIC', 'PERFORMANCES',
                    'NIGHTLIFE', 'DEBATE', 'PRESENTATIONS'];
export const categoryIcon = category => {
  if (categories.find(c => c == category) === undefined) {
    console.log(`Tried to find category of unknown category: ${category}`)
  }
  return `http://www.barteguiden.no/images/${category}.png`
}
