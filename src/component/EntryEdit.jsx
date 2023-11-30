import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getActivityData, getMoodData } from "../../utilities/dropDownItems";
import "./EntryEdit.css";
const API = import.meta.env.VITE_API_URL;

export default function EntryEdit() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [moods, setMoods] = useState([]);
  const [activities, setActivities] = useState([]);
  const [entry, setEntry] = useState({
    rating_before: 1,
    adjective_before: "",
    description: "",
    is_service_related: false,
    service_related_notes: "",
    activity: "",
    custom_activity: "",
    adjective_after: "",
    rating_after: 1,
  });

  useEffect(() => {
    const activitiesList = getActivityData();
    const moodsList = getMoodData();
    setActivities(activitiesList);
    setMoods(moodsList);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEntry({ ...entry, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEntry((prevEntry) => ({
      ...prevEntry,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    fetch(`${API}/entries/${id}`)
      .then((response) => response.json())
      .then((responseJSON) => {
        setEntry(responseJSON);
      })
      .catch((error) => {
        console.error("Error fetching entry:", error);
      });
  }, [id, API]);

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

  const handleBack = () => {
    navigate(`/entries/${id}`);
  };

  return (
    <div className="edit-entry-container">
      <div className="edit-entry-container-top-div">
        <div className="edit-entry-profileImg">
          <img
            className="edit-entry-container-profile"
            src="/profileImg.jpg"
            alt="profile-photo"
          />
        </div>
        <div className="edit-entry-container-topRight">
        <div className="edit-entry-container-title">
          <h1 className="font-face-gm text-white text-3xl">Edit Entry</h1>
        </div>
        <div className="edit-entry-logoImg">
          <img
            className="edit-entry-container-logo"
            src="/vetLogo.png"
            alt="profile-photo"
            />
            </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="rating">Rating Before</label>
        <input className="edit-input"
          type="number"
          name="rating_before"
          value={entry.rating_before}
          onChange={handleInputChange}
        />
        <label htmlFor="mood">Current Mood</label>
        <select name="mood" value={entry.mood} onChange={handleInputChange}>
          {moods.map((mood, index) => (
            <option key={index} value={mood}>
              {mood}
            </option>
          ))}
        </select>

        <label htmlFor="text">Journal Entry</label>
        <textarea
          id="description"
          name="description"
          value={entry.description}
          onChange={handleInputChange}
        />

        <label htmlFor="is_service_related"> Service Related</label>
        <input
          type="checkbox"
          id="is_service_related"
          name="is_service_related"
          checked={entry.is_service_related}
          onChange={handleCheckboxChange}
        />

        {entry.is_service_related && (
          <>
            <label htmlFor="serviceRelatedNotes">
              Service Related Notes (optional)
            </label>
            <textarea
              name="serviceRelatedNotes"
              value={entry.service_related_notes}
              onChange={handleInputChange}
            />
          </>
        )}

        <label htmlFor="activityDone">Activity</label>
        <select
          name="activityDone"
          value={entry.activity}
          onChange={handleInputChange}
        >
          {activities.map((activity, index) => (
            <option key={index} value={activity.title}>
              {activity.title}
            </option>
          ))}
        </select>

        <label htmlFor="custom_activity">Custom Activity</label>
        <input
          type="text"
          id="custom_activity"
          name="custom_activity"
          value={entry.custom_activity}
          onChange={handleInputChange}
        />

        <label htmlFor="mood_after">Mood After</label>
        <select
          id="mood_after"
          name="adjective_after"
          value={entry.adjective_after}
          onChange={handleInputChange}
        >
          {moods.map((mood, index) => (
            <option key={index} value={mood}>
              {mood}
            </option>
          ))}
        </select>

        <label htmlFor="rating_after">Rating After</label>
        <input
          type="number"
          id="rating_after"
          name="rating_after"
          value={entry.rating_after}
          onChange={handleInputChange}
        />

        <div className="edit-container-buttons">
          <div className="bg-slate-50 text-lg hover:bg-green-700 text-black font-bold py-2 px-4 rounded-full">
            <button type="submit">cancel</button>
          </div>
          <div className="bg-slate-50 hover:bg-green-700 text-black font-bold py-2 px-4 rounded-full">
            <button type="submit">Edit</button>
          </div>
          <div className="bg-slate-50 hover:bg-green-700 text-black font-bold py-2 px-4 rounded-full">
            <button type="button" onClick={handleBack}>
              back
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
