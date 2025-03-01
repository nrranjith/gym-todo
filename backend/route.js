const express = require('express');

const todo = require('./modles/workout');
const { default: mongoose } = require('mongoose');

const router = express.Router(); 

// get all the workout
router.get('/', async(req,res)=>{
   try {
    const allWorkouts = await todo.find({}).sort({createdAt:1}) // sort for based on order
    res.status(200).json(allWorkouts)
   
    
   } catch (error) {
    res.status(400).json({message:error.message})
    
   }
});


// get the single workout


router.get('/:id',async(req,res)=>{
    const{id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.send('no such id')
    }

    try {
        const singleWorkout = await todo.findById(id);
        if(!singleWorkout){
            return res.send('workout not found')
        }

        res.status(200).json(singleWorkout)
        
    } catch (error) {
        res.status(400).json({message:error.message})
        
    }
    
});


// create new workout means post req

router.post('/',async(req,res)=>{
   const {title,reps,load} = req.body;
   
   if(!title||!reps||!load){
    return res.status(400).json({ message: 'All fields (title, reps, load) are required' });

};

   try {
    const workout = await todo.create({title,reps,load});
    res.status(200).json(workout)
    
   } catch (error) {
    res.status(400).json({message:error.message})
    
   }
});

// delete the workout

router.delete('/:id', async(req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.send('no such id')
    }
    try {
        const workoutDelete = await todo.findByIdAndDelete(id)
        res.send('worout deleted')
        
    } catch (error) {
        res.status(400).json({message:error.message})
        
    }
  
});

// update the  particulr workout 
 router.patch('/:id', async(req,res)=>{
    const{id} = req.params;
    const{title,reps,load}= req.body

    if(!title||!reps||!load){
        return res.status(400).json({ message: 'All fields (title, reps, load) are required' });
    
    };
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }
    try {
        const updateWorkout = await todo.findByIdAndUpdate(id,{title,reps,load});
        res.status(200).json(updateWorkout)
        
    } catch (error) {
        res.status(400).json({message:error.message})
        
    }

   
 });



 module.exports = router