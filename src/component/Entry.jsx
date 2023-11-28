import React from 'react';
import "./Entry.css";

export default function Entry({ entry }) {

  const date = new Date(entry.date);
  const formattedDate = date.toLocaleDateString();

  return (
    <tr className='entry-container'>
      <td className="leading-8 text-center" >{formattedDate}</td>
      <td className='text-left'>{entry.description}</td>
      <td className='text-center'>{entry.adjective_before}</td>
    </tr>
  );
}
