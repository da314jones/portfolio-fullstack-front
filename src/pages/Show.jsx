import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EntryDetails from "../component/EntryDetails"
const API = import.meta.env.VITE_API_URL


export default function Show() {
  const { id } = useParams();
  const [entry, setEntry] = useState();

  
useEffect(() => {
  fetch(`${API}/entries/${id}`)
  .then((response) => response.json())
  .then((responseJSON) => {
    setEntry(responseJSON);
  })
  .catch((error) => console.log(error));
}, [id,API]);

if (!entry) {
  return <div>Loading...</div>;
}

  return (
    <div>
      <EntryDetails entry={entry} />
    </div>
  )
}
