import React from 'react'

export default function JournalEntryCard() {

  return (
    <div className="journal-entry-card">
      {entry.image && <img src={entry.image} alt="Entry Thumbnail" className="entry-image" />}
      <div className="entry-content">
        <h3 className="entry-title">{entry.title}</h3>
        <p className="entry-date">{entry.date}</p>
        <p className="entry-snippet">{entry.snippet}</p>
        <button className="read-more-btn">Read More</button>
      </div>
    </div>
  )
}
