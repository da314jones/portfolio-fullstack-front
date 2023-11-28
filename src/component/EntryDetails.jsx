import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./EntryDetails.css";
const API = import.meta.env.VITE_API_URL;

export default function EntryDetails({ entry }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    const httpOptions = { method: "DELETE" };
    fetch(`${API}/entries/${entries.id}`, httpOptions)
      .then(() => navigate("/entries"))
      .catch((error) => console.log(error));
  };

  const date = new Date(entry.date);
  const formattedDate = date.toLocaleDateString();

  return (
    <div class="journal-container">
      <div className="journal-container-top">
        <div class="journal-container-profileImg">
          <img
            className="show-container-profileImg"
            src="/profileImg.jpg"
            alt=""
          />
        </div>
        <div className="journal-container-topRight">
          <div className="journal-container-title-logo">
            <div class="journal-container-date">
              <p>Date: {formattedDate}</p>
            </div>
            <div class="journal-container-title">
              <h1
                className="text-4xl font-bold text-white mb-4"
                style={{ fontFamily: "GrandCru" }}
              >
                Journal Entry
              </h1>
            </div>
          </div>
          <div class="journal-container-logo">
            <img
              className="w-20 h-auto"
              src="/vetLogo.png"
              alt="Mindful March Logo"
            />
          </div>
        </div>
      </div>
      <div class="journal-container-rating">
        <p>Rating Before: {entry.rating_before}</p>
      </div>
      <div class="journal-container-mood">
        <p>Mood: {entry.adjective_before}</p>
      </div>
      <div class="journal-container-entry">
        <p>Description: {entry.description}</p>
      </div>
      <div class="journal-container-service-related">
        <p>Is Service Related: {entry.is_service_related ? "Yes" : "No"}</p>
        {entry.is_service_related && (
          <p>Service Related Notes: {entry.service_related_notes}</p>
        )}
      </div>
      <div class="journal-container-activity_done">
        <p>Activity: {entry.activity}</p>
      </div>
      <div class="journal-container-custom-activity">
        <p>Custom Activity: {entry.custom_activity}</p>
      </div>
      <div class="journal-container-custom-activity">
        <p>Rating After: {entry.rating_after}</p>
      </div>
      <div class="journal-container-custom-activity">
        <p>Mood After: {entry.adjective_after}</p>
      </div>
      <div class="journal-container-back">
        <button>back</button>
      </div>
      <div class="journal-container-edit">
        <button>edit</button>
      </div>
      <div class="journal-container-delete">
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}
