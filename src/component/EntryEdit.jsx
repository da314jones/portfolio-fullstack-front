import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
const API = import.meta.env.VITE_API_URL


export default function EntryEdit() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState();



useEffect(() => {
  
})

  return (
    <div>
      
    </div>
  )
}
