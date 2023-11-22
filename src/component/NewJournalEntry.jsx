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
	const [moods, setMoods] = useState([]);
	const [isVeteranSpecific, setIsVeteranSpecific] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API}/activities`)
            .then(response => response.json())
            .then(data => setActivities(data.allActivities))
            .catch(error => console.error("Error fetching activities:", error));
}, []);
 
useEffect(() => {
	fetch(`${API}/moods`)
	  .then(response => response.json())
	  .then(data => setMoods(data))
	  .catch(error => console.error("Error fetching moods:", error));
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
		navigate("/entries");;
	}
	const handleCheckboxChange = (e) => {
		setIsVeteranSpecific(e.target.checked)
	}

    return (
		<div className="relative min-h-screen bg-black bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md mx-auto space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
				<div className="text-center">
					<h2 className="font-semibold text-lg text-white mb-4">New Entry</h2>
				</div>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="flex justify-between items-center">
						<input
							type="date"
							name="date"
							value={newEntry.date}
							onChange={handleChange}
							className="form-input rounded-md"
						/>
						<input 
							type="number" 
							name="activityRating" 
							value={newEntry.activityRating} 
							onChange={handleChange} 
							min="1" max="5" 
							className="form-input rounded-md"
						/>
					</div>
					<div>
						<label className="text-gray-600">Mood</label>
						<select 
							name="moodAdjective" 
							onChange={handleChange} 
							value={newEntry.moodAdjective} 
							className="form-select w-full rounded-md"
						>
							{moods.map(mood => (
								<option key={mood.id} value={mood.adjective}>{mood.adjective}</option>
							))}
						</select>
					</div>
					<div>
						<label className="text-gray-600">Journal Entry</label>
						<textarea
							name="description"
							value={newEntry.description}
							onChange={handleChange}
							className="form-textarea w-full rounded-md h-28"
						/>
					</div>
					<div>
						
						<label className="text-gray-600">Service Related Notes</label>
						<input
          type="checkbox"
          checked={isVeteranSpecific}
          onChange={handleCheckboxChange}
        />
						<textarea
							name="serviceRelatedNotes"
							value={newEntry.serviceRelatedNotes}
							onChange={handleChange}
							className="form-textarea w-full rounded-md h-28"
						/>
					</div>
					<div>
						<label className="text-gray-600">Activities Done</label>
						<select
							name="activityId"
							value={newEntry.activityId}
							onChange={handleChange}
							className="form-select w-full rounded-md"
						>
							<option value="">Select an activity</option>
							{activities.map(activity => (
								<option key={activity.id} value={activity.id}>{activity.title}</option>
							))}
						</select>
					</div>
					<div className="flex justify-between">
			<button type="button" onClick={handleCancel} className="text-sm shadow-sm font-medium tracking-wider border rounded-full hover:shadow-lg">Back</button>
			<button type="submit" className="text-sm shadow-sm font-medium tracking-wider text-black rounded-full hover:shadow-lg">Submit</button>
			<button type="button" onClick={handleCancel} className="text-sm shadow-sm font-medium tracking-wider text-black rounded-full hover:shadow-lg">Cancel</button>
		  </div>
				</form>
			</div>
		</div>
	)
};

