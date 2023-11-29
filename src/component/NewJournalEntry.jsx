import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getActivityData, getMoodData } from "../../utilities/dropDownItems";
import Button from "react-bootstrap/Button";
import "./NewJournalEntry.css";
const API = import.meta.env.VITE_API_URL;

export default function NewJournalEntry() {
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split("T")[0],
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

  const [activities, setActivities] = useState([]);
  const [moods, setMoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const activitiesList = getActivityData();
    const moodsList = getMoodData();
    setActivities(activitiesList);
    setMoods(moodsList);
  }, []);

  const addNewEntry = () => {
    fetch(`${API}/entries`, {
      method: "POST",
      body: JSON.stringify(newEntry),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => navigate(`/entries`))
      .catch((error) => console.error("Error adding entry:", error));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewEntry((prevEntry) => ({
      ...prevEntry,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", newEntry);
    addNewEntry();
  };

  return (
    <div className="new-entry-container">
      <div className="font-face-gm new-entry-title">
        <h1>New Entry</h1>
      </div>
      <div className="new-entry-container-top">
        <div className="new-entry-profile-logo-img">
          <img className="profileImg" src="/profileImg.jpg" alt="" />

          <img className="logoImg" src="/vetLogo.png" alt="" />
        </div>

        <form onSubmit={handleSubmit}>
          <label className="rating  col-span-2 lg:col-span-1">
            Rating:
            <input
              type="range"
              id="rating_before"
              name="rating_before"
              value={newEntry.rating_before}
              onChange={handleChange}
              placeholder="Rating"
            />
          </label>
          <label className="date col-span-2 lg:col-span-1">
            Date:
            <input
              type="date"
              id="date"
              name="date"
              value={newEntry.date}
              onChange={handleChange}
              placeholder="Date"
            />
          </label>
        </form>
      </div>

      <div className="new-entry-formMid">
        <form onSubmit={handleSubmit}>
          <label className="mood_before" htmlFor="mood_before">
            Mood:
            <select
              id="mood_before"
              name="adjective_before"
              value={newEntry.adjective_before}
              onChange={handleChange}
            >
              {moods.map((mood, index) => (
                <option key={index} value={mood}>
                  {mood}
                </option>
              ))}
            </select>
          </label>
        </form>
      </div>

      <div className="formBottom">
        <form className="form-bottom" onSubmit={handleSubmit}>
          <label htmlFor="description">Journal Entry</label>
          <textarea
            id="description"
            name="description"
            value={newEntry.description}
            onChange={handleChange}
          />

          <label htmlFor="is_service_related"> Service Related</label>
          <input
            type="checkbox"
            id="is_service_related"
            name="is_service_related"
            checked={newEntry.is_service_related}
            onChange={handleChange}
          />

          {newEntry.is_service_related && (
            <>
              <label htmlFor="service_related_notes">
                Service Related Notes:
              </label>
              <textarea
                id="service_related_notes"
                name="service_related_notes"
                value={newEntry.service_related_notes}
                onChange={handleChange}
              />
            </>
          )}
          <label htmlFor="activity">Completed Activity</label>
          <select
            id="activity"
            name="activity"
            value={newEntry.activity}
            onChange={handleChange}
          >
            {activities.map((activity, index) => (
              <option key={index} value={activity.title}>
                {`${activity.title} - ${activity.description}`}
              </option>
            ))}
          </select>

          <label htmlFor="custom_activity">Custom Activity</label>
          <input
            type="text"
            id="custom_activity"
            name="custom_activity"
            value={newEntry.custom_activity}
            onChange={handleChange}
          />

          
      <div className="new-entry-lower-half pt-8">
        <div className="back">
        <button className="bg-slate-50 hover:bg-green-700 text-black font-bold py-2 px-4 rounded-full">back</button>{' '}
        </div>
        <div className="bg-slate-50 hover:bg-green-700 text-black font-bold py-2 px-4 rounded-full submit">
          <button type="submit">Submit</button>
        </div>
        <div className="bg-slate-50 hover:bg-green-700 text-black font-bold py-2 px-4 rounded-full cancel">
          <button type="submit">cancel</button>
        </div>
      </div>
        </form>
      </div>

    </div>
  );
}
