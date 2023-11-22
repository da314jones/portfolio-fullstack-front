import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./EntryDetails.css"
const API = import.meta.env.VITE_API_URL

export default function EntryDetails({ entry }) {
  const navigate = useNavigate();

const handleDelete = () => {
  const httpOptions = { method: "DELETE" };
  fetch(`${API}/entries/${entries.id}`, httpOptions)
  .then(() => navigate("/entries"))
  .catch((error) => console.log(error));
};

  return (
    
      <div className="relative min-h-screen bg-white dark:bg-gray-900 overflow-hidden" style={{ height: '100vh' }}>
      {/* Header with Logo and Welcome Message */}
      <img className='show-container-profileImg' src="/Call-to-Action Button (19).png" alt="" />
      <header className="text-center pt-4 top-0 left-0 right-0 bg-transparent z-10">
        <h1 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'GrandCru'}}>Journal Entry</h1>
        
        <a href="/" className="inline-block">
          <img
            className="w-20 h-auto" // Adjust size as needed
            src="/vetlogo.png" // Replace with the correct path to your logo image
            alt="Mindful March Logo"
          />
        </a>
      </header>


<p>
{entry.date}
</p>

<p>
{entry.mood}
  </p>  
<p>
   {entry.description}

</p>
<p>

{entry.service_related_notes}
</p>
<p>

{entry.custom_activity}
</p>
<p>

{entry.activity_rating}
</p>

<p>

{entry.activity_id}
</p>



{/* <p>

{activities.id}
</p>
<p>

{activities.title}
</p>
<p>

{activities.description}
</p>
<p>

{activities.mood_rating}
</p>

<p>

{activities.is_veteran_specific}
</p>



<p>

{mood.adjective}
</p>
<p>
{mood.id}

</p> */}


      {/* <Edit /> */}
      <button>Delete</button>
      <button>back</button>
    </div>
  )
}



