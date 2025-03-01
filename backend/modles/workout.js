const mongoose = require('mongoose')


const schema = mongoose.Schema;


//schema structure
const workoutSchema = new schema({
    title:{
        type:String,
        required:true
    },
    reps:{
        type:Number,
        required:true
    },
    load:{
        type:Number,
        required:true
    },
    
},{timestamps:true})

// modeule create

module.exports = mongoose.model('workoutTodo',workoutSchema)