import React, { useEffect, useState } from "react";
import { useAuthFetch } from "../../utilities/useAuthFetch";
import Entry from "./Entry";
import "./Entries.css";
const API = import.meta.env.VITE_API_URL;

export default function Entries() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetch(`${API}/entries`)
      .then((response) => response.json())
      .then((entries) => {
        console.log(entries);
        setEntries(entries);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="entries-container">
      <div className="entries-top">
        <div className="entries-profileImg">
          <img className="profileImg" src="/profileImg.jpg" alt="" />
        </div>

      <div className="entries-title-logo">
        <div className="entries-title">
          
        <h1
          className="entries-container-title 
          font-face-gm"
          >
          Journal Entries
        </h1>
        </div>
        <div className="entries-logoImg">
          <img className="logoImg" src="/vetLogo.png" alt="" />
        </div>
      </div>
          </div>
          <table className="table-fixed">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
      {entries.map((entry, index) => {
        return <Entry key={entry.id} entry={entry} />;
      })}
      </tbody>
      </table>
<div className="button-split">
      <div className="new bg-slate-50 hover:bg-green-700 text-black font-bold py-2 px-4 rounded-full cancel">
          <button type="submit">New</button>
        </div>
        </div>
    </div>
  );
}
