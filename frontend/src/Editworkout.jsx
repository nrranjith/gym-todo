import React from 'react'
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";


const Editworkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const workout = location.state;
  
    const [title, setTitle] = useState(workout?.title || "");
    const [reps, setReps] = useState(workout?.reps || "");
    const [load, setLoad] = useState(workout?.load || "");
  
    const handleUpdate = async (e) => {
      e.preventDefault();
      try {
        await axios.patch(`http://localhost:3000/api/workouts/${workout._id}`, { title, reps, load });
        navigate("/workouts");
      } catch (error) {
        console.error("Error updating workout:", error);
      }
    };
  
    return (
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-4">Edit Workout</h1>
        <form onSubmit={handleUpdate} className="space-y-2">
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" required />
          <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} className="w-full p-2 border rounded" required />
          <input type="number" value={load} onChange={(e) => setLoad(e.target.value)} className="w-full p-2 border rounded" required />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Update</button>
        </form>
      </div>
    );
  };
  
  export default Editworkout
