import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Edit2, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";



const Todo = () => {
    const [title,setTitle] = useState('');
    const [reps,setReps] = useState('');
    const [load,setLoad] = useState('');
    const [workouts,setWorkouts] = useState([]);
    const navigate = useNavigate();
    
    // prvent the fuctional componatent side effect

    useEffect(() => {
        getWorkouts();
    }, []);

    //get workout and update

    const getWorkouts = async()=> {
        try {
            const recived = await axios.get("http://localhost:3000/api/workouts");
            setWorkouts(recived.data)
        } catch (error) {
            
            console.log(error)
        }
    }



// post request
    const handlesubmit = async(e)=>{
        e.preventDefault();
        try {
           
              await axios.post("http://localhost:3000/api/workouts", { title, reps, load });

              console.log('workouts add sucessfuly') 
            // set all felid to empty and show get workouts
            getWorkouts()
            setTitle('');
            setLoad('');
            setReps('');
           // navigate('/workouts')
        
            
        } catch (error) {
            console.log(error)
            
        }

    }
    // delete workout

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/workouts/${id}`);
      getWorkouts();
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };
  //edit workout

  const handleEdit = (workout) => {
    navigate(`/edit/${workout._id}`,{state:workout})
  };

  return (
    <div className='flex justify-center items-center bg-gray-100 min-h-screen'>
        <div  className= 'bg-white shadow-lg rounded-lg p-6 w-full max-w-md '>
            <h2 className='text-2xl font-semibold text-center mb-6'>GYM TODO</h2>
            <form className= 'flex flex-col gap-4' onSubmit={handlesubmit}>
                <label className='flex flex-col'>
                    <span className="text-green-700 font-medium">Title:</span>
                    <input type='text' placeholder='title of workout' required  className='mt-2 px-3 py-3 border rounded-lg outline-none focus:ring focus:ring-blue-300' onChange={(e)=>setTitle(e.target.value)} value={title}></input>
                </label>
                <label className='flex flex-col'>
                    <span className="text-green-700 font-medium">Reps:</span>
                    <input type='number' placeholder='In reps' required  className='mt-2 px-3 py-3 border rounded-lg outline-none focus:ring focus:ring-blue-300' onChange={(e)=>setReps(e.target.value)} value={reps}></input>
                </label>
                <label className='flex flex-col'>
                    <span className="text-green-700 font-medium">Load:</span>
                    <input type='number' placeholder='load in kg' required  className='mt-2 px-3 py-3 border rounded-lg outline-none focus:ring focus:ring-blue-300'onChange={(e)=>setLoad(e.target.value)} value={load}></input>
                </label>
                <button type='submit' className='bg-blue-300 text-white py-3 rounded-lg transition duration-300 hover:bg-blue-800'> ADD</button>

            </form>
            <ul className="mt-4 space-y-2">
                {
                    workouts.map((workout)=>(
                        <li key={workout._id} className="flex justify-between p-2 border rounded bg-gray-50"> 
                            
                            <div>
                                <p  className="text-green-600">{workout.title}</p>
                                <p  className="text-yellow-600">{workout.reps}</p>
                                <p  className="text-blue-600">{workout.load}kg</p>
                            </div>
                            <div className="flex gap-5 items-center">
                                <button onClick={() => handleEdit(workout)} className="text-gray-600 hover:text-blue-700"><Edit2 size={20}/></button>
                                <button onClick={() => handleDelete(workout._id)} className="text-red-500 hover:text-red-700"><Trash2 size={20}/></button>
                            </div>
                            
                             </li>
                    ))
                }
            </ul>
        </div>
       
    </div>
  )}
 
export default Todo
