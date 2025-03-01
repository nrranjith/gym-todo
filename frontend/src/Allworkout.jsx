import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Allworkout = () => {
    const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    axios.get("http://localhost:3000/api/workouts").then((recived)=>setWorkouts(recived.data))  
     .catch((error)=>console.log(error))
    },[]);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">All Workouts</h1>
      <ul className="mt-4 space-y-2">
        {workouts.map((workout) => (
          <li key={workout._id} className="p-2 border rounded">
            <p className="font-bold">{workout.title}</p>
            <p>Reps: {workout.reps} | Load: {workout.load} kg</p>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/")} className="mt-4 w-full bg-gray-500 text-white p-2 rounded">
        Back
      </button>
    </div>
  );

  
}

export default Allworkout
