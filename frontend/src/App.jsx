import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Todo from "../Todo";
import Allworkout from "./Allworkout";
import Editworkout from "./Editworkout";



const App = ()=>{
  return(
   <Router>
    <Routes>
      <Route path="/" element={<Todo/>}></Route>
      <Route path="/workouts" element={<Allworkout/>}></Route>
      <Route path="/edit/:id" element={<Editworkout/>}></Route>
    </Routes>
   </Router>
  )
}


export default App