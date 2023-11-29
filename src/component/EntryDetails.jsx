import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./EntryDetails.css";
const API = import.meta.env.VITE_API_URL;

export default function EntryDetails({ entry }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    const httpOptions = { method: "DELETE" };
    fetch(`${API}/entries/${entry.id}`, httpOptions)
      .then(() => navigate("/entries"))
      .catch((error) => console.log(error));
  };

  const date = new Date(entry.date);
  const formattedDate = date.toLocaleDateString();
  
  const handleBack = () => {
    navigate(-1)
  };

return (
  <div className="journal-container">
    <div className="journal-container-top">
      <img
        className="journal-container-profileImg"
        src="/profileImg.jpg"
        alt=""
      />
      <div className="journal-container-topRight">
        <div className="journal-container-title-logo">
          <div className="journal-container-date">
            <p className="text-xl">{formattedDate}</p>
          </div>
          <div className="journal-container-title">
            <h1
              className="journal-container-h1 text-3xl font-bold text-white mb-4"
              style={{ fontFamily: "GrandCru" }}
            >
              Journal Entry
            </h1>
          </div>
        </div>
        <div className="journal-container-logo">
          <img
            className="w-20 h-auto"
            src="/vetLogo.png"
            alt="Mindful March Logo"
          />
        </div>
      </div>
    </div>
    <div className="journal-container-rating pb-9">
      <p className="underline text-left text-xl">Rating Before</p>
      <p className="text-lg"> {entry.rating_before}</p>
    </div>
    <div className="journal-container-moodBefore pb-9">
      <p className="underline text-left text-xl">Current Mood</p>
      <p className="text-lg">{entry.adjective_before}</p>
    </div>
    <div className="journal-container-entry pb-9">
      <p className="underline text-left text-xl">Journal Entry</p>
      <p className="text-lg">{entry.description}</p>
    </div>
    <div className="journal-container-serviceRelated pb-9">
      <p className="underline text-left text-xl">Service Related Note</p>
      <p className="text-lg">{entry.is_service_related ? "Yes" : "No"}</p>
      {entry.is_service_related && (
        <p className="text-lg">Service Related Notes: {entry.service_related_notes}</p>
      )}
    </div>
    <div className="journal-container-activityDone pb-9">
      <p className="underline text-left text-xl">Activity</p>
      <p className="text-lg">{entry.activity}</p>
    </div>
    <div className="journal-container-customActivity pb-9">
      <p className="underline text-left text-xl">Custom Activity</p>
      <p className="text-lg">{entry.custom_activity}</p>
    </div>
    <div className="journal-container-moodAfter pb-9">
      <p className="underline text-left text-xl">Mood After</p>
      <p className="text-lg">{entry.adjective_after}</p>
    </div>
    <div className="journal-container-customActivity-rating pb-9">
      <p className="underline text-left text-xl">Rating After</p>
      <p className="text-lg">{entry.rating_after}</p>
    </div>
    <div className="journal-container-buttons">
      <div className="journal-container-back bg-slate-50 hover:bg-green-700 text-black font-bold py-2 px-4 rounded-full text-xl">
        <Link onClick={handleBack}><button>back</button></Link>
      </div>
      <div className="journal-container-edit bg-slate-50 hover:bg-green-700 text-black font-bold py-2 px-4 rounded-full text-xl"><Link to={`/entries/${entry.id}/edit`}>
        <button>edit</button></Link>
      </div>
      <div className="journal-container-delete bg-slate-50 hover:bg-green-700 text-black font-bold py-2 px-4 rounded-full text-xl">
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  </div>
);
}