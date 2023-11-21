import React from 'react'

export default function Entry({ entry }) {

  return (
    <div>
      <h1>{entry.date}</h1>
      <p>{entry.mood}</p>
      <p>{entry.description}</p>
    </div>
  )
}
