'use strict'
import React from 'react'

const LoadingStyle = {
  'width': '600px',
}

export const Loading = _ => {
  return (
      <div style={LoadingStyle}>
        <p>Loading ...</p>
      </div>
  );
}
