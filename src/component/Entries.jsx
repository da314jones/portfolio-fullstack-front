import React, { useEffect, useState } from 'react'
import { useAuthFetch } from '../../utilities/useAuthFetch'
import Entry from './Entry';
const API = import.meta.env.VITE_API_URL

export default function Entries() {
  const [entries, setEntries] = useState([]);

  // const { authenticatedFetch } = useAuthFetch();

useEffect(() => {
  fetch(`${API}/entries`)
  .then((response) => response.json())
  .then((entries) => {
    console.log(entries)
    setEntries(entries);
  })
  .catch((error) => {
    console.error("Error fetching data:",error)
  });
}, []);

  return (
    <div>
      {entries.map((entry, index) => {
        return <Entry key={entry.id} entry={entry} />
      })}
    </div>
  )
}
