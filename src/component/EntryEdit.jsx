import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EntryEdit.css"
const API = import.meta.env.VITE_API_URL;

export default function EntryEdit() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [moods, setMoods] = useState([]);
  const [activities, setActivities] = useState([]);
  const [entry, setEntry] = useState({
    mood: "",
    rating: 0,
    text: "",
    serviceRelatedNotes: "",
    activityDone: "",
  });

  useEffect(() => {
    // Fetch entry
    fetch(`${API}/entries/${id}`)
      .then((response) => response.json())
      .then((responseJSON) => {
        setEntry(responseJSON);
      })
      .catch((error) => {
        console.error("Error fetching entry:", error);
      });
    
    // Fetch moods
    fetch(`${API}/moods`)
      .then((response) => response.json())
      .then((responseJSON) => {
        setMoods(responseJSON);
      })
      .catch((error) => {
        console.error("Error fetching moods:", error);
      });
    
    // Fetch activities
    fetch(`${API}/activities`)
      .then((response) => response.json())
      .then((responseJSON) => {
        setActivities(responseJSON);
      })
      .catch((error) => {
        console.error("Error fetching activities:", error);
      });

  }, [id, API]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEntry({ ...entry, [name]: value });
  };

  const updateEntry = () => {
    fetch(`${API}/entries/${id}`, {
      method: "PUT",
      body: JSON.stringify(entry),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then(() => {
        setMessage("Entry updated successfully.");
        navigate(`/entries/${id}`);
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage("Failed to update entry.");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEntry();
  };

  return (
    <div className="edit-entry-form">
      <img className="edit-entry-form-profile" src="/profileImg.jpg" alt="profile-photo" />
      <h2>Edit Entry</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="mood">Mood</label>
        <select name="mood" value={entry.mood} onChange={handleInputChange}>
          {/* Populate options with moods */}
        </select>

        <label htmlFor="rating">Rating</label>
        <input
          type="range"
          name="rating"
          min="0"
          max="5"
          value={entry.rating}
          onChange={handleInputChange}
        />

        <label htmlFor="text">Text edit Journal Entry</label>
        <textarea name="text" value={entry.text} onChange={handleInputChange} />

        <label htmlFor="serviceRelatedNotes">
          Text service related notes (optional)
        </label>
        <textarea
          name="serviceRelatedNotes"
          value={entry.serviceRelatedNotes}
          onChange={handleInputChange}
        />

        <label htmlFor="activityDone">Activities Done</label>
        <select
          name="activityDone"
          value={entry.activityDone}
          onChange={handleInputChange}
        >
          {/* Populate options with activities */}
        </select>

        <div className="buttons">
          <button type="submit">Update</button>
          <button type="button" onClick={() => navigate(`/entries`)}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
}
