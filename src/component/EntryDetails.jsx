import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
const API = import.meta.env.VITE_API_URL

export default function EntryDetails() {
  const navigate = useNavigate();

const handleDelete = () => {
  const httpOptions = { method: "DELETE" };
  fetch(`${API}/entries/${entries.id}`, httpOptions)
  .then(() => navigate("/entries"))
  .catch((error) => console.log(error));
};

  return (
    <div>
      <Edit />
      <button>Delete</button>
    </div>
  )
}
