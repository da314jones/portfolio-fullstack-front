import React from 'react';
import { Link } from 'react-router-dom';
import "./Entry.css";

export default function Entry({ entry }) {

  const date = new Date(entry.date);
  const formattedDate = date.toLocaleDateString();

  return (
    <tr className='entry-container'>
      <td className='text-left'>{formattedDate}</td>
      <td className="leading-8 text-center" >
      <Link to={`/entries/${entry.id}`}>{entry.description}</Link>
      </td>
      <td className='text-center'>
        {" "}{entry.adjective_before}</td>
    </tr>
  );
}
