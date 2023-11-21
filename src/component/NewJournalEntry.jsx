import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./NewJournalEntry.css";

const API = import.meta.env.VITE_API_URL;

export default function NewJournalEntry() {
    const [newEntry, setNewEntry] = useState({
        date: new Date().toISOString().split('T')[0],
        mood: 1,
        description: "",
        serviceRelatedNotes: "",
        customActivity: "",
        activityRating: 1,
        activityId: ""
    });
    const [activities, setActivities] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API}/activities`)
            .then(response => response.json())
            .then(data => setActivities(data.allActivities))
            .catch(error => console.error("Error fetching activities:", error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEntry(prevEntry => ({
            ...prevEntry,
            [name]: value
        }));
    };

	const addEntry = () => {
	fetch(`${API}/entries`, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newEntry),
	})
	.then(() => navigate(`/entries`))
	.catch(error => console.error("Error submitting entry:", error));
}

    const handleSubmit = (e) => {
        e.preventDefault();
		addEntry();
        
    };

	const handleCancel = () => {
		navigate("/entries");
	}

    return (
        <div className="relative min-h-screen bg-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover"
             >
            <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
                <div className="grid gap-8 grid-cols-1">
                    <div className="flex flex-col">
                        <h2 className="font-semibold text-lg text-center">Journal Entry</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="mb-3">
                                <label className="font-semibold text-gray-600 py-2">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={newEntry.date}
                                    onChange={handleChange}
                                    className="block w-full bg-grey-lighter text-grey-darker border rounded-lg h-10 px-4"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="font-semibold text-gray-600 py-2">Mood Rating</label>
                                <input
                                    type="number"
                                    name="mood"
                                    value={newEntry.mood}
                                    onChange={handleChange}
                                    className="block w-full bg-grey-lighter text-grey-darker border rounded-lg h-10 px-4"
                                    min="1"
                                    max="5"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="font-semibold text-gray-600 py-2">Mood Description</label>
                                <textarea
                                    name="description"
                                    value={newEntry.description}
                                    onChange={handleChange}
                                    className="w-full min-h-[100px] max-h-[300px] h-28 appearance-none block bg-grey-lighter text-grey-darker border rounded-lg py-4 px-4"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="font-semibold text-gray-600 py-2">Service Related Notes</label>
                                <textarea
                                    name="serviceRelatedNotes"
                                    value={newEntry.serviceRelatedNotes}
                                    onChange={handleChange}
                                    className="w-full min-h-[100px] max-h-[300px] h-28 appearance-none block bg-grey-lighter text-grey-darker border rounded-lg py-4 px-4"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="font-semibold text-gray-600 py-2">Custom Activity</label>
                                <input
                                    type="text"
                                    name="customActivity"
                                    value={newEntry.customActivity}
                                    onChange={handleChange}
                                    className="block w-full bg-grey-lighter text-grey-darker border rounded-lg h-10 px-4"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="font-semibold text-gray-600 py-2">Activity</label>
                                <select
                                    name="activityId"
                                    value={newEntry.activityId}
                                    onChange={handleChange}
                                    className="block w-full bg-grey-lighter text-grey-darker border rounded-lg h-10 px-4"
                                >
                                    <option value="">Select an activity</option>
                                    {activities.map(activity => (
                                        <option key={activity.id} value={activity.id}>{activity.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="font-semibold text-gray-600 py-2">Activity Rating (1-5)</label>
                                <input
                                    type="number"
                                    name="activityRating"
                                    value={newEntry.activityRating}
                                    onChange={handleChange}
                                    className="block w-full bg-grey-lighter text-grey-darker border rounded-lg h-10 px-4"
                                    min="1"
                                    max="5"
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button type="button" onClick={handleCancel} className="bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">Cancel</button>
                                <button type="submit" className="bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
