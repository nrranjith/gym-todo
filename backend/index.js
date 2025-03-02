const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors')


const app = express();

//middleware for covert json request

app.use(express.json())
app.use(cors({
    origin:["https://gym-todo-nu.vercel.app/"],
    methods:["GET","POST","DELETE","PATCH"],
    credentials:true
}

))
// middleware for show console


app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next()
})






const routes = require('./route') // import the router module


//middleware for routes handler

app.use('/api/workouts',routes)



// env store
const PORT =process.env.PORT;
const DB = process.env.DB_URL;

//connect the db

mongoose.connect(DB).then(()=>{
   
app.listen(PORT,()=>{
    console.log('server connected')
})
}).catch((err)=>{
    console.log(err)
})



